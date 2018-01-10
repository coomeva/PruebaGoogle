const express = require('express');
const bodyParser = require('body-parser');

const ServiceRest = express();

ServiceRest.use(bodyParser.urlencoded({ extended: true }));
ServiceRest.use(bodyParser.json());

ServiceRest.post('/HomeRest', function(req, res){
//asignacion de parametros a una variable para hacer la prueba de peticiones http
  var speech2 = req.body.result.parameters ? req.body.result.parameters : "servicios datas"
  //asignamos el valor del parametro number_id
  var speech3 = speech2.number_id;
  
  //si se activa el parametro realiza cierta accion 
  if(speech3){
    //hacemos el llamado a la funcion que contiene el servicio rest
        ConsultAssociate(speech3).then((resultado) => {
          //asignamos el resultado del que nos trae el servicio a una variable
              var  speech5 = ' ' + resultado;
                    //retornamos al dialogflow la nueva respuesta para el usuario
                    return res.json({
                        speech: speech5,
                        displayText: speech5,
                        source: 'rest-for-googlehome'
                });
        });
    }
});

//creamos la funcion 
function ConsultAssociate(speech3){
  //creamos la promesa
  return new Promise((resolve, reject) => {
        //importanmos la dependencia http
        var http = require('http');
        //definimos el Host de nuestra api
        var host = 'ec2-184-73-133-117.compute-1.amazonaws.com';
        //definimos el puerto de la api, (si lo hay)
        var port = '8080';
        //identificamos el path de la api y le agregamos el valor del parametro que extraemos desde dialogflow
        var path = '/consultacedula/services/rest/' + speech3;

        //hacemos la peticion http.get
        http.get({host: host, port: port, path: path}, (resp) =>{
            var body = '';
            resp.on('data', (d) => { 
                body += d.toString();
            });
            resp.on('end', () => {
                var respone = JSON.parse(body);
                //capturamos el nombre del cliente que trae el rest
                var name = respone.nameClient;   
                //concatenamos la respuesta del rest, para crear la nueva respuesta
                let output = 'welcome \n' + name + ' \n Coomeva closer to you ';
                //enviamos la respuesta de nuestra promesa
                resolve(output);
            });
            resp.on('error', (error) => {
                reject(error);
            });
        });
    });
}

ServiceRest.listen((process.env.PORT || 5040), function() {
console.log('server listen in port:' + this.address().port);
});
