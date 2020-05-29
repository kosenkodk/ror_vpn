#!/bin/bash
set -e

/usr/local/bin/confd -backend="env" -confdir="/etc/confd" -onetime

function wait_for_code {
    while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' $1)" != "$2" ]]; do echo "Waiting for URL: $1 code $2"; sleep 5; done
}

if [ ! -d "$EASYRSA_PKI" ]; then
    # https://unix.stackexchange.com/questions/22044/correct-locking-in-shell-scripts
    lockfile=/data/.lock

    if ( set -o noclobber; echo "$(hostname)" > "$lockfile") 2> /dev/null; then

            trap 'rm -f "$lockfile"; exit $?' INT TERM EXIT

            echo "Init procedure"

            easyrsa init-pki

            easyrsa gen-dh
            openvpn --genkey --secret $EASYRSA_PKI/ta.key

            echo -en "\n\n\n\n\n\n\n" |easyrsa gen-req ${OPENVPN_HOST} nopass

            mkdir -p $EASYRSA_PKI/issued

            wait_for_code "$OPENVPN_PKI_URL/ca" "200"
            # Get a CA
            curl -f -sSL "$OPENVPN_PKI_URL/ca" -o "$EASYRSA_PKI/ca.crt"

            # Post TLS key
            curl -f -sSL -X POST \
                "$OPENVPN_PKI_URL/server/tls?remote=${OPENVPN_HOST}" \
                -H "Content-Type: multipart/form-data" \
                -F "req=@$EASYRSA_PKI/ta.key"

            # Sign server certificate
            curl -f -sSL -X POST \
                "$OPENVPN_PKI_URL/server/sign" \
                -H "Content-Type: multipart/form-data" \
                -F "req=@$EASYRSA_PKI/reqs/${OPENVPN_HOST}.req" -o "$EASYRSA_PKI/issued/${OPENVPN_HOST}.crt"


            # clean up after yourself, and release your trap
            rm -f "$lockfile"
            trap - INT TERM EXIT
    else
            echo "Lock Exists: $lockfile owned by $(cat $lockfile)"
    fi
fi

# sync
while [ ! -f "$EASYRSA_PKI/issued/${OPENVPN_HOST}.crt" ]; do
    echo "Wait for $EASYRSA_PKI/issued/${OPENVPN_HOST}.crt"
    sleep 2
done
sleep 1

exec /usr/local/bin/ovpn_run "$@"
