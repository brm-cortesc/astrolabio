const page = require('page');
const shutterstock = require('shutterstock');
const request = require('superagent');

page('/', ()=>{

	console.log('home cargada')

	let input = $('#buscar .input-search'); 

	Search(input, 1);

});

let xhr = 'image/search/'

const Search = (word, pg) =>{


	word.on('change', () =>{

		let keyw = word.val();
		request
			.get(xhr + keyw +'/'+ pg)
			.end( (err, res)=>{

				if (err) console.log(err)

				console.log(res.body);

			} )


		// axios.get(xhr + keyw +'/'+ pg)
		// 	.then((res)=>{

		// 		console.log(res)

		// 	});



	} );


};