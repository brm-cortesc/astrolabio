astrolabio.Views.viewsImageId = Backbone.View.extend({


	initialize : function(model){
			var self = this;
			this.model = model;
			this.template = _.template($("#image_tpl").html());

			window.routers.on('route:imageId', function(){
				self.render();
			});
		}


});



astrolabio.Views.ImageId = astrolabio.Views.viewsImageId;