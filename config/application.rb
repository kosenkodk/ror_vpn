require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module VegaVPN
  class Application < Rails::Application
    config.eager_load_paths += %W(#{config.root}/lib)

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0
    config.exceptions_app = self.routes
    config.hosts << 'vega.isit.su'
    config.hosts << 'localhost'
    config.hosts << '127.0.0.1'
    WillPaginate.per_page = 4
    # config.routes.default_url_options = {host:'vega.isit.su'}
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
