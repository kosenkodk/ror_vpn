FROM alpine:3.9

ENV PDNS_RECURSOR 4.1.12
ENV LUA_VERSION 5.1

RUN apk -U add py-pip libstdc++ boost boost-context openssl boost-wserialization lua${LUA_PACKAGE} \
	&& apk -U add --virtual .build-dependencies curl build-base boost-dev bison flex file openssl-dev lua${LUA_PACKAGE}-dev \
    && curl -sS https://downloads.powerdns.com/releases/pdns-recursor-${PDNS_RECURSOR}.tar.bz2 | tar xjf - -C . \
    && cd pdns-recursor-${PDNS_RECURSOR} \
    && ./configure --with-lua=lua \
    && make \
    && make install \
    && cd .. \
    && rm -rf pdns-recursor-${PDNS_RECURSOR} \
    && apk --purge del .build-dependencies


EXPOSE 53/udp
CMD ["pdns_recursor", "--daemon=no" ]
