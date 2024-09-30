from flask_restx import Namespace, Resource

from ..models import Usuario
from ..api_models import modelo_usuario

api = Namespace('usuarios', description='Operaciones con usuarios')


@api.route('/<int:id_usuario>')
class Perfil(Resource):
    @api.marshal_with(modelo_usuario)
    def get(self, id_usuario):
        """Obtiene información del usuario"""
        usuario = Usuario.query.get(id_usuario)
        return usuario
