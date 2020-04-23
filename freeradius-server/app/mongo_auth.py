#! /usr/bin/env python
from pymongo import MongoClient
import os
import radiusd
import hashlib
import binascii

MONGO_HOST = os.environ['MONGO_HOST']
MONGO_PORT = int(os.environ['MONGO_PORT'])
MONGO_DB = os.environ['MONGO_DB']

mongo = MongoClient(host=MONGO_HOST, port=MONGO_PORT, connect=True)
db = mongo[MONGO_DB]


def get_from_p(field, p):
    for (k,v) in p:
        if field == k:
            return v


def log(level, s):
  """Log function."""
  radiusd.radlog(level, 'mongo_auth: ' + s)


def instantiate(p):
    print "*** instantiate ***"
    print p
    # return 0 for success or -1 for failure


def authorize(p):
    log(radiusd.L_DBG, "*** authorize ***")
    log(radiusd.L_DBG, '*** radlog call in authorize ***')
    log(radiusd.L_DBG, str(p))

    login = get_from_p("User-Name", p)
    if not login:
        return radiusd.RLM_MODULE_FAIL
    log(radiusd.L_DBG, "Login: %s" % login)

    try:
        res = db.authentication.find_one(
            {
                'vpn_login': login,
            }
        )
    except Exception as e:
        log(radiusd.L_ERR, str(e))
        return radiusd.RLM_MODULE_FAIL
    log(radiusd.L_DBG, 'Got result from database: %s ' % login)

    if not res:
        log(radiusd.L_INFO, 'user not found: %s' % login)
        return radiusd.RLM_MODULE_NOTFOUND

    if not res.get('vpn_enabled'):
        log(radiusd.L_INFO, 'user disabled: %s' % login)
        return radiusd.RLM_MODULE_REJECT

    password_hash = res.get('vpn_password')
    if not password_hash:
        return radiusd.RLM_MODULE_FAIL

    config = (('NT-Password', str(password_hash)),)
    result = radiusd.RLM_MODULE_UPDATED
    log(radiusd.L_DBG, 'OK: %s ' % login)
    return (result, (), config)


def preacct(p):
    print "*** preacct ***"
    print p
    return radiusd.RLM_MODULE_OK


def accounting(p):
    print "*** accounting ***"
    radiusd.radlog(radiusd.L_INFO, '*** radlog call in accounting (0) ***')
    print
    print p
    return radiusd.RLM_MODULE_OK


def pre_proxy(p):
    print "*** pre_proxy ***"
    print p
    return radiusd.RLM_MODULE_OK


def post_proxy(p):
    print "*** post_proxy ***"
    print p
    return radiusd.RLM_MODULE_OK


def post_auth(p):
    print "*** post_auth ***"
    print p
    return radiusd.RLM_MODULE_OK


def recv_coa(p):
    print "*** recv_coa ***"
    print p
    return radiusd.RLM_MODULE_OK


def send_coa(p):
    print "*** send_coa ***"
    print p
    return radiusd.RLM_MODULE_OK


def detach():
    print "*** goodbye from example.py ***"
    return radiusd.RLM_MODULE_OK
