// "grunt-contrib-jshint": "~0.10.0",
 // "grunt-contrib-qunit": "~0.2.0",
 // "grunt-contrib-stylus": "^0.20.0",
// "markdown": "^0.5.0"
var express = require('express');
// var pug     = require('pug');
var router  = express.Router();
var app     = express();

  app.use(router);
  app.use(express.static('public'));
// module.exports = function (app) {
// };


app.listen(process.env.PORT || 5000);

app.set('view engine', 'pug');


router.get('/', function (req, res) {
	
	res.send('hola');

} );