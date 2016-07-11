astrolabio.Collections.ImagenesCollection = Backbone.Collection.extend({

	model: astrolabio.Models.Imagen,
	url: '',
	name: 'imagenes',
	parse: function (response) {
		console.log( response)
	}


});