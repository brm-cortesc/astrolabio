astrolabio.Collections.ImagenesCollection = Backbone.Collection.extend({

	model: astrolabio.Models.Imagen,
	url: '',
	name: 'resultados',
	parse: function (response) {
		return response.data;
	},
	getOne : function(id){
	       return this.filter(function(data) {
	           return data.get("id") == id;
	       });
	 }

});


astrolabio.Collections.imagenes = astrolabio.Collections.ImagenesCollection;