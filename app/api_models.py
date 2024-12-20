from flask_restx import fields

from app import api

modelo_archivo = api.model('Archivo', {
    'id': fields.Integer(description='ID del archivo', required=True),
    'nombre': fields.String(description='Nombre del archivo')
})

modelo_mascota = api.model('Mascota', {
    'id': fields.Integer(readOnly=True, description='ID de la mascota'),
    'nombre': fields.String(required=True, description='Nombre de la mascota'),
    'tipo': fields.String(required=True, description='Tipo de mascota'),
    'fecha_nacimiento': fields.String(required=True, description='Fecha de nacimiento de la mascota'),
    'fecha_nacimiento_est': fields.Boolean(required=True, description='Nacimiento estimado (si/no)')
})

modelo_usuario = api.model('Usuario', {
    'id': fields.Integer(readOnly=True, description='ID del usuario'),
    'username': fields.String(required=True, description='Nombre de usuario'),
    'email': fields.String(required=True, description='Correo electrónico'),
    'nombre': fields.String(required=True, description='Nombre(s)'),
    'apellido': fields.String(required=True, description='Apellido(s)'),
    'mascotas': fields.Nested(modelo_mascota, description='Mascotas del usuario')
})

modelo_usuario_publicacion = api.model('Usuario', {
    'id': fields.Integer(readOnly=True, description='ID del usuario'),
    'nombre': fields.String(required=True, description='Nombre(s)'),
    'apellido': fields.String(required=True, description='Apellido(s)')
})

modelo_publicacion = api.model('Publicacion', {
    'id': fields.Integer(readOnly=True, description='ID de la publicación'),
    'titulo': fields.String(required=True, description='Titulo de la publicación'),
    'contenido': fields.String(required=True, description='Cuerpo de la publicación'),
    'fecha_creado': fields.Date(required=True, description='Fecha de creación de la publicación'),
    'fecha_modificado': fields.Date(required=True, description='Fecha de la última modificación sobre la publicación'),
    'tel_contacto': fields.String(required=True, description='Tel. de contacto'),
    'area_lat': fields.Float(required=True, description='Area aproximada (latitud)'),
    'area_lng': fields.Float(required=True, description='Area aproximada (longitud)'),
    'usuario': fields.Nested(modelo_usuario_publicacion, description='Creador de la publicación'),
    'mascotas': fields.Nested(modelo_mascota, description='Mascotas de la publicación'),
    'archivos': fields.Nested(modelo_archivo, description='Archivos de la publicación'),
})

modelo_post_publicacion = api.model('PostPublicacion', {
    'titulo': fields.String(required=True, description='Titulo de la publicación'),
    'contenido': fields.String(required=True, description='Cuerpo de la publicación'),
    'tel_contacto': fields.String(required=True, description='Tel. de contacto'),
    'area_lat': fields.Float(required=True, description='Area aproximada (latitud)'),
    'area_lng': fields.Float(required=True, description='Area aproximada (longitud)'),
    'id_usuario': fields.Integer(min=0),
    'id_archivo': fields.Integer(min=0),
    'id_mascota': fields.Integer(min=0),
    'mascota_nombre': fields.String(required=True, description='Nombre de la mascota'),
    'mascota_fecha_nacimiento': fields.Date(required=True, description='Fecha de nacimiento de la mascota'),
})

modelo_input_publicacion = api.model('PublicacionInput', {
    'titulo': fields.String(required=True, description='Titulo de la publicación'),
    'contenido': fields.String(required=True, description='Cuerpo de la publicación'),
    'usuario': fields.Integer(min=1)
})

modelo_archivo_subido = api.model('ArchivoSubido', {
    'id': fields.Integer(description='ID del archivo subido'),
    'archivo': fields.String(description='Mensaje de confirmación')
})
