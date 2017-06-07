const express = require('express');
const pug     = require('pug');
const app     = express();
const router  = express.Router();
const http    = require('http');
const shutterstock = require('shutterstock');
//env variables
require('dotenv').load();

//Shutterstock Credentials//

const Api = shutterstock.v2({
	clientId: process.env.clientID,
	clientSecret: process.env.clientSecret

});

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
		env : process.env.ENV
	});

});


router.get('/resultados', (req,res,next)=>{

	res.render('index', {
		env : process.env.ENV
	});

} );


router.get('/categorias', (req,res,next)=>{

	res.render('index', {
		env : process.env.ENV
	});

} );

//Set headers to JSON

router.get('/image/*', (req,res,next)=>{
	res.setHeader('content-type', 'text/json');
	next();
});


//API

router.get('/image/search/:keyw/:pg', (req,res,next)=>{


	const keyw =  req.params.keyw;
	const pg =  req.params.pg;

	let opts ={
		keyw,
		page: pg
	};



	Api.image.search(opts, (err, data)=> {
		if(err) res.send('No se pudo cargar'+ '\n' + err);
			res.send(data);
	});

});


//Categorias
router.get('/image/categories', (req,res,next)=>{

	Api.image.categories((err, data)=>{
		if(err) res.send('No se pudo cargar'+ '\n' + err);
		
		res.send(data);

	});

});


//imagen sencilla

router.get('/image/:id', (req,res,next)=>{


	const id =  req.params.id;


	Api.image.get(id, (err, data)=> {
		if(err) res.send('No se pudo cargar'+ '\n' + err);
		res.send(data);
	});

});
