from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_seeder import FlaskSeeder
from flask_migrate import Migrate
from flask_restx import Api

from .config import Config

db = SQLAlchemy()
migrate = Migrate()
api = Api(title="SIWEB API", 
          version="1.0",
          description="Documentación de mi API",
          doc="/docs"
          )
seeder = FlaskSeeder()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    seeder.init_app(app, db)

    api.init_app(app)

    from .routes.usuario import api as usuario_namespace
    from .routes.publicacion import api as publicacion_namespace
    api.add_namespace(usuario_namespace)
    api.add_namespace(publicacion_namespace)

    return app
