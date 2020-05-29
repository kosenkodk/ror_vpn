#!/bin/sh
# set -e
echo "Creating users..."
# mongo admin --host localhost -u $MONGO_USERNAME -p $MONGO_PWD --eval "db.createUser({user: 'appuser', pwd: 'supersecret',roles: [{role: 'readWrite', db: 'MyAppDb'}]}); db.createUser({user: 'administrator', pwd: 'no1willguess', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]});"

mongo admin --host $MONGO_HOST -u $MONGO_USERNAME -p $MONGO_PWD --eval "db.createUser({user: $MONGO_USERNAME, pwd: $MONGO_PWD , roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]});"
# mongo admin --host $MONGO_HOST -u $MONGO_USERNAME -p $MONGO_PWD --eval "db.createUser({user: $MONGO_USERNAME, pwd: $MONGO_PWD , roles: [{role: 'userAdminAnyDatabase', db: 'vpnUsers'}]});"
echo "Users created."
# exec "$@"