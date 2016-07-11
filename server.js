var express = require('express'),
    pug     = require('pug'),
	app     = express(),
    router  = express.Router(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
	server  = require('http').createServer(app),
    port    = 5000,
    env 	= 'dev';



//Configuración de consumo de JSON
var domain = 'http://igroupsoluciones.com/repo',
	search = '/searchst',
	idImg  =  '/details',
	dataCuenta = '/details-user',
	downloadImg = '/download-img';

var data = domain+search;


app.listen(process.env.PORT || port);
//View engine
app.use(router);
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'pug');


// Add POST, PUT, DELETE methods to the app
// app.use(express.cookieParser());
// app.use(express.methodOverride());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/json')
//   res.write('mi JSON:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// });



//Rutas para visualizar

router.get('/', function (req, res) {
	
	res.render('index', {
		env : env,
		data: data
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


app.get('/all', function (req, res) {
	
	res.send(data);

});

router.get('/resultados', function (req, res) {

	// console.log(data);
	
	res.render('resultados', {
		env : env
	});


} );


console.log('Server started, please go to http://localhost:'+port);
console.log('JSON url: '+data );
