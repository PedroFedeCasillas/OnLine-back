<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar 
```
npm install
````

3. Tener Nest ClI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo __template.env__  y renombrar la copia a __.env__

6. Llenar las variables de entorno definidas en el .env

7. Ejecutar la aplicación en dev:
```
npm run start:dev
```

<!-- 8. Recontruir la base de datos con la semilla
```
http://localhost:3001/api/v1/seed
``` -->
## Stack Usado
*MongoDB
*NestJs

<!-- # Production Build
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno para produccion
3.Crear la nueva imagen 
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

#Notas
```
git commit --allow-empty -m "Vercel Deploy"
git push Vercel <master|main>
``` -->
