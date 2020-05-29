#!/bin/sh
set -e

if [ ! -d "$EASYRSA_PKI" ]; then
    easyrsa init-pki

    echo -en "\n\n\n\n\n\n\n" |easyrsa  build-ca nopass
    easyrsa gen-dh

    mkdir -p $EASYRSA_PKI/tls
fi

exec "$@"
