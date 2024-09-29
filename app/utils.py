from functools import wraps
from flask import make_response, jsonify, redirect, url_for, session


def allowed_file(filename, allowed_extensions):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions


def logged_in():
    return 'user' in session


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not logged_in():
            # return redirect(url_for('autenticacion_login', next=request.url))
            return make_response(jsonify({'error': 'No ha iniciado sesión'}), 401)
        return f(*args, **kwargs)
    return decorated_function
