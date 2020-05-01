#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
if [ -f tmp/pids/server.pid ]; then
  rm tmp/pids/server.pid
fi

yarn install --check-files --ignore-engines
# rails < 6
# # bundle exec rake db:migrate 2>/dev/null || bundle exec rake db:setup
# rails >= 6
bundle exec rake db:prepare

export NODE_OPTIONS="--max-old-space-size=4096"
bundle exec rake assets:precompile
bundle exec rake webpacker:compile

# bin/webpack
# bin/webpack-dev-server --host 0.0.0.0 --hot

# if [ $RAILS_ENV = 'production' ];
# then
#   echo 'production assets precompile'
#   RAILS_ENV=$RAILS_ENV rake assets:precompile
#   RAILS_ENV=$RAILS_ENV RACK_ENV=$RACK_ENV NODE_ENV=$NODE_ENV bin/webpack
# else
#   echo ''
# fi

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"