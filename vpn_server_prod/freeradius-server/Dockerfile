ARG from=debian:stretch
FROM ${from} as build

ARG gccver=6

#
#  Install build tools
#
RUN apt-get update
RUN apt-get install -y devscripts equivs git quilt g++-${gccver}

#
#  Create build directory
#
RUN mkdir -p /usr/local/src/repositories
WORKDIR /usr/local/src/repositories

#
#  Shallow clone the FreeRADIUS source
#
ARG source=https://github.com/FreeRADIUS/freeradius-server.git
ARG release=v3.0.x

RUN git clone --depth 1 --single-branch --branch ${release} ${source}
WORKDIR freeradius-server

#
#  Install build dependencies
#
RUN git checkout ${release}; \
    if [ -e ./debian/control.in ]; then \
        debian/rules debian/control; \
    fi; \
    echo 'y' | mk-build-deps -irt'apt-get -yV' debian/control

#
#  Build the server
#
RUN make -j2 deb

#
#  Clean environment and run the server
#
FROM ${from}
COPY --from=build /usr/local/src/repositories/*.deb /tmp/

RUN apt-get update \
    && apt-get install -y /tmp/*.deb \
    && apt-get install -y python-pip curl \
    && apt-get clean \
    && rm -r /var/lib/apt/lists/* /tmp/*.deb \
    \
    && ln -s /etc/freeradius /etc/raddb


ENV CONFD_VERSION=0.16.0

RUN mkdir -p /usr/local/bin \
    && curl -o /usr/local/bin/confd -sSL https://github.com/kelseyhightower/confd/releases/download/v${CONFD_VERSION}/confd-${CONFD_VERSION}-linux-amd64 \
    && chmod +x /usr/local/bin/confd

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
COPY ./confd /etc/confd
COPY ./mods-enabled/* /etc/freeradius/mods-enabled/
COPY ./sites-enabled/* /etc/freeradius/sites-enabled/
COPY ./app/* /etc/freeradius/mods-config/python/
RUN pip install -t /etc/freeradius/mods-config/python -r /etc/freeradius/mods-config/python/requirements.txt

EXPOSE 1812/udp 1813/udp

ENV FREERADIUS_CLIENT_SECRET testing123
ENV FREERADIUS_CLIENT_NET 127.0.0.11


ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["freeradius"]
