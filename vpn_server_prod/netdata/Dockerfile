FROM netdata/netdata

RUN apk -U add alpine-sdk autoconf automake \
    iproute2 ipset tcpdump util-linux \
    && mkdir -p /usr/src \
    && cd /usr/src \
    && curl -sSL https://github.com/firehol/iprange/releases/download/v1.0.4/iprange-1.0.4.tar.bz2 -O \
    && tar -xf iprange-1.0.4.tar.bz2 \
    && cd iprange-1.0.4 \
    && ./configure && make && make install \
    && cd .. \
    && curl -sSL https://github.com/firehol/firehol/releases/download/v3.1.6/firehol-3.1.6.tar.bz2 -O \
    && tar -xf firehol-3.1.6.tar.bz2  \
    && cd firehol-3.1.6 \
    && ./autogen.sh \
    && ./configure --prefix=/usr --sysconfdir=/etc --localstatedir=/var --disable-man --disable-doc \
    && make && make install \
    && cd .. \
    && rm -rf ./* \
    && apk del --purge alpine-sdk autoconf automake

