# Base image:
FROM jwilder/nginx-proxy

# copy over static assets
# COPY ./webapp/public public

# Copy Nginx config template
COPY /nginx/conf.d/webapp-nginx.conf /tmp/docker.nginx
# substitute variable references in the Nginx config template for real values from the environment
# put the final config in its place
RUN envsubst '$RAILS_ROOT' < /tmp/docker.nginx > /etc/nginx/conf.d/webapp-nginx.conf

# EXPOSE 8080 1443
# EXPOSE 80 443

# Use the "exec" form of CMD so Nginx shuts down gracefully on SIGTERM (i.e. `docker stop`)
# CMD [ "nginx", "-g", "daemon off;" ]
CMD [ "service", "nginx", "reload" ]
