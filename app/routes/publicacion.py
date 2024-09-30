from flask_restx import Namespace, Resource, marshal
from flask import request, jsonify, make_response
from datetime import date

from ..models import Post, db
from ..api_models import modelo_publicacion, modelo_input_publicacion
from ..utils import login_required

api = Namespace('publicaciones', description='Operaciones con publicaciones')


@api.route('/')
class Publicaciones(Resource):
    @api.marshal_list_with(modelo_publicacion)
    def get(self):
        """Lista todas las publicaciones"""
        return Post.query.limit(10).all()

    @api.expect(modelo_input_publicacion)
    # @api.marshal_with(modelo_publicacion)
    @api.response(201, 'Publicación creada exitosamente')
    @login_required
    def post(self):
        """Crea un nuevo post asociado a un usuario"""
        new_post = Post(titulo=api.payload['titulo'],
                        contenido=api.payload['contenido'],
                        fecha_creado=date.today(),
                        fecha_modificado=date.today(),
                        id_usuario=api.payload['usuario']
                        )
        db.session.add(new_post)
        db.session.commit()
        # return new_post
        return marshal(new_post, modelo_publicacion), 201


@api.route('/<int:publicacionId>')
class Publicacion(Resource):
    @api.marshal_with(modelo_publicacion)
    def get(self, publicacionId):
        """Obtiene una publicación por medio de su id"""
        post = Post.query.get(publicacionId)
        return post

    @api.expect(modelo_input_publicacion)
    @api.marshal_with(modelo_publicacion)
    @api.response(200, 'Publicación actualizada exitosamente')
    @login_required
    def put(self, publicacionId):
        """Actualiza la información de una publicación por medio de su id"""
        post = Post.query.get(publicacionId)
        post.titulo = api.payload['titulo']
        post.contenido = api.payload['contenido']
        post.fecha_modificado = date.today()
        db.session.commit()
        return post

    @api.response(200, 'Publicación eliminada exitosamente')
    @login_required
    def delete(self, publicacionId):
        """Elimina una publicación por medio de su id"""
        post = Post.query.get(publicacionId)
        db.session.delete(post)
        db.session.commit()

        return {}, 200
