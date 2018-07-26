/*
	Archivo para ejecutar api rest con conexión a MongoDB
	Autor Brenda Najera Flores
*/

//Variables para hacer conexión con MongoDB
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

//Variables para exportar el módulo de express
var express = require('express');
var app = express();

//Agregar cabeceras para que la api pueda ser consultada desde una aplicación web
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//Definición de rutas para consultar la api
var formatRouter = express.Router()
app.use('/', formatRouter);

//Definición de la ruta donde se consultara la colección etiquetas
formatRouter.route('/etiquetas').get(function(req, res, next){
    //Función para conectar con MongoDB
    MongoClient.connect(url, function(err, db) {
        if (!err){
            //Llamada a la función para consultar la colección etiquetas a MongoDB
            consultaEtiquetas(db, function(){})  
        } else {
            //Manda mensaje de error en caso no haberse conectado con la base de MongoDB
            console.log('No conectado a base MongoDB');         
        }
    });

    //Definición de la función para consultar la colección etiquetas
    var consultaEtiquetas = function(db){
        //Obtener base de datos tutorial
        var tutorial = db.db("tutorial");
        //Obtener colección etiquetas
        var coleccionEtiquetas = tutorial.collection("etiquetas");
        //Definición del arreglo de las columnas
        var columns =[];
        //Consulta a coleccion etiquetas
        coleccionEtiquetas.find().toArray(function(error, etiquetas) {
            for (var key1 in etiquetas){
                //Condición para quitar del arreglo columnas, el arreglo de searches
                if(key1 != 7){
                    columns.push(etiquetas[key1]);
                }
                for (var key2 in etiquetas[key1]){
                    //Condición para agregar el arreglo de searches en otro arreglo independiente        
                    if(key2 == 'searches'){
                        searches = (etiquetas[key1][key2]);
                    }
                }
            }
            res.send({etiquetas : columns, searches: searches});
        });
      }//Fin consultaEtiquetas
});//Fin route etiquetas

//Definición de la ruta donde se consultara la colección records
formatRouter.route('/records').get(function(req, res, next){
    //Definición de variables para obtener el parametro de search y poder realizar consultas
    let query = req['query']['request'];
    let json = JSON.parse(query);
    let search = json['search'];
    let consulta = {};

    //Función para conectar con MongoDB
    MongoClient.connect(url, function(err, db) {
        if (!err){
            //Llamada a la función para consultar la colección records a MongoDB
            consultaRecords(db, function(){})  
        } else {
            //Manda mensaje de error en caso no haberse conectado con la base de MongoDB
            console.log('No conectado a base MongoDB');         
        }
    });

    //Definición de la función para consultar la colección records
    var consultaRecords = function(db){

        //Definición de variables para obtener la base de datos de MongoDB y la colección records que se consultará
        var tutorial = db.db("tutorial");
        var coleccionRecords = tutorial.collection("records");
        var records =[];

        if (search != null){
            console.log('search', search)
            
            //Definición de las variables que se utilizarán como parametro para realizar la búsqueda
            for(var key1 in search){
                var field = search[key1]['field'];
                var type = search[key1]['type'];
                var operator = search[key1]['operator'];
                var value = search[key1]['value'];             
            }
            console.log('v', value);
            console.log('v', field);
            console.log('v', type);
            console.log('v', operator);
            
            //Definición de la consulta
            consulta[field] = consultas(operator,type,value);
            console.log('consulta', consulta);
        }

        //Realiza la consulta a MongoDB
        coleccionRecords.find(consulta).toArray(function(error, records) {
            //Manda los datos obtenidos
            res.send({records : records});
        });
    }//Fin consultaRecords
});//Fin route records

//Indicar el puerto en el que funcionará la api
app.listen(3000, function(){
	//Se muestra en pantalla el mensaje del puerto en el que esta funcionando la pi
    console.log('Conectado a puerto 3000');
});

//FUNCIONES EXTRAS

//Función para realizar búsquedas en el plugin
function consultas(operador, tipo, value){
    let query = {};
    switch(operador){
        //En caso de que el operador sea "is"
        case "is":
            switch(tipo){
                //En caso de que el tipo sea "text"
                case "text":
                    //Se aplica la función para realizar búsquedas con acentos
                    var value = queryAcentos(value);
                    query=value;
                    break;
                //En caso de que el tipo sea "date"
                case "date":
                    query=value;
                    break;
                /*case "float":
                        cantidad = parseFloat(value)
                        query=cantidad

                        //query[fieldSearch]=cantidad
                        break;*/
            }//fin switch tipo
        break;
        //En caso de que el operador sea "contains"
        case "contains":
            //Se aplica la función para realizar búsquedas con acentos
            var value = queryAcentos(value);
            //Definición de la consulta para Mongo con mayúsculas y minúsculas
            var regOpt = {$regex: value, $options:"i"};
            query=regOpt;
            //query[fieldSearch]=regOpt;
            break;
        //En caso de que el operador sea "begins"
        case "begins":
            //Se aplica la función para realizar búsquedas con acentos        
            var value = queryAcentos(value);
            //Se aplica la expresión regular para que la búsqueda comience con el valor ingresado
            var exp = '^'+value;
            //Definición de la consulta para Mongo con mayúsculas y minúsculas            
            var regOpt = {$regex: exp, $options:"i"}
            query=regOpt;

            break;
        //En caso de que el operador sea "ends"
        case "ends":
            //Se aplica la función para realizar búsquedas con acentos              
            var value = queryAcentos(value);
            //Se aplica la expresión regular para que la búsqueda termine con el valor ingresado¿           
            var exp = value+'$';
            //Definición de la consulta para Mongo con mayúsculas y minúsculas            
            var regOpt = {$regex: exp, $options:"i"}
            query=regOpt;
            break;
        //En caso de que el operador sea "between"        
        case "between":
            //En caso de que el tipo sea "date"
            if(tipo == "date"){
                start = value[0];
                end = value[1];
                //Definición de la consulta indicando en que fecha empieza y en que fecha termina
                fechaOpt = {$gte: start, $lte: end}
                query=fechaOpt;
            } /*else if(tipo == "float"){
                start = parseFloat(value[0]);
                end = parseFloat(value[1]);
                floatOpt = {$gte: start, $lte: end}
                query=floatOpt;

                //query[fieldSearch]=floatOpt;
            }//Fin condición tipo en case between*/
    }//fin switch operador
    return query;
}//Fin function consulta

//Función para poder búscar con acentos en una búsqueda avanzada
function queryAcentos(valor){
    valor = valor.replace(/[aá]/gi, '\[AÁaá\]');
    valor = valor.replace(/[eé]/gi, '\[EÉeé\]');
    valor = valor.replace(/[ií]/gi, '\[IÍií\]');
    valor = valor.replace(/[oó]/gi, '\[OÓoó\]');
    valor = valor.replace(/[uú]/gi, '\[UÚuú\]'); 
    return valor;
}//Fin función queryAcentos     