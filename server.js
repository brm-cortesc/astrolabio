const express = require('express');
const pug     = require('pug');
const app     = express();
const router  = express.Router();
const http    = require('http');
const shutterstock = require('shutterstock');
const env = 'dev';



app.listen(process.env.PORT || 5000, function (err) {
	 if (err) return console.log('Hubo un error'), process.exit(1);

	  console.log('corriendo en http://localhost:5000');
} );

app.use(router);
//Carpeta de vistas
app.set('views', __dirname + '/views');
//Declaramos archivos estaticos
app.use(express.static(__dirname + '/public'));
//Declaramos engine de vistas
app.set('view engine', 'pug');




router.get('/', (req,res,next)=>{

	res.render('index', {
		env : env
	});

});


router.get('/resultados', (req,res,next)=>{

	res.render('index', {
		env : env
	});

} );


router.get('/categorias', (req,res,next)=>{

	res.render('index', {
		env : env
	});

} );


router.get('/image/*', (req,res,next)=>{
	res.setHeader('content-type', 'text/json');
	next();
});

router.get('/image/search/:keyw/:pg', (req,res,next)=>{


	const keyw =  req.params.keyw;
	const pg =  req.params.pg;

	let opts ={
		keyw,
		page: pg
	};

	Api.image.search(opts, function (err, data) {
		if(err) res.send(err);
		// page(pg);
		res.send(data);
	});

});

