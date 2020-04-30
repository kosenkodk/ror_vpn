#!/bin/sh
set -e
  cp $PWD/nginx/conf.d/webapp-nginx.conf /tmp/docker.nginx
  envsubst "$RAILS_ROOT" < /tmp/docker.nginx > /etc/nginx/conf.d/webapp-nginx.conf
  # cp nginx/conf.d/webapp-nginx.conf:/etc/nginx/conf.d/webapp-nginx.conf
  nginx reload
exec "$@"
