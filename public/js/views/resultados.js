astrolabio.Views.viewsResultados = Backbone.View.extend({

	// template: _.template($('#resultados_tpl').html()),

	// tagName: 'p',
	// my_template: _.template($('#resultados_tpl').html()),


	initialize : function(model){
			var self = this;
			this.model = model;
			this.template = _.template($("#resultados_tpl").html());
		},

  	render: function (data) {

		var self = this;
		var locals = self.model.toJSON();

		// this.$el.html(this.template({Resultados:locals}));
		this.$el.html(this.template({Resultados:locals}));

		// console.log(locals)

		return this;


  	}

});



astrolabio.Views.Resultados = astrolabio.Views.viewsResultados;