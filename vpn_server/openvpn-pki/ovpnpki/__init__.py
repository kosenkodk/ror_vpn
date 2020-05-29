import os

from flask import Flask
from werkzeug.contrib.fixers import ProxyFix
from flask_login import LoginManager

application = app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)
login_manager = LoginManager()
login_manager.init_app(app)

app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "develop-secret")
app.config["EASYRSA_PKI"] = os.environ["EASYRSA_PKI"]

from .views import *