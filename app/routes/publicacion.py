from flask_restx import Namespace, Resource, marshal
from sqlalchemy import desc
from datetime import date

from ..models import Post, Usuario, Mascota, File, db
from ..api_models import modelo_publicacion, modelo_input_publicacion, modelo_post_publicacion
from ..utils import login_required

api = Namespace('publicaciones', description='Operaciones con publicaciones')


@api.route('/')
class Publicaciones(Resource):
    @api.marshal_list_with(modelo_publicacion)
    def get(self):
        """Lista todas las publicaciones"""
        return Post.query.join(
            Usuario, Usuario.id == Post.id_usuario
        ).order_by(
            desc(Post.id)
        ).limit(10).all()

    @api.expect(modelo_post_publicacion)
    @api.response(201, 'Publicación creada exitosamente')
    @api.response(401, 'Acceso no autorizado')
    @login_required
    def post(self):
        """Crea un nuevo post asociado a un usuario"""
        nueva_publicacion = Post(titulo=api.payload['titulo'],
                                 contenido=api.payload['contenido'],
                                 tel_contacto=api.payload['tel_contacto'],
                                 area_lat=api.payload['area_lat'],
                                 area_lng=api.payload['area_lng'],
                                 fecha_creado=date.today(),
                                 fecha_modificado=date.today(),
                                 id_usuario=api.payload['id_usuario']
                                 )
        nueva_mascota = Mascota(nombre=api.payload['mascota_nombre'],
                                fecha_nacimiento=api.payload['mascota_fecha_nacimiento'],
                                fecha_nacimiento_est=True,
                                tipo='indefinido'
                                )
        archivo = File.query.get(api.payload['id_archivo'])

        nueva_publicacion.mascotas.append(nueva_mascota)
        nueva_publicacion.archivos.append(archivo)

        db.session.add(nueva_publicacion)
        db.session.add(nueva_mascota)
        db.session.commit()

        return marshal(nueva_publicacion, modelo_publicacion), 201, {
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': 'http://localhost:5173'
        }

    def options(self):
        return 'preflight ok', 200, {
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': 'http://localhost:5173',
            'Access-Control-Allow-Methods': 'GET,POST',
            'Access-Control-Allow-Headers': 'content-type'
        }


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

        return {'mensaje': 'Publicación eliminada exitosamente'}, 200


@api.route('/usuario/<int:id_usuario>')
class PublicacionesUsuario(Resource):
    @api.marshal_list_with(modelo_publicacion)
    def get(self, id_usuario):
        """
        Lista todas las publicaciones de un usuario.
        """
        return Post.query.join(
            Usuario, Usuario.id == Post.id_usuario
        ).filter(
            Usuario.id == id_usuario
        ).order_by(desc(Post.fecha_creado)).all()
