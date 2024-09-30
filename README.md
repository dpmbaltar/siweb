# siweb

Para lanzar la aplicación:
```bash
flask run
```

# Base de datos

Para inicializar la base de datos:
```bash
flask db init
```

Para ejecutar las migraciones:
```bash
flask db migrate
```

Para actualizar la base de datos:
```bash
flask db upgrade
```

Para poblar la base de datos ejecutar:
```bash
python -m flask seed run
```

Para listar los "seeders":
```bash
python -m flask seed list
```
