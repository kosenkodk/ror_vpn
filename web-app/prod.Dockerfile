FROM ruby:2.5.3

RUN curl https://deb.nodesource.com/setup_12.x | bash
RUN curl https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client yarn 

ENV RAILS_ROOT /web-app

RUN mkdir $RAILS_ROOT
WORKDIR $RAILS_ROOT
COPY Gemfile $RAILS_ROOT/Gemfile
COPY Gemfile.lock $RAILS_ROOT/Gemfile.lock
RUN bundle install

COPY . $RAILS_ROOT

ENV RAILS_ENV=production
ENV RACK_ENV=production 
ENV NODE_ENV=production

RUN export NODE_OPTIONS="--max-old-space-size=4096"
RUN yarn install --check-files --ignore-engines
RUN bundle exec rake db:prepare
# RUN bundle exec rake db:seed
RUN bundle exec rake assets:precompile

# # Add a script to be executed every time the container starts.
# COPY entrypoint.sh /usr/bin/
# RUN chmod +x /usr/bin/entrypoint.sh
# ENTRYPOINT ["entrypoint.sh"]
# EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
