astrolabio.Views.viewsResultados = Backbone.View.extend({


	initialize : function(model){
			var self = this;
			this.model = model;
			this.template = _.template($("#resultados_tpl").html());

			window.routers.on('route:root', function(){
				self.render();
			});
		},

  	render: function (data) {

		var self = this;
		var locals = self.model.toJSON();

		// this.$el.html(this.template({Resultados:locals}));
		this.$el.html(this.template({Resultados:locals}));

		// console.log(locals[0].id)

		return this;


  	},

  	getImg: function (model) {
  		let id =  model.currentTarget.getAttribute('data-img'); 
  		Backbone.history.navigate('image/'+id, {trigger:true});

  	},
  	events:{
  		'click .view-img': 'getImg'
  	}

});



astrolabio.Views.Resultados = astrolabio.Views.viewsResultados;