from flask_restx import Namespace, Resource, fields
from flask import request, jsonify, make_response
from .models import Usuario, db

api = Namespace('usuarios', description='Operaciones con usuarios')

modelo_usuario = api.model('Usuario', {
    'id': fields.Integer(readOnly=True, description='ID del usuario'),
    'username': fields.String(required=True, description='Nombre de usuario'),
    'email': fields.String(required=True, description='Correo electrónico'),
    'nombre': fields.String(required=True, description='Nombre(s)'),
    'apellido': fields.String(required=True, description='Apellido(s)')
})


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
