var express = require('express'),
    pug     = require('pug'),
	app     = express(),
    router  = express.Router(),
	server  = require('http').createServer(app),
    port    = 5000,
    env 	= 'dev';





app.listen(process.env.PORT || port);
//View engine
app.use(router);
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'pug');


// Add POST, PUT, DELETE methods to the app
// app.use(express.bodyParser());
// app.use(express.cookieParser());
// app.use(express.methodOverride());



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