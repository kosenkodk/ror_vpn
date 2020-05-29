FROM python:3-alpine

COPY ./ /app
WORKDIR /app

RUN apk -U add build-base linux-headers pcre-dev pcre libffi libressl \
    libffi-dev libressl-dev \
    && pip3 install 'uWSGI==2.0.17.1' \
    && python setup.py install \
    && apk del build-base linux-headers pcre-dev libffi-dev libressl-dev

RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing/" >> /etc/apk/repositories && \
    apk add --update bash easy-rsa pamtester && \
    ln -s /usr/share/easy-rsa/easyrsa /usr/local/bin && \
    rm -rf /tmp/* /var/tmp/* /var/cache/apk/* /var/cache/distfiles/*

RUN mkdir -p /data \
    && chmod +x /app/entrypoint.sh

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

VOLUME /data

EXPOSE 5000
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["uwsgi", "--socket", "0.0.0.0:5000", "--protocol=http", "--enable-threads", "--mount", "/=ovpnpki:app"]
