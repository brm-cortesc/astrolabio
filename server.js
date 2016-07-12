var express = require('express'),
	fs 		= require('fs'),
    pug     = require('pug'),
	app     = express(),
    router  = express.Router(),
    HttpProxyAgent = require('http-proxy-agent'),
    request = require('request'),
    bodyParser = require('body-parser'),
    http = require('http'),
	config = require('./config');

//Proxy
var agent = new HttpProxyAgent(config.proxy);


request.defaults({jar: true});

//Configuración de consumo de JSON
var domain = 'http://jsonplaceholder.typicode.com/posts/',
	search = '/searchst',
	idImg  =  '/details',
	dataCuenta = '/details-user',
	downloadImg = '/download-img';

app.listen(process.env.PORT || config.port );
//View engine
app.use(router);
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'pug');

// Add POST, PUT, DELETE methods to the app
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ type: 'application/*+json' }));

//Funcion para crear JSON
var generate = function(url, dest, cb) {

  //Generamos un archivo plano
  
  var file = fs.createWriteStream(dest);

  var requerir = http.get(url, function(response) {
    response.pipe(file);
    console.log(response);
    file.on('finish', function() {
      file.close(cb);  //se hace callback despues de que se ejecuta close
    });
  });

  //renombramos el archivo con extension .json
  setTimeout(function() {
      fs.rename(dest, 'data.json', function (err) {
         if (err) throw err;
        console.log('json creado');
      });
    }, 2000);
};

var rename = function (src) {
	  setTimeout(function() {
	      fs.rename(src, 'data.json', function (err) {
	         if (err) throw err;
	        console.log('json creado');
	      });
	    }, 500);
	};

//Rutas para visualizar

router.get('/', function (req, res) {

	//para generar json con proxy//
	request({
		url: domain,
		agent: agent,
		timeout: 10000,
		followRedirect: true,
		maxRedirects: 10
	}, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  		request.post('')
		   console.log(body);

	  }
	}).pipe(fs.createWriteStream('test.txt'));

	rename('test.txt');
	
	//generar json sin proxy//
	// generate(domain, 'dat.txt');
	res.render('index', {
		env : config.env
	});

} );


router.get('/categorias', function (req, res) {

	res.render('categorias', {
		env : config.env
	});

} );



router.get('/image', function (req, res) {
	
	res.render('single-image', {
		env : config.env
	});

} );


app.get('/images/all', function (req, res) {
	res.setHeader('Content-Type', 'text/json');
	res.send(config.base);

});

router.get('/resultados', function (req, res) {
	
	res.render('resultados', {
		env : config.env
	});


} );


console.log('Server started, please go to http://localhost:'+config.port+'\n');
