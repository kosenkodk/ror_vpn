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

* Testing
# NODE_ENV is development by default
RAILS_ENV=test ./bin/webpack

RAILS_ENV=test bundle exec rails webpacker:compile
RAILS_ENV=test bundle exec rails assets:precompile
bundle exec rspec
* ...
