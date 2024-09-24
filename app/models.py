from . import db

# Tabla JOIN de mascotas-usuarios
mascotas_usuario = db.Table(
    'mascotas_usuario',
    db.Column('id_usuario', db.ForeignKey('usuarios.id'), primary_key=True),
    db.Column('id_mascota', db.ForeignKey('mascotas.id'), primary_key=True),
)


class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    nombre = db.Column(db.String(80), nullable=False)
    apellido = db.Column(db.String(80), nullable=False)

    mascotas = db.relationship('Mascota',
                               secondary='mascotas_usuario',
                               back_populates='usuarios')
    posts = db.relationship('Post', back_populates='usuario', lazy='dynamic')

    def __repr__(self):
        return f'<Usuario {self.username}>'


class Mascota(db.Model):
    __tablename__ = 'mascotas'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    fecha_nacimiento = db.Column(db.Date, nullable=False)
    fecha_nacimiento_est = db.Column(db.Boolean, nullable=False)

    usuarios = db.relationship('Usuario',
                               secondary='mascotas_usuario',
                               back_populates='mascotas')

    def __repr__(self):
        return f'<Mascota {self.nombre}>'


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(200), nullable=False)
    contenido = db.Column(db.Text, nullable=False)
    fecha_creado = db.Column(db.Date, nullable=False)
    fecha_modificado = db.Column(db.Date, nullable=False)

    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'),
                           unique=False, nullable=False)
    usuario = db.relationship('Usuario', back_populates='posts')

    def __repr__(self):
        return f'<Post {self.titulo}>'
