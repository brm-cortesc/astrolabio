const axios = require('axios');

module.exports = function search(ctx, next) {

	let word = $('#buscar .input-search');


	word.on('change', ()=>{

		let keyw = word.val();

		// console.log(keyw)

		console.log(word.val());

		let url = 'http://igroupsoluciones.com/repo/searchst/'+keyw;

		axios
			.get(url,{
				withCredentials:true
			})
			.then(function (res) {
				console.log(res);
				next();
			})
			
	});
	
	next();
};
