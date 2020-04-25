#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /data/tmp/pids/server.pid

# export NODE_OPTIONS="--max-old-space-size=4096"
# bundle exec rake db:migrate 2>/dev/null || bundle exec rake db:setup
# bundle exec rake assets:precompile

# yarn install --check-files
# bin/webpack-dev-server --host 0.0.0.0 --hot

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"