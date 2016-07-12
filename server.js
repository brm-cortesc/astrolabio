var express = require('express'),
	fs 		= require('fs'),
    pug     = require('pug'),
	app     = express(),
    router  = express.Router(),
    bodyParser = require('body-parser'),
    http = require('http'),
	config = require('./config');

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
    }, 500);
};

//Rutas para visualizar

router.get('/', function (req, res) {

	generate('http://jsonplaceholder.typicode.com/posts/', 'dat.txt');
	
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


app.get('/all', function (req, res) {
	res.setHeader('Content-Type', 'text/json');
	res.send(config.base);

});

router.get('/resultados', function (req, res) {
	
	res.render('resultados', {
		env : config.env
	});


} );


console.log('Server started, please go to http://localhost:'+config.port+'\n');
