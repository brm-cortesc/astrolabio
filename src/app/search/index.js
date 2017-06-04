let xhr = 'image/search/'

const Search = (word, pg) =>{


	word.on('change', () =>{

		let keyw = word.val();

		axios.get(xhr + keyw + pg)
			.then((res)=>{

				console.log(res)

			});

	} );


};


module.exports = function (ctx, next) {
	Search();
	next();
}