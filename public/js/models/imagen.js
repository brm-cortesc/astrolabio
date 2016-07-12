astrolabio.Models.ImagenModel = Backbone.Model.extend({
	urlRoot: '/all',
	defaults:{},
	parse: function (response) {
		if(response.data){
			return response.data;
			console.log(response.data);
		}else{
			return response.data;
			console.log(response.data);
		}
	}
});

astrolabio.Models.Imagen = astrolabio.Models.ImagenModel;