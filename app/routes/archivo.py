import os

from datetime import datetime
from flask_restx import Namespace, Resource
from flask import request, jsonify, make_response, send_from_directory, current_app
from werkzeug.utils import secure_filename

import hashlib
from ..models import File, db
from ..utils import allowed_file
from ..api_models import modelo_archivo, modelo_archivo_subido

api = Namespace('archivos', description='Operaciones con archivos')


@api.route('/')
class Archivos(Resource):
    @api.expect(api.parser().add_argument('file', location='files', type='file', required=True))
    @api.response(201, 'Archivo subido exitosamente', model=modelo_archivo_subido)
    @api.response(400, 'Error al subir archivo')
    def post(self):
        """Sube un archivo de imagen al servidor (png, jpg, jpeg, gif)"""
        if 'file' not in request.files:
            return make_response(jsonify({'error': 'No se ha enviado un archivo'}), 400)

        file = request.files['file']

        if file.filename == '':
            return make_response(jsonify({'error': 'No se ha seleccionado un archivo'}), 400)

        if file and allowed_file(file.filename, current_app.config['ALLOWED_EXTENSIONS']):
            # Crear nombre para el archivo
            file_parts = os.path.splitext(file.filename)
            file_name = file_parts[0]
            file_ext = file_parts[1]
            file_content = file.read()
            file_hash = hashlib.sha256(file_content).hexdigest()
            file.seek(0)
            file_timestamp = str(int(datetime.now().timestamp()))
            nombre_archivo = secure_filename(f'{file_name}_{file_hash}_{file_timestamp}{file_ext}')

            # Guardar archivo
            path_archivo = os.path.join(current_app.config['UPLOAD_FOLDER'], nombre_archivo)
            file.save(path_archivo)

            # Guardar información del archivo en la base de datos
            new_file = File(nombre=nombre_archivo)
            db.session.add(new_file)
            db.session.commit()

            return make_response(jsonify({'id': new_file.id, 'archivo': new_file.nombre}), 201)
        else:
            return make_response(jsonify({'error': 'Tipo de archivo no permitido'}), 400)


@api.route('/<int:id_archivo>')
class Archivo(Resource):
    @api.response(200, 'Archivo obtenido exitosamente', model=modelo_archivo)
    @api.response(404, 'Archivo no encontrado')
    def get(self, id_archivo):
        """Obtiene un archivo por medio de su id"""
        archivo = File.query.get(id_archivo)
        if archivo:
            return send_from_directory(current_app.config['UPLOAD_FOLDER'], archivo.nombre)
        else:
            return make_response(jsonify({'error': 'Archivo no encontrado'}), 404)
