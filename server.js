var express = require('express'),
    pug     = require('pug'),
    router  = express.Router(),
    app     = express(),
    port    = 5000;

  app.use(router);
  app.use(express.static('public'));
// module.exports = function (app) {
// };

app.listen(process.env.PORT || port);

app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'pug');


//Rutas para visualizar

router.get('/', function (req, res) {
	
	res.render('index');

} );


router.get('/categorias', function (req, res) {

	res.render('categorias');

} );



router.get('/image', function (req, res) {
	
	res.render('single-image');

} );



router.get('/resultados', function (req, res) {
	
	res.render('resultados');

} );


console.log('Server started, please go to http://localhost:'+port);