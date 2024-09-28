from flask_restx import fields

from app import api

modelo_usuario = api.model('Usuario', {
    'id': fields.Integer(readOnly=True, description='ID del usuario'),
    'username': fields.String(required=True, description='Nombre de usuario'),
    'email': fields.String(required=True, description='Correo electrónico'),
    'nombre': fields.String(required=True, description='Nombre(s)'),
    'apellido': fields.String(required=True, description='Apellido(s)')
})

modelo_publicacion = api.model('Publicacion', {
    'id': fields.Integer(readOnly=True, description='ID de la publicación'),
    'titulo': fields.String(required=True, description='Titulo de la publicación'),
    'contenido': fields.String(required=True, description='Cuerpo de la publicación'),
    'fecha_creado': fields.Date(required=True, description='Fecha de creación de la publicación'),
    'fecha_modificado': fields.Date(required=True, description='Fecha de la última modificación sobre la publicación'),
    'usuario': fields.Nested(modelo_usuario, description='Creador de la publicación')
})

modelo_input_publicacion = api.model('PublicacionInput', {
    'titulo': fields.String(required=True, description='Titulo de la publicación'),
    'contenido': fields.String(required=True, description='Cuerpo de la publicación'),
    'usuario': fields.Integer(min=1)
})