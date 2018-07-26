# Ejemplo API Node.js, MongoDB y Plugin W2UI

## Descripción

Este código muestra el funcionamiento de una API REST que muestre los datos en el plugin w2ui.

## Requisitos

* Instalar API. Se incluye en el directorio `api`. [Ejemplo API REST con Node.js y Express](https://github.com/brendanajeraflores/apiNodeExpress)
* [Plugin w2ui](http://w2ui.com/web/home). Se incluye en directorio `plugin\js`
* Instalar MongoDB. [Ejemplo MongoDB](https://github.com/brendanajeraflores/mongodb)

En el ejemplo de MongoDB, se tienen documentos con los que se trabajo para hacer las consultas, Adicionalmente a esto agregaremos la colección searches a la colección etiquetas como si fuera un documento adicional.

## Directorio `api`

Contiene los archivos necesarios para instalar y ejecutar la API.

## Directorio `plugin`

Contiene los directorios y documentos para mostrar el plugin en su idioma original (ingles) y adicionalmente como cambiarlo al idioma español.

## Ejecución

**1. Ejecución de la API**

Para la ejecución de la API con `nodemon`, ejecuta el comando:
```objc
	nodemon app.js 
```
**2. Visualizar datos en el plugin**
Desde un navegador abrir el archivo `tutorial.html`. El archivo se encuentra en `plugin\espanol` o `plugin\original`, dependiendo del idioma en el que se quiera utilizar el plugin.