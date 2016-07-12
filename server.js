var express = require('express'),
    pug     = require('pug'),
    fs 		= require('fs'),
    request = require('request'),
	app     = express(),
    router  = express.Router(),
    bodyParser = require('body-parser'),
    // cookieParser = require('cookie-parser'),
    // methodOverride = require('method-override'),
	server  = require('http').createServer(app),
    port    = 5000,
    env 	= 'dev';



//Configuración de consumo de JSON
var domain = 'http://igroupsoluciones.com/repo',
	search = '/searchst',
	idImg  =  '/details',
	dataCuenta = '/details-user',
	downloadImg = '/download-img';

// var data = domain+search+'/dog';
// var base = fs.createReadStream('http://jsonplaceholder.typicode.com/posts');
var base =  fs.readFileSync('./pokemons.json').toString();

var options = {
  url: 'http://jsonplaceholder.typicode.com/posts',
  headers: {
    'User-Agent': 'request'
  }
};

var callback = function(error, response, body) {
  console.log('hola');
  if (!error && response.statusCode == 200) {
    var info = body.toString();
    console.log(info);
    // console.log(info.forks_count + " Forks");
  }
};




app.listen(process.env.PORT || port);
//View engine
app.use(router);
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'pug');


// Add POST, PUT, DELETE methods to the app
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ type: 'application/*+json' }));

//Rutas para visualizar

router.get('/', function (req, res) {
	res.render('index', {
		env : env
		// base: base
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
	res.setHeader('Content-Type', 'text/json');
	// res.send(base)
	// request(options, callback)
	// res.write('mi JSON:\n')
	 res.send(base);
	  // res.end(JSON.stringify(req.body, null, 2))

});

router.get('/resultados', function (req, res) {
	
	res.render('resultados', {
		env : env
	});


} );


console.log('Server started, please go to http://localhost:'+port+'\n');
console.log('JSON url: '+base );
