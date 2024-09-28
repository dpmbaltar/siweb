from flask_restx import Namespace, Resource
from flask import jsonify, make_response

from ..models import Post, db
from ..api_models import modelo_publicacion, modelo_input_publicacion

api = Namespace('publicaciones', description='Operaciones con publicaciones')

@api.route('')
class Publicaciones(Resource):
    @api.marshal_list_with(modelo_publicacion)
    def get(self):
        """Lista todas las publicaciones"""
        return Post.query.all()

    @api.expect(modelo_input_publicacion)
    @api.marshal_with(modelo_publicacion)
    @api.response(201, 'Publicación creada exitosamente')
    def post(self):
        """Crea un nuevo post asociado a un usuario"""
        new_post = Post(titulo = api.payload['titulo'],
                        contenido = api.payload['contenido'],
                        fecha_creado = "2024-09-28",
                        id_usuario = 1
                        )
        db.session.add(new_post)
        db.session.commit()
        
        return make_response(
            jsonify({
                'id': new_post.id,
                'titulo': new_post.titulo,
                'contenido': new_post.contenido,
                'fecha_creado': new_post.fecha_creado,
                'fecha_modificado': new_post.fecha_modificado,
                'usuario': new_post.id_usuario,
            }), 201
        )

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
    def put(self, publicacionId):
        """Actualiza la información de una publicación por medio de su id"""
        post = Post.query.get(publicacionId)
        post.titulo = api.payload['titulo']
        post.contenido = api.payload['contenido']
        post.id_usuario = api.payload['usuario']
        
        db.session.commit()
        return post, 200

    @api.response(200, 'Publicación eliminada exitosamente')
    def delete(self, publicacionId):
        """Elimina una publicación por medio de su id"""
        post = Post.query.get(publicacionId)
        db.session.delete(post)
        db.session.commit()

        return {}, 200