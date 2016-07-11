astrolabio.Models.ImagenModel = Backbone.Model.extend({
	urlRoot: '/all',
	defaults:{},
	parse: function (response) {
		if(response.data){
			return response.data;
		}else{
			return response;
		}
	}
});

astrolabio.Models.Imagen = astrolabio.Models.ImagenModel