"""Generadores de datos

Usamos Flask-Seeder para ejecutar los "seeds".
Usamos Faker para crear más generadores de los que incluye Flask-Seeder.

"""
from faker import Faker
from faker.providers import internet
from flask_seeder.generator import Generator

faker = Faker()
faker.add_provider(internet)


class Email(Generator):
    def generate(self):
        return faker.ascii_email()


class Username(Generator):
    def generate(self):
        return faker.user_name()


class FirstName(Generator):
    def generate(self):
        return faker.first_name()


class LastName(Generator):
    def generate(self):
        return faker.last_name()
