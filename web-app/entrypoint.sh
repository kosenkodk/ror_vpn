#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /data/tmp/pids/server.pid

yarn install --check-files --ignore-engines

# bundle exec rake db:migrate 2>/dev/null || bundle exec rake db:setup
bundle exec rake db:migrate

export NODE_OPTIONS="--max-old-space-size=4096"
bundle exec rake assets:precompile
# bin/webpack-dev-server --host 0.0.0.0 --hot

# if [ ! -d "$RAILS_ENV" ]; then
#   RAILS_ENV=$RAILS_ENV rake db:migrate
# fi

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