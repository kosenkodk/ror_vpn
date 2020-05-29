#!/bin/bash

set -x

/usr/local/bin/confd -backend="env" -confdir="/etc/confd" -onetime

mkdir -p /data
python /app/get_ips.py >/data/speedtest.txt

fireqos start

# to do lookup in /var/run/fireqos/world-in.conf
BULK_MARKER=15
OVPN_NET="${OVPN_NET:-172.27.0.1/24}"
LAN_IFACE=$(ip -o addr show scope global |grep "${OVPN_NET}"  |awk '{print $2}')
WAN_IFACE=eth0
# ~ 1Mb
TRIGGER_SIZE=1000000

# tc qdisc show
# tc class show dev eth0
# tc filter show dev eth0

iptables -N BULKCONN || true

iptables -F BULKCONN

# Small packet is probably interactive or flow control
iptables -A BULKCONN -m length --length 0:500 -j RETURN
# Small packet connections: multi purpose (don't harm since not maxed out)
iptables -A BULKCONN -m connbytes --connbytes 0:250 --connbytes-dir both --connbytes-mode avgpkt -j RETURN

iptables -A BULKCONN -p tcp --dport 443 -j CLASSIFY --set-class 1:15
iptables -A BULKCONN -p tcp --sport 443 -j CLASSIFY --set-class 1:15

#After one megabyte a connection is considered a download
iptables -A BULKCONN -m connbytes --connbytes 4194304: --connbytes-dir both --connbytes-mode bytes -j CLASSIFY --set-class 1:8000

iptables -A BULKCONN -j RETURN

iptables-save |grep -- "-A FORWARD -j BULKCONN" 2>&1 >/dev/null
if [ $? -ne 0 ]; then
    iptables -I FORWARD -j BULKCONN
fi



exec "$@"
