import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_seeder import FlaskSeeder
from flask_migrate import Migrate
from flask_restx import Api
from flask_cors import CORS

from .config import Config

db = SQLAlchemy()
migrate = Migrate()
seeder = FlaskSeeder()
api = Api(
    title="SIWEB API",
    version="1.0",
    description="Documentación de mi API",
    doc="/docs"
)


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.secret_key = os.getenv('APP_SECRET_KEY')

    # Crear carpeta para archivos si no existe
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    db.init_app(app)
    migrate.init_app(app, db)
    seeder.init_app(app, db)
    api.init_app(app)

    from .routes.usuario import api as usuario_namespace
    from .routes.publicacion import api as publicacion_namespace
    from .routes.archivo import api as archivo_namespace
    from .routes.autenticacion import api as autenticacion_namespace
    api.add_namespace(usuario_namespace)
    api.add_namespace(publicacion_namespace)
    api.add_namespace(archivo_namespace)
    api.add_namespace(autenticacion_namespace)

    # Inicializar CORS
    CORS(
        app,
        supports_credentials=True,
        origins=['http://localhost:5173']
    )

    return app
