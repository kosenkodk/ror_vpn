#!/bin/sh

/usr/local/bin/confd -backend="env" -confdir="/etc/confd" -onetime

exec "$@"
