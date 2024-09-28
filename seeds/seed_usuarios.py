from flask_seeder import Seeder, Faker
from app.models import Usuario
from seeds import generators


# Crear usuarios random para la BD
class UsuariosSeeder(Seeder):
    def run(self):
        faker = Faker(
            cls=Usuario,
            init={
                'username': generators.Username(),
                'email': generators.Email(),
                'nombre': generators.FirstName(),
                'apellido': generators.LastName()
            }
        )

        # Crear 5 usuarios
        for usuario in faker.create(5):
            print("Agregando Usuario: %s" % usuario)
            self.db.session.add(usuario)
