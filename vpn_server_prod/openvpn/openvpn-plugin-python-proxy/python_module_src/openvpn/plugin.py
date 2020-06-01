#!/usr/local/bin/python2

'''
openvpn plugin proxy module

Copyright (C) 2018 Kaltashkin Eugene <aborche.aborche@gmail.com>

For detailed description of plugin functions read 
https://github.com/OpenVPN/openvpn/blob/master/include/openvpn-plugin.h.in

'''
from pymongo import MongoClient, ReturnDocument

import base64
import os
import sys

OPENVPN_PLUGIN_FUNC_SUCCESS = 0
OPENVPN_PLUGIN_FUNC_ERROR = 1
OPENVPN_PLUGIN_FUNC_DEFERRED = 2

MONGO_HOST = os.environ['MONGO_HOST']
MONGO_PORT = int(os.environ['MONGO_PORT'])
MONGO_DB = os.environ['MONGO_DB']

VPN_HOST = os.environ['OPENVPN_HOST']
VPN_HOST_ID = os.environ['OPENVPN_HOST_ID']
MONGO_USERNAME = os.environ['MONGO_USERNAME']
MONGO_PWD = os.environ['MONGO_PWD']

mongo = MongoClient(username=MONGO_USERNAME, password=MONGO_PWD, host=MONGO_HOST, port=MONGO_PORT, connect=True)
db = mongo[MONGO_DB]


def get_connection_id(user, ip, port):
    return base64.b64encode("%s-%s-%s" % (user, ip, port))


def get_field(d, field, default=None):
    if field not in d:
        return default
    return d[field]


def test(*kwargs):
    for i in kwargs:
        print('kwargs: %s' % i)
    print("%s" % sys.argv)
    print(os.environ.keys())


def unpack_argv():
    return dict((k, v) for k, v in [x.split('=', 1) for x in sys.argv])


def OPENVPN_PLUGIN_UP(*args):
    """
    Function OPENVPN_PLUGIN_UP called when plugin started first time from OpenVPN main process
    """
    print("-" * 30)
    print("OPENVPN_PLUGIN_UP")
    envp = unpack_argv()
    print(envp)
    print("=" * 30)
    return OPENVPN_PLUGIN_FUNC_SUCCESS


def OPENVPN_PLUGIN_DOWN(*args):
    print("-" * 30)
    print("OPENVPN_PLUGIN_DOWN")
    """
    Function OPENVPN_PLUGIN_DOWN called when OpenVPN main process is shutting down
    """
    envp = unpack_argv()
    print(envp)
    print("=" * 30)
    return OPENVPN_PLUGIN_FUNC_SUCCESS


def OPENVPN_PLUGIN_ROUTE_UP(*args):
    print("-" * 30)
    print("OPENVPN_PLUGIN_ROUTE_UP")
    envp = unpack_argv()
    print(envp)
    print("=" * 30)
    return OPENVPN_PLUGIN_FUNC_SUCCESS


def OPENVPN_PLUGIN_IPCHANGE(*args):
    print("-" * 30)
    print("OPENVPN_PLUGIN_IPCHANGE")
    envp = unpack_argv()
    print(envp)
    print("=" * 30)
    return OPENVPN_PLUGIN_FUNC_SUCCESS


def OPENVPN_PLUGIN_TLS_VERIFY(*args):
    print("-" * 30)
    print("OPENVPN_PLUGIN_TLS_VERIFY")
    envp = unpack_argv()
    print(envp)
    print("=" * 30)
    return OPENVPN_PLUGIN_FUNC_SUCCESS


def OPENVPN_PLUGIN_AUTH_USER_PASS_VERIFY(*args):
    print("-" * 30)
    """
    Function OPENVPN_PLUGIN_AUTH_USER_PASS_VERIFY used for checking username/password pair.
    in OpenVPN debug log password field is not included due security purposes, but exists in argv array
    """
    print("OPENVPN_PLUGIN_AUTH_USER_PASS_VERIFY")
    envp = unpack_argv()
    print(envp)
    print("=" * 30)
    return OPENVPN_PLUGIN_FUNC_SUCCESS


def OPENVPN_PLUGIN_CLIENT_CONNECT(*args):
    print("-" * 30)
    print("OPENVPN_PLUGIN_CLIENT_CONNECT\n")
    envp = unpack_argv()
    print(envp)
    print("=" * 30)
    return OPENVPN_PLUGIN_FUNC_SUCCESS


def OPENVPN_PLUGIN_CLIENT_CONNECT_V2(*args):
    #print("-" * 30)
    #print("OPENVPN_PLUGIN_CLIENT_CONNECT_V2")
    envp = unpack_argv()
    #print(envp)
    #print("=" * 30)

    vpn_login = envp['X509_0_CN']

    trusted_ip = envp.get('trusted_ip') or envp['untrusted_ip']
    trusted_port = envp.get('trusted_port') or envp['untrusted_port']
    ifconfig_pool_remote_ip = envp['ifconfig_pool_remote_ip']

    vpn_connection_id = get_connection_id(vpn_login, trusted_ip, trusted_port)

    try:
        res = db.sessions.find_one_and_replace(
            {
                'vpn_host': VPN_HOST,
                'vpn_host_id': VPN_HOST_ID,
                'vpn_login': vpn_login,
                'vpn_connection_id': vpn_connection_id,

            },
            replacement={
                'vpn_host': VPN_HOST,
                'vpn_host_id': VPN_HOST_ID,
                'vpn_login': vpn_login,
                'vpn_connection_id': vpn_connection_id,
                'vpn_type': 'openvpn',
            },
            upsert=True,
            return_document=ReturnDocument.BEFORE,
        )
    except Exception as e:
        print(e)

    print("New session: %s - %s - %s" %(VPN_HOST, vpn_login, vpn_connection_id))
    return OPENVPN_PLUGIN_FUNC_SUCCESS


def OPENVPN_PLUGIN_CLIENT_DISCONNECT(*args):
    #print("-" * 30)
    #print("OPENVPN_PLUGIN_CLIENT_DISCONNECT\n")
    envp = unpack_argv()
    #print(envp)
    #print("=" * 30)

    vpn_login = envp['X509_0_CN']

    trusted_ip = envp.get('trusted_ip') or envp['untrusted_ip']
    trusted_port = envp.get('trusted_port') or envp['untrusted_port']
    ifconfig_pool_remote_ip = envp['ifconfig_pool_remote_ip']

    vpn_connection_id = get_connection_id(vpn_login, trusted_ip, trusted_port)

    try:
        db.sessions.find_one_and_delete(
            {
                'vpn_host': VPN_HOST,
                'vpn_host_id': VPN_HOST_ID,
                'vpn_login': vpn_login,
                'vpn_connection_id': vpn_connection_id,
            },
        )
    except Exception as e:
        print(e)
    print("Closed session: %s - %s - %s" %(VPN_HOST, vpn_login, vpn_connection_id))
    return OPENVPN_PLUGIN_FUNC_SUCCESS


def OPENVPN_PLUGIN_LEARN_ADDRESS(*args):
    print("-" * 30)
    print("OPENVPN_PLUGIN_LEARN_ADDRESS\n")
    envp = unpack_argv()
    '''
    # Uncomment this block for activate packet filter file creation
    if 'pf_file' in envp:
        print('PF_File is %s'%(envp['pf_file']))
        rules = ["[CLIENTS DROP]",
                "+fa56bf61-90da-11e8-bf33-005056a12a82-1234567",
                "+12345678-90da-11e8-bf33-005056a12a82-1234567",
                "[SUBNETS DROP]",
                "+10.150.0.1",
                "[END]"]
        with open(envp['pf_file'], 'w') as f:
            f.write('\n'.join(rules))
    '''
    envp = unpack_argv()
    print(envp)
    print("=" * 30)
    return OPENVPN_PLUGIN_FUNC_SUCCESS


def OPENVPN_PLUGIN_TLS_FINAL(*args):
    #print("-" * 30)
    #print("OPENVPN_PLUGIN_TLS_VERIFY")
    envp = unpack_argv()
    #print(envp)
    #print("=" * 30)
    vpn_login = envp.get('X509_0_CN')

    trusted_ip = envp.get('trusted_ip') or envp['untrusted_ip']
    trusted_port = envp.get('trusted_port') or envp['untrusted_port']
    vpn_connection_id = get_connection_id(vpn_login, trusted_ip, trusted_port)

    if not vpn_login:
        print("Unable to get login from certificate X509_0_CN")
        return OPENVPN_PLUGIN_FUNC_ERROR

    try:
        res = db.authentication.find_one(
            {
                'vpn_login': vpn_login,
            }
        )
    except Exception as e:
        print(e)
        return OPENVPN_PLUGIN_FUNC_ERROR

    if not res:
        print('user not found: %s' % vpn_login)
        return OPENVPN_PLUGIN_FUNC_ERROR

    if not res.get('vpn_enabled'):
        print('user disabled: %s' % vpn_login)
        return OPENVPN_PLUGIN_FUNC_ERROR

    vpn_max_sessions = get_field(res, 'vpn_max_sessions')
    if vpn_max_sessions:
        vpn_max_sessions = int(vpn_max_sessions)
        try:
            sessions = db.sessions.find(
                {
                    'vpn_login': vpn_login,
                    # guess that the client can connect to the same host
                    # do not take into account that sessions
                    'vpn_connection_id': {'$ne': vpn_connection_id},
                    'vpn_host': VPN_HOST,
                }
            )
        except Exception as e:
            print(e)
            return OPENVPN_PLUGIN_FUNC_ERROR

        if sessions.count() >= vpn_max_sessions:
            print('Maximum number of sessions for user %s exceeded %s' %(vpn_login, vpn_max_sessions))
            return OPENVPN_PLUGIN_FUNC_ERROR

    print('OK: %s ' % vpn_login)
    return OPENVPN_PLUGIN_FUNC_SUCCESS


def OPENVPN_PLUGIN_ENABLE_PF(*args):
    """
    Function OPENVPN_ENABLE_PF used for enable personal firewall rules for each client.
    If OPENVPN_ENABLE_PF is enabled, each called plugins part checks pf_file environment file
    """
    print("-" * 30)
    print("OPENVPN_PLUGIN_ENABLE_PF")
    envp = unpack_argv()
    print(envp)
    print("=" * 30)
    return OPENVPN_PLUGIN_FUNC_SUCCESS


def OPENVPN_PLUGIN_ROUTE_PREDOWN(*args):
    print("-" * 30)
    print("OPENVPN_PLUGIN_ROUTE_PREDOWN")
    envp = unpack_argv()
    print(envp)
    print("=" * 30)
    return OPENVPN_PLUGIN_FUNC_SUCCESS


def OPENVPN_PLUGIN_N(*args):
    print("-" * 30)
    print("OPENVPN_PLUGIN_N")
    envp = unpack_argv()
    print(envp)
    print("=" * 30)
    return OPENVPN_PLUGIN_FUNC_SUCCESS


def OPENVPN_UNKNOWN_PLUGIN_TYPE(*args):
    print("-" * 30)
    print("OPENVPN_UNKNOWN_PLUGIN_TYPE")
    envp = unpack_argv()
    print(envp)
    print("=" * 30)
    return OPENVPN_PLUGIN_FUNC_SUCCESS
