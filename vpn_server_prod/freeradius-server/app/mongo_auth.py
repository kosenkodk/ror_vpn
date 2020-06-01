#! /usr/bin/env python
from pymongo import MongoClient, ReturnDocument
import os
import radiusd

MONGO_HOST = os.environ['MONGO_HOST']
MONGO_PORT = int(os.environ['MONGO_PORT'])
MONGO_DB = os.environ['MONGO_DB']
MONGO_USERNAME = os.environ['MONGO_USERNAME']
MONGO_PWD = os.environ['MONGO_PWD']

mongo = MongoClient(username=MONGO_USERNAME, password=MONGO_PWD, host=MONGO_HOST, port=MONGO_PORT, connect=True)
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

    vpn_max_sessions = res.get('vpn_max_sessions')
    if vpn_max_sessions:
        vpn_max_sessions = int(vpn_max_sessions)
        try:
            sessions = db.sessions.find(
                {
                    'vpn_login': login,
                }
            )
        except Exception as e:
            log(radiusd.L_ERR, str(e))
            return radiusd.RLM_MODULE_FAIL

        if sessions.count() >= vpn_max_sessions:
            log(radiusd.L_INFO, 'Maximum number of sessions for user %s exceeded %s' %(login, vpn_max_sessions))
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


def accounting_start(p):
    vpn_host = get_from_p("NAS-Identifier", p)
    vpn_connection_id = get_from_p("Acct-Unique-Session-Id", p)
    login = get_from_p("User-Name", p)
    if not login:
        return radiusd.RLM_MODULE_FAIL
    log(radiusd.L_DBG, "Login: %s" % login)

    try:
        res = db.sessions.find_one_and_replace(
            {
                'vpn_host': vpn_host,
                'vpn_host_id': vpn_host,
                'vpn_login': login,
                'vpn_connection_id': vpn_connection_id,

            },
            replacement={
                'vpn_host': vpn_host,
                'vpn_host_id': vpn_host,
                'vpn_login': login,
                'vpn_connection_id': vpn_connection_id,
                'vpn_type': 'ipsec',
            },
            upsert=True,
            return_document=ReturnDocument.BEFORE,
        )
    except Exception as e:
        log(radiusd.L_ERR, str(e))

    return radiusd.RLM_MODULE_OK


def accounting_stop(p):
    vpn_host = get_from_p("NAS-Identifier", p)
    vpn_connection_id = get_from_p("Acct-Unique-Session-Id", p)
    login = get_from_p("User-Name", p)
    if not login:
        return radiusd.RLM_MODULE_FAIL
    log(radiusd.L_DBG, "Login: %s" % login)

    try:
        db.sessions.find_one_and_delete(
            {
                'vpn_host': vpn_host,
                'vpn_host_id': vpn_host,
                'vpn_login': login,
                'vpn_connection_id': vpn_connection_id,
            },
        )
    except Exception as e:
        log(radiusd.L_ERR, str(e))

    return radiusd.RLM_MODULE_OK


def accounting(p):
    log(radiusd.L_DBG, "*** accounting ***")
    radiusd.radlog(radiusd.L_INFO, '*** radlog call in accounting (0) ***')
    log(radiusd.L_DBG, str(p))

    acc_action = get_from_p("Acct-Status-Type", p)
    if acc_action == "Start":
        log(radiusd.L_DBG, "*** Start ***")
        return accounting_start(p)

    if acc_action == "Stop":
        log(radiusd.L_DBG, "*** Stop ***")
        return accounting_stop(p)

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
