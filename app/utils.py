import os
import json
from jose import jwt
from six.moves.urllib.request import urlopen
from functools import wraps
from flask import make_response, jsonify, request, _request_ctx_stack, session


# JWKS URL provided by the authentication service
AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
API_AUDIENCE = os.getenv("AUTH0_CLIENT_ID")
ALGORITHMS = ["RS256"]


def allowed_file(filename, allowed_extensions):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in allowed_extensions


def logged_in():
    return "user" in session


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not logged_in():
            # return redirect(url_for('autenticacion_login', next=request.url))
            return make_response(jsonify({"error": "No ha iniciado sesión"}), 401)
        return f(*args, **kwargs)
    return decorated_function


class AuthError(Exception):
    """Error handler."""

    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code


# Load the JWKS (JSON Web Key Set) and find the public key
def get_public_key(token):
    jsonurl = urlopen("https://"+AUTH0_DOMAIN+"/.well-known/jwks.json")
    jwks = json.loads(jsonurl.read())
    unverified_header = jwt.get_unverified_header(token)
    rsa_key = {}
    for key in jwks["keys"]:
        if key["kid"] == unverified_header["kid"]:
            rsa_key = {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"]
            }
    return rsa_key


# Decode and validate the token
def validate_token(token):
    rsa_key = get_public_key(token)
    if rsa_key:
        try:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=ALGORITHMS,
                audience=API_AUDIENCE,
                issuer="https://"+AUTH0_DOMAIN+"/"
            )
        except jwt.ExpiredSignatureError:
            print("Token has expired")
            raise AuthError({"code": "token_expired",
                            "description": "token is expired"}, 401)
        except jwt.JWTClaimsError:
            print("Token has invalid claims")
            raise AuthError({"code": "invalid_claims",
                            "description":
                                "incorrect claims,"
                                "please check the audience and issuer"}, 401)
        except Exception as e:
            print("Token validation failed:", str(e))
            raise AuthError({"code": "invalid_header",
                            "description":
                                "Unable to parse authentication"
                                " token."}, 401)

        _request_ctx_stack.top.current_user = payload
        return payload
    else:
        print("Public key not found")
        return None


# Format error response and append status code
def get_token_auth_header():
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.headers.get("Authorization", None)
    if not auth:
        raise AuthError({"code": "authorization_header_missing",
                        "description":
                            "Authorization header is expected"}, 401)

    parts = auth.split()

    if parts[0].lower() != "bearer":
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must start with"
                            " Bearer"}, 401)
    elif len(parts) == 1:
        raise AuthError({"code": "invalid_header",
                        "description": "Token not found"}, 401)
    elif len(parts) > 2:
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must be"
                            " Bearer token"}, 401)

    token = parts[1]
    return token


def requires_auth(f):
    """Determina si el Token de acceso es válido.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        jsonurl = urlopen("https://"+AUTH0_DOMAIN+"/.well-known/jwks.json")
        jwks = json.loads(jsonurl.read())
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=ALGORITHMS,
                    audience=API_AUDIENCE,
                    issuer="https://"+AUTH0_DOMAIN+"/"
                )
            except jwt.ExpiredSignatureError:
                raise AuthError({"code": "token_expired",
                                "description": "token is expired"}, 401)
            except jwt.JWTClaimsError:
                raise AuthError({"code": "invalid_claims",
                                "description":
                                    "incorrect claims,"
                                    "please check the audience and issuer"}, 401)
            except Exception:
                raise AuthError({"code": "invalid_header",
                                "description":
                                    "Unable to parse authentication"
                                    " token."}, 401)

            _request_ctx_stack.top.current_user = payload
            return f(*args, **kwargs)
        raise AuthError({"code": "invalid_header",
                        "description": "Unable to find appropriate key"}, 401)
    return decorated
