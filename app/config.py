import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'mysql://user:pass@localhost/dbname')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # Tamaño máximo de archivo (16MB)
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
