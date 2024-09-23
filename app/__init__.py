from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restx import Api
from .config import Config

db = SQLAlchemy()
migrate = Migrate()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    api = Api(app, title="SIWEB API", version="1.0",
              description="Documentación de mi API", doc="/docs")

    from .routes import api as api_blueprint
    api.add_namespace(api_blueprint)

    return app
