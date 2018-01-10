const express = require('express');
const bodyParser = require('body-parser');

const ServiceRest = express();

ServiceRest.use(bodyParser.urlencoded({ extended: true }));
ServiceRest.use(bodyParser.json());


ServiceRest.listen((process.env.PORT || 5040), function() {
console.log('server listen in port:' + this.address().port);
});
