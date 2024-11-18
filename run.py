from flask import jsonify
from app import create_app
from app.utils import AuthError

app = create_app()


@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response


if __name__ == '__main__':
    app.run(debug=True)
