var express = require('express'),
    pug     = require('pug'),
    fs 		= require('fs'),
	app     = express(),
    router  = express.Router(),
    request = require('request'),
    bodyParser = require('body-parser'),
    http = require('http'),
	server  = http.createServer(app),
    port    = 5000,
    env 	= 'dev';



//Configuración de consumo de JSON
var domain = 'http://igroupsoluciones.com/repo',
	search = '/searchst',
	idImg  =  '/details',
	dataCuenta = '/details-user',
	downloadImg = '/download-img';

// var data = domain+search+'/dog';
//Creamos archivo de json para hacer 1 consulta al servidor * query
var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var requerir = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  });

  setTimeout(function() {
  	  fs.rename(dest, 'data.json', function (err) {
  	  	 if (err) throw err;
  		  console.log('renamed complete');
  	  });
  	}, 500);
};


var base =  fs.readFileSync('./data.json').toString();



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


	request('http://igroupsoluciones.com/repo/', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		download('http://igroupsoluciones.com/repo/searchst/'+query, 'dat.txt');
	    console.log(body) // Show the HTML 
	  }
	});
	
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
	 res.send(base);

});

router.get('/resultados', function (req, res) {
	
	res.render('resultados', {
		env : env
	});


} );


console.log('Server started, please go to http://localhost:'+port+'\n');
// console.log('JSON url: '+base );
