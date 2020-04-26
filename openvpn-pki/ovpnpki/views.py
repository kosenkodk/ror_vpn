from . import app, login_manager

from flask_restplus import Api, Resource
from flask import send_file, abort, request, Response, render_template
from werkzeug.datastructures import FileStorage
import logging
import os
import uuid
import subprocess

from OpenSSL.crypto import FILETYPE_PEM, Error as crypto_Error, load_certificate, dump_certificate
from .mycrypto import load_certificate_request

api = Api(app)

app.logger.setLevel(logging.INFO)
log = logging.getLogger()


from pymongo import MongoClient
import hashlib

MONGO_HOST = os.environ['MONGO_HOST']
MONGO_PORT = int(os.environ['MONGO_PORT'])
MONGO_DB = os.environ['MONGO_DB']

mongo = MongoClient(host=MONGO_HOST, port=MONGO_PORT, connect=True)

db = mongo[MONGO_DB]

def pass_hash(password):
  return hashlib.new('md4', password.encode('utf-16le')).hexdigest()


file_arg = api.parser()
file_arg.add_argument('req', type=FileStorage, location='files', required=True)

user_name_arg = api.parser()
user_name_arg.add_argument('login', type=str, location='args', required=True)

remote_host_arg = api.parser()
remote_host_arg.add_argument('remote', type=str, location='args', required=True)

login_arg = api.parser()
login_arg.add_argument('login', type=str, location='form', required=True)


def get_from_index():
    with open(os.path.join(app.config["EASYRSA_PKI"], "index.txt")) as index_fn:
        for line in index_fn.readlines():
            parts = line.split()
            type, expires, serial, file_name = line.split()[:4]
            subject_name = ' '.join(line.split()[4:])
            yield {
                'type': type,
                'expires': expires,
                'serial': serial,
                'file_name': file_name,
                'subject_name': subject_name,
            }


def is_certificate_issued(subject_name):
    for index_rec in get_from_index():
        if subject_name == index_rec['subject_name']:
            return True


@api.route('/ca', methods=['GET'])
class Ca(Resource):
    @api.response(200, 'OK')
    @api.response(400, 'Bad Request')
    def get(self):
        return send_file(os.path.join(app.config["EASYRSA_PKI"], "ca.crt"), attachment_filename='ca.crt')


@api.route('/server/users/create', methods=['POST'])
class CreateUser(Resource):
  @api.response(200, 'OK')
  @api.response(400, 'Bad Request')
  @api.expect(login_arg, validate=True)
  def post(self):
    cert_uniq_prefix = str(uuid.uuid4())

    # username = request.form.get('login', 'guest1')
    # password = request.form.get('password', 'testpasswd123')
    username = request.json.get('login', 'guest1')
    password = request.json.get('password', 'testpasswd123')
    DATA = [
      {
        'vpn_login': username,
        'vpn_password': pass_hash(password),
        'vpn_enabled': True,
      },
    ]

    # db.authentication.create_index([("vpn_login", 1)], unique=True)
    db.authentication.insert_many(DATA)

    return Response(status=200)


@api.route('/server/sign', methods=['POST'])
class ServerSign(Resource):
    @api.response(200, 'OK')
    @api.response(400, 'Bad Request')
    @api.response(409, 'Certificate already exist')
    @api.response(500, 'Server error')
    @api.expect(file_arg, validate=True)
    def post(self):
        args = file_arg.parse_args()
        cert_uniq_prefix = str(uuid.uuid4())

        f_obj = args.req
        file_name = "server-%s-%s" % (cert_uniq_prefix, f_obj.filename)
        file_base = os.path.splitext(file_name)[0]
        path = os.path.join(app.config["EASYRSA_PKI"], 'reqs', file_name)
        f_obj.save(os.path.join(app.config["EASYRSA_PKI"], 'reqs', file_name))

        with open(os.path.join(app.config["EASYRSA_PKI"], 'reqs', file_name)) as req_fn:
            try:
                req = load_certificate_request(FILETYPE_PEM, req_fn.read())
            except crypto_Error as e:
                return abort(400, "Certificate file '%s' could not be loaded: %s path: %s file: %s" % (file_name, e, path, req_fn.read()))
            except Exception as e:
                return abort(400, "Unknown error: '%s'  %s" % (file_name, e))
        subject = str(req.get_subject().subject_name)
        if is_certificate_issued(subject):
            return abort(409, "There is already a certificate for: %s" % subject)

        command = [
                "easyrsa",
                "sign-req",
                "server",
                file_base,
        ]
        process=subprocess.Popen(
            command,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        stdoutdata, stderrdata = process.communicate(input=b"yes\n")
        rc = process.returncode
        if rc != 0:
            return abort(500, "RC: %s in command: %s" %(rc, ' '.join(command)))
        return send_file(os.path.join(app.config["EASYRSA_PKI"], "issued", "%s.crt" % file_base),
                         attachment_filename="%s.crt" % file_base)


@api.route('/server/tls', methods=['POST'])
class ServerTls(Resource):
    @api.response(201, 'TLS key file stored')
    @api.response(409, 'TLS key file already exist')
    @api.response(400, 'Bad Request')
    @api.expect(remote_host_arg, file_arg, validate=True)
    def post(self):
        args = file_arg.parse_args()
        remote_host = request.args.get('remote')
        f_obj = args.req

        file_name = "%s.key" % remote_host
        if os.path.isfile(os.path.join(app.config["EASYRSA_PKI"], 'tls', file_name)):
            return Response(status=409)

        f_obj.save(os.path.join(app.config["EASYRSA_PKI"], 'tls', file_name))
        return Response(status=201)


@api.route('/client/ovpn', methods=['GET'])
class GetClientFile(Resource):
    @api.response(200, 'OK')
    @api.response(400, 'Bad Request')
    @api.response(500, 'Server error')
    @api.expect(remote_host_arg, user_name_arg, validate=True)
    def get(self):
        def _read_from_file(file_name):
            with open(file_name) as fn:
                return str(fn.read())

        def _validate_login(l):
            if l == 'ca':
                abort(400, "Invalid value for login")
            return l

        user_login = _validate_login(request.args.get('login'))
        remote_host = request.args.get('remote')
        tls_key_file_name = "%s.key" % remote_host

        if not os.path.isfile(os.path.join(app.config["EASYRSA_PKI"], 'tls', tls_key_file_name)):
            return abort(400, "TLS auth key for server %s not found" % remote_host)

        if not os.path.isfile(os.path.join(app.config["EASYRSA_PKI"], "issued", "%s.crt" % user_login)):
            command = [
                "easyrsa",
                "build-client-full",
                user_login,
                "nopass",
            ]
            process = subprocess.Popen(
                command,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            process.wait(60)
            rc = process.returncode
            if rc != 0:
                return abort(500, "RC: %s in command: %s" % (rc, ' '.join(command)))

        clent_cert = load_certificate(FILETYPE_PEM, _read_from_file(os.path.join(app.config["EASYRSA_PKI"], "issued", "%s.crt" % user_login)))
        r =  Response(
            render_template(
                'ovpn.tpl',
                remote_server=remote_host,
                client_key=_read_from_file(os.path.join(app.config["EASYRSA_PKI"], "private", "%s.key" % user_login)),
                client_cert=dump_certificate(FILETYPE_PEM, clent_cert).decode(),
                ca=_read_from_file(os.path.join(app.config["EASYRSA_PKI"], "ca.crt")),
                tls_auth=_read_from_file(os.path.join(app.config["EASYRSA_PKI"], 'tls', tls_key_file_name)),
            ),
            mimetype='application/x-openvpn-profile',
        )
        r.headers["Content-Disposition"] = 'attachment; filename="client.ovpn"'
        return r
