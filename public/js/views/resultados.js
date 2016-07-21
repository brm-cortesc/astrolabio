astrolabio.Views.viewsResultados = Backbone.View.extend({

	// template: _.template($('#resultados_tpl').html()),


	initialize : function(model){
			var self = this;
			this.model = model;
			this.template = $("#resultados_tpl").html();
		},

  	render: function (data) {

		// var self = this;
		// var locals = self.model.toJSON();

		// this.$el.html(this.template({resultado:locals}));

		// return this;


  	}

});



astrolabio.Views.Resultados = astrolabio.Views.viewsResultados;