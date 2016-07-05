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


router.get('/', function (req, res) {
	
	// res.send('hola');
	res.render('index', { title: 'Shutter Photo'});

} );

console.log('Server started, please go to http://localhost:'+port);