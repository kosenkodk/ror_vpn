# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Cron tab
whenever -l
whenever --update-crontab --set environment=development

* Deployment instructions
* Development
export NODE_OPTIONS="--max-old-space-size=2048"
kill -9 $(lsof -i tcp:3000 -t)
kill -9 $(ps aux | grep ruby | grep -v grep | awk '{print $2}')
kill -9 $(ps aux | grep wkhtmltopdf | grep -v grep | awk '{print $2}')
* Testing
# NODE_ENV is development by default
RAILS_ENV=test ./bin/webpack

RAILS_ENV=test bundle exec rails webpacker:compile
RAILS_ENV=test bundle exec rails assets:precompile
bundle exec rspec
* ...


docker-compose run web-app rails new . --force --no-deps --database=postgresql
docker-compose run web-app rake db:create

redis
redis-server --bind 0.0.0.0 --daemonize yes
ps aux | grep redis-server

production
cp /web-app/config/credentials/production.key 
cp /web-app/config/master.key


docker-compose exec openvpn-pki mkdir /data/pki/tls
docker-compose exec openvpn-pki ls /data/pki/tls/


docker-compose exec web-app bundle install -j8

docker-compose build
docker-compose run --rm web-app bundle install -j8
docker-compose run --rm web-app bundle exec rails db:setup


* production
docker-compose -f docker-compose.prod.yaml up --build -V -d
docker-compose -f docker-compose.prod.yaml down

docker-compose -f docker-compose.prod.yaml run web-app bundle install
docker-compose -f docker-compose.prod.yaml run web-app bundle exec rake db:prepare
docker-compose -f docker-compose.prod.yaml run web-app bundle exec rake assets:clear
docker-compose -f docker-compose.prod.yaml run web-app bundle exec rake assets:clobber
docker-compose -f docker-compose.prod.yaml run web-app bundle exec rake assets:precompile
docker-compose -f docker-compose.prod.yaml run web-app bundle exec rake webpacker:precompile

# docker-compose -f docker-compose.prod.yaml exec web-app bundle exec rails webpacker:install
docker-compose -f docker-compose.prod.yaml exec web-app bash

