<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio

2. Ejecutar

```
yarn install
```

3. Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```

4. Levantar base de datos (MongoDB)

```
docker-compose up -d
```

5. Reconstruir la base de datos con la semilla (_POST_)

```
https://localhost:3000/api/v2/seed
```

6. Clonar el archio **.env.example** y renombrar a **.env**

7. Llenar las variables de entorno definidas en el **.env**]
8. Ejecutar la aplicación en modo de desarrollo

```
yarn start:dev
```

## Stack usado

- MongoDB
- Nest
- Mongoose

# Production build

1. Crear el archivo `.env.prod`
2. Llenar las variables de entorno de producción
3. Crear la nueva imágen

```shell
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build -d
```

## Notas

Heroku redeploy sin cambios

```shell
git commit --allow-empty -m "Trigger Heroku deploy"
git push heroku <master/main>
```
