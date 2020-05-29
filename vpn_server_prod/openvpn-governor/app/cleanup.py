import base64
import datetime
import os
import re
import telnetlib
import time

from bson.objectid import ObjectId
from pymongo import MongoClient

VPN_HOST = os.environ['OPENVPN_HOST']
VPN_HOST_ID = os.environ['OPENVPN_HOST_ID']

OVPN_ADDR = '127.0.0.1'
OVPN_PORT = int(7505)

MONGO_HOST = os.environ['MONGO_HOST']
MONGO_PORT = int(os.environ['MONGO_PORT'])
MONGO_DB = os.environ['MONGO_DB']

DELAY_SEC = int(os.environ['DELAY_SEC'])

mongo = MongoClient(host=MONGO_HOST, port=MONGO_PORT, connect=True)
db = mongo[MONGO_DB]


def get_data(hostaddress, port, command):
    """
    USES THE OPENVPN MANAGEMENT INTERFACE FOR DATA
    :param hostaddress:
    :param port:
    :param command:
    :return:
    """
    a_res = []
    try:
        con = telnetlib.Telnet(hostaddress, int(port), 5)
        con.read_lazy()
        #con.read_until("'help' for more info")
        time.sleep(.1)
        con.write("%s\n" % command)
        time.sleep(3)
        con.write("exit\n")
        res = con.read_all()
        con.close()

        for line in res.splitlines():
            if re.search("OpenVPN Management Interface", line) or re.search("END", line):
                continue
            a_res.append(line)
    except Exception as e:
        print("ERROR: Connection to Server failed: %s" % e)
    return a_res


def get_active_users():
    res = []
    lines = get_data(OVPN_ADDR, OVPN_PORT, 'status')
    if len(lines) < 4:
        return res

    head = [el.replace(' ', '_') for el in lines[2].split(',')]
    for line in lines[3:]:
        if line == 'ROUTING TABLE':
            break
        res.append(dict(zip(head, line.split(','))))
    return res


def get_connection_id(user, h):
    host, port = h.split(':')
    return base64.b64encode("%s-%s-%s" % (user, host, port))


while True:
    try:
        gen_time = datetime.datetime.today() - datetime.timedelta(seconds=60)
        dummy_id = ObjectId.from_datetime(gen_time)

        sessions = [get_connection_id(user['Common_Name'], user['Real_Address']) for user in get_active_users()]
        print("%s" % sessions)
        result = db.sessions.delete_many(
            {
                '_id': {'$lt': dummy_id},
                'vpn_type': 'openvpn',
                'vpn_host': VPN_HOST,
                'vpn_host_id': VPN_HOST_ID,
                'vpn_connection_id': {'$not': {'$in': sessions}},
            },
        )
        if result.deleted_count > 0:
            print("Sessions deleted: %s" % result.deleted_count)
    except Exception as e:
        print(e)
    time.sleep(DELAY_SEC)
