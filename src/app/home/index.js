const page = require('page');
const shutterstock = require('shutterstock');
const astro = require('../search');

page('/', ()=>{

	console.log('hola esss')
	// console.log(astro)

	let word = $('#buscar .input-search');

	astro.api.image.get( '461740330' , function (err, data) {
		// if (err) throw err;
		console.log(data);

		$('#container').html(data)
	} );

	

	word.on('change', ()=>{

		let keyw = word.val();

		console.log(keyw)

		astro.api.image.get( keyw , function (err, data) {
			// if (err) throw err;
			console.log(data);
		} );


	});



}); 