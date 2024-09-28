from flask_restx import Namespace, Resource
from flask import request, jsonify, make_response

from ..models import Usuario, db
from ..api_models import modelo_usuario

api = Namespace('usuarios', description='Operaciones con usuarios')

@api.route('/')
class Usuarios(Resource):
    @api.marshal_list_with(modelo_usuario)
    def get(self):
        """Lista todos los usuarios"""
        return Usuario.query.all()

    @api.expect(modelo_usuario)
    @api.response(201, 'Usuario creado exitosamente')
    def post(self):
        """Crea un nuevo usuario"""
        data = request.json
        new_user = Usuario(username=data['username'],
                           email=data['email'],
                           nombre=data['nombre'],
                           apellido=data['apellido'])
        db.session.add(new_user)
        db.session.commit()

        return make_response(jsonify({
            'id': new_user.id,
            'username': new_user.username,
            'email': new_user.email,
            'nombre': new_user.nombre,
            'apellido': new_user.apellido
        }), 201)