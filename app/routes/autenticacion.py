import os

from authlib.integrations.flask_client import OAuth
from urllib.parse import quote_plus, urlencode
from flask_restx import Namespace, Resource
from flask import redirect, request, session, url_for, make_response, jsonify, current_app as app

from ..models import Usuario, db
from ..utils import login_required

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
        data = request.args
        redirect_uri = data.get('redirect_uri')
        if redirect_uri:
            session['redirect_uri'] = redirect_uri

        return oauth.auth0.authorize_redirect(
            redirect_uri=url_for('autenticacion_callback', _external=True)
        )


@api.route("/callback")
class Callback(Resource):
    def get(self):
        """Redirecciona al usuario cuando inicia sesión (lo registra si es la primera vez)"""
        token = oauth.auth0.authorize_access_token()
        session['user'] = token
        data = session['user']['userinfo']
        usuario = Usuario.query.filter_by(email=data['email']).first()

        if not usuario:
            usuario = Usuario(
                username=data['nickname'],
                email=data['email'],
                nombre=data['given_name'],
                apellido=data['family_name']
            )
            db.session.add(usuario)
            db.session.commit()

        session['user']['id'] = usuario.id
        if session['redirect_uri']:
            redirect_uri = session['redirect_uri']
            session.pop('redirect_uri')
        else:
            redirect_uri = url_for('autenticacion_info', _external=True)

        return redirect(redirect_uri)


@api.route('/logout')
class Logout(Resource):
    @api.response(302, 'Cerrado sesión exitosamente')
    @api.response(401, 'Acceso no autorizado')
    @login_required
    def get(self):
        """Cierra la sesión del usuario"""
        data = request.args
        redirect_uri = data.get('redirect_uri')
        if not redirect_uri:
            redirect_uri = url_for('autenticacion_info', _external=True)
        session.clear()

        return redirect(
            'https://' + os.getenv('AUTH0_DOMAIN')
            + '/v2/logout?'
            + urlencode(
                {
                    'returnTo': redirect_uri,
                    'client_id': os.getenv('AUTH0_CLIENT_ID'),
                },
                quote_via=quote_plus,
            )
        )


@api.route('/info')
class Info(Resource):
    @api.response(401, 'Acceso no autorizado')
    @login_required
    def get(self):
        """
        Brinda información del usuario que ha iniciado una sesión.
        """
        token = session.get('user')
        if token:
            return make_response(jsonify(token), 200)
        else:
            return make_response(jsonify({'error': 'No ha iniciado sesión'}), 401)
