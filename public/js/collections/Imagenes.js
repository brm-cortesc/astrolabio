astrolabio.Collections.ImagenesCollection = Backbone.Collection.extend({

	model: astrolabio.Models.Imagen,
	url: '',
	name: 'resultados',
	parse: function (response) {
		return response.data;
	}

});


astrolabio.Collections.imagenes = astrolabio.Collections.ImagenesCollection;