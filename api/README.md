# Ejemplo API con Node.js y conexión a base de datos MongoDB

## Descripción

Este código muestra el funcionamiento de una API REST conectada para hacer peticiones a una base de datos en MongoDB.

## Requisitos

* Instalar [Node.js](https://nodejs.org/es/)
* Instalar [MongoDB](https://www.mongodb.com/)
* Instalar [Postman](https://www.getpostman.com/)

[Ejemplo API REST con Node.js y Express](https://github.com/brendanajeraflores/apiNodeExpress)

[Ejemplo MongoDB](https://github.com/brendanajeraflores/mongodb)

**Dependencias**

* Nodemon (Al momento de instalar la API se instala automáticamente)
* Express (Al momento de instalar la API se instala automáticamente)
* Mongodb (Al momento de instalar la API se instala automáticamente)

## Archivo `app.js`

Este archivo muestra el código para crear una API REST, la conexión y la consulta a la base de datos de `MongoDB`.

## Archivo `package.json`

Este archivo contiene detalle específico de las versiones de las dependencias que estan instaladas en el proyecto.

## Directorio `node_modules`

Directorio que se crea al momento de instalar la API. Contiene los paquetes y dependencias utilizadas en el proyecto.

## Instalación

* Para la instalación de la API, ejecuta el comando: 
```objc
	npm install 
```

## Ejecución

* Iniciar MongoDB
[Ejemplo para crear base de datos en `MongoDB`](https://github.com/brendanajeraflores/mongodb)

Para la ejecución de la API existen dos maneras, con el comando `node` y el comando `nodemon`. Si se realizan cambios en el script que se este desarrollando, con el comando `node` se tendrá que parar la API y volver a ejecutarla, con el comando `nodemon` se reiniciará automáticamente.

**Ejecución con node**

* Para la ejecución de la API con `node`, ejecuta el comando:
```objc
	node app.js 
```

**Ejecución con nodemon**

* Para la ejecución de la API con `nodemon`, ejecuta el comando:
```objc
	nodemon app.js 
```

Para ver en funcionamiento la API. Desde un navegador ingresar a http://localhost:3000/ y dependiendo del parametro se mostrarán los datos que hayan sido consultados

**Consulta etiquetas**
```objc
	http://localhost:3000/etiquetas
```

**Consulta records**
```objc
	http://localhost:3000/records
```

**Consulta searches**
```objc
	http://localhost:3000/searches
```