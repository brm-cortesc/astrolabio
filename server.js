var express = require('express'),
    pug     = require('pug'),
    router  = express.Router(),
    app     = express(),
    port    = 5000,
    env 	= 'dev';

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
	
	res.render('index', {
		env : env
	});

} );


router.get('/categorias', function (req, res) {

	res.render('categorias', {
		env : env
	});

} );



router.get('/image', function (req, res) {
	
	res.render('single-image', {
		env : env
	});

} );



router.get('/resultados', function (req, res) {
	
	res.render('resultados', {
		env : env
	});
} );


console.log('Server started, please go to http://localhost:'+port);