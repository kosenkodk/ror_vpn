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
export NODE_OPTIONS="--max-old-space-size=4096"
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
kill -9 $(lsof -i tcp:3000 -t)

connection string
mongodb://mongo:27017

RACK_ENV=production RAILS_ENV=production NODE_ENV=production rake assets:precompile