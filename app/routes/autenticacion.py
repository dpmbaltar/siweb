import os

from authlib.integrations.flask_client import OAuth
from urllib.parse import quote_plus, urlencode
from flask_restx import Namespace, Resource
from flask import redirect, session, url_for, make_response, jsonify, current_app as app


oauth = OAuth(app)
oauth.register(
    'auth0',
    client_id=os.getenv('AUTH0_CLIENT_ID'),
    client_secret=os.getenv('AUTH0_CLIENT_SECRET'),
    client_kwargs={
        'scope': 'openid profile email',
    },
    server_metadata_url=f'https://{os.getenv('AUTH0_DOMAIN')}/.well-known/openid-configuration'
)

api = Namespace('autenticacion', description='Operaciones para login/logout')


@api.route('/login')
class Login(Resource):
    @api.response(302, 'Inicio de sesión con éxito')
    @api.response(401, 'Acceso no autorizado')
    def get(self):
        """Inicia la sesión del usuario"""
        return oauth.auth0.authorize_redirect(
            redirect_uri=url_for('autenticacion_callback', _external=True)
        )


@api.route("/callback")
class Callback(Resource):
    def get(self):
        """URL para redireccionar después de iniciar sesión"""
        token = oauth.auth0.authorize_access_token()
        session['user'] = token
        return redirect(url_for('autenticacion_info'))

    def post(self):
        """URL para redireccionar después de iniciar sesión"""
        token = oauth.auth0.authorize_access_token()
        session['user'] = token
        return redirect(url_for('autenticacion_info'))


@api.route('/logout')
class Logout(Resource):
    @api.response(302, 'Cerrado sesión exitosamente')
    def get(self):
        """Cierra la sesión del usuario"""
        session.clear()
        return redirect(
            'https://' + os.getenv('AUTH0_DOMAIN')
            + '/v2/logout?'
            + urlencode(
                {
                    'returnTo': url_for('autenticacion_info', _external=True),
                    'client_id': os.getenv('AUTH0_CLIENT_ID'),
                },
                quote_via=quote_plus,
            )
        )


@api.route('/info')
class Info(Resource):
    def get(self):
        """Brinda información del usuario que ha iniciado una sesión"""
        if session:
            return make_response(jsonify({
                'user': session.get('user')
            }))
        else:
            return make_response(jsonify({
                'user': 'Invitado'
            }))
