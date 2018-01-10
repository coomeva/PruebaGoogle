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

ServiceRest.listen((process.env.PORT || 5040), function() {
console.log('server listen in port:' + this.address().port);
});
