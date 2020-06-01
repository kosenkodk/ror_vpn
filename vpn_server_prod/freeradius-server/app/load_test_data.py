# -*- coding: utf-8 -*-
from pymongo import MongoClient
import os
import hashlib


def pass_hash(password):
    return hashlib.new('md4', password.encode('utf-16le')).hexdigest()


DATA = [
    {
        'vpn_login': 'user1',
        'vpn_password': pass_hash("testpasswd123"),
        'vpn_max_sessions': 1,
        'vpn_enabled': True,
    },
    {
        'vpn_login': 'user2',
        'vpn_password': pass_hash("testpasswd123"),
        'vpn_max_sessions': 5,
        'vpn_enabled': True,
    },
    {
        'vpn_login': 'user3',
        'vpn_password': pass_hash("testpasswd123"),
        'vpn_max_sessions': 3,
        'vpn_enabled': True,
    },
    {
        'vpn_login': 'user4',
        'vpn_password': pass_hash("testpasswd123"),
        'vpn_max_sessions': 5,
        'vpn_enabled': True,
    },
    {
        'vpn_login': 'user5',
        'vpn_password': pass_hash("testpasswd123"),
        'vpn_max_sessions': 5,
        'vpn_enabled': False,
    }
]

MONGO_HOST = os.environ['MONGO_HOST']
MONGO_PORT = int(os.environ['MONGO_PORT'])
MONGO_DB = os.environ['MONGO_DB']
MONGO_USERNAME = os.environ['MONGO_USERNAME']
MONGO_PWD = os.environ['MONGO_PWD']

mongo = MongoClient(username=MONGO_USERNAME, password=MONGO_PWD, host=MONGO_HOST, port=MONGO_PORT, connect=True)

db = mongo[MONGO_DB]

db.sessions.drop()
db.authentication.drop()

db.sessions.create_index([("vpn_login", 1)])
db.sessions.create_index([
    ("vpn_type", 1),
    ("vpn_host", 1),
    ("vpn_host_id", 1),
    ("vpn_connection_id", 1),
])

db.authentication.create_index([("vpn_login", 1)], unique=True)
db.authentication.insert_many(DATA)
