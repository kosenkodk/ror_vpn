FROM ruby:2.5.3

RUN curl https://deb.nodesource.com/setup_12.x | bash
RUN curl https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client yarn 
#redis-server
RUN mkdir /web-app
WORKDIR /web-app
COPY Gemfile /web-app/Gemfile
COPY Gemfile.lock /web-app/Gemfile.lock
RUN bundle install

COPY . /web-app

# RUN redis-server --daemonize yes --bind 0.0.0.0 --protected-mode no

RUN yarn install --check-files
RUN bundle exec rake db:migrate
RUN bundle exec rake db:seed
# RUN bundle exec rake assets:precompile

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
