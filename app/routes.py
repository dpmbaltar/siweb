from flask_restx import Namespace, Resource, fields
from flask import request
from .models import User, db

api = Namespace('users', description='Operaciones relacionadas con usuarios')

user_model = api.model('User', {
    'id': fields.Integer(readOnly=True, description='ID del usuario'),
    'username': fields.String(required=True, description='Nombre de usuario'),
    'email': fields.String(required=True, description='Correo electrónico')
})


@api.route('/')
class UserList(Resource):
    @api.marshal_list_with(user_model)
    def get(self):
        """Lista todos los usuarios"""
        return User.query.all()

    @api.expect(user_model)
    @api.response(201, 'Usuario creado exitosamente')
    def post(self):
        """Crea un nuevo usuario"""
        data = request.json
        new_user = User(username=data['username'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()
        return new_user, 201
