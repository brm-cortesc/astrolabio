astrolabio.Models.ImagenModel = Backbone.Model.extend({
	urlRoot: '/images/all',
	defaults:{},
	parse: function (resp) {

		if(resp.data){
			return resp.data;
		}else{
			return resp
		}

	}
});

astrolabio.Models.Imagen = astrolabio.Models.ImagenModel;