FROM debian:stretch

RUN apt-get update \
    && apt-get install -y \
        make gcc g++ libcap-dev iptables-dev module-assistant libpcap-dev autogen automake autoconf libtool pkg-config \
        python-xmltodict python-pip \
        curl unzip kmod procps \
        ifupdown iptables traceroute jq ipset git \
    && cd /usr/src/ \
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
    #&& apt-get install -y linux-headers-`uname -r` \
    #&& curl -sSL https://github.com/betolj/ndpi-netfilter/archive/master.zip -O \
    #&& unzip master.zip \
    #&& cd ndpi-netfilter-master \
    #&& tar -xf nDPI.tar.gz \ 
    #&& NDPI_PATH=/usr/src/ndpi-netfilter-master/nDPI make \
    #&& make modules_install \
    #&& cp ipt/libxt_ndpi.so /lib/xtables \
    #&& cd .. \
    && apt-get purge -y make gcc g++ libcap-dev iptables-dev module-assistant libpcap-dev autogen automake autoconf libtool pkg-config \
    && rm -rf ./*

ENV CONFD_VERSION=0.16.0

RUN mkdir -p /usr/local/bin \
    && curl -o /usr/local/bin/confd -sSL https://github.com/kelseyhightower/confd/releases/download/v${CONFD_VERSION}/confd-${CONFD_VERSION}-linux-amd64 \
    && chmod +x /usr/local/bin/confd

COPY ./confd /etc/confd

COPY ./app /app
RUN pip install -r /app/requirements.txt

COPY ./entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["watch", "-dc", "ps"]
