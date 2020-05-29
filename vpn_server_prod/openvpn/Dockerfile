FROM alpine:3.9

RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing/" >> /etc/apk/repositories && \
    apk add --update openvpn iptables bash easy-rsa openvpn-auth-pam google-authenticator pamtester curl && \
    ln -s /usr/share/easy-rsa/easyrsa /usr/local/bin && \
    rm -rf /tmp/* /var/tmp/* /var/cache/apk/* /var/cache/distfiles/*

COPY ./openvpn-plugin-python-proxy /openvpn-plugin-python-proxy
RUN apk -U add gcc make libc-dev python-dev openvpn-dev \
        py-pip \
    && cd /openvpn-plugin-python-proxy \
    && make \
    && make install \
    && cd .. \
    && rm -rf openvpn-plugin-python-proxy \
    && apk del gcc make libc-dev python-dev openvpn-dev \
    && rm -rf /tmp/* /var/tmp/* /var/cache/apk/* /var/cache/distfiles/*

ENV CONFD_VERSION=0.16.0

RUN mkdir -p /usr/local/bin \
    && curl -o /usr/local/bin/confd -sSL https://github.com/kelseyhightower/confd/releases/download/v${CONFD_VERSION}/confd-${CONFD_VERSION}-linux-amd64 \
    && chmod +x /usr/local/bin/confd

COPY ./confd /etc/confd
COPY ./entrypoint.sh /entrypoint.sh
COPY ./bin /usr/local/bin
RUN chmod +x /entrypoint.sh \
    && chmod a+x /usr/local/bin/*

ENV EASYRSA /usr/share/easy-rsa
ENV EASYRSA_PKI /data/pki
ENV EASYRSA_VARS_FILE /data/vars

ENV EASYRSA_DN     "org"
ENV EASYRSA_REQ_COUNTRY    "US"
ENV EASYRSA_REQ_PROVINCE   "New York"
ENV EASYRSA_REQ_CITY       "New York"
ENV EASYRSA_REQ_ORG        "Org Ltd"
ENV EASYRSA_REQ_EMAIL      "vpn@example.com"
ENV EASYRSA_REQ_OU         "Infrastructure"

# Prevents refused client connection because of an expired CRL
ENV EASYRSA_CRL_DAYS 3650

ENV OPENVPN /etc/openvpn
ENV OPENVPN_PKI_URL http://openvpn-pki:5000
ENV OPENVPN_HOST 127.0.0.1

ENV OVPN_SERVER 192.168.255.0/24
ENV OVPN_SERVER_MASK "192.168.255.0 255.255.255.0"
ENV OVPN_ROUTES="192.168.254.0/24"
ENV OVPN_DEVICE "tun"
ENV OVPN_DEVICEN 0
ENV OVPN_DEFROUTE 1
ENV OVPN_NAT 0

ENV PYTHON_EGG_CACHE=/tmp/.python-eggs

RUN mkdir -p $OPENVPN \
        $OPENVPN/status

VOLUME /data
VOLUME $OPENVPN/status

ENTRYPOINT ["/entrypoint.sh"]
CMD ["--mute-replay-warnings", "--duplicate-cn", "--management", "127.0.0.1", "7505"]
