astrolabio.Routers.BaseRouter = Backbone.Router.extend({
	routes: {
		'': 'root',
		'image:id': 'imageId'
	},
	initialize: function () {
	
		var self = this;
	},
	root: function () {
		var self = this;

		console.log('base');
		window.app.state = 'root';
	},

	imageId: function (id) {
		console.log('imageId ', id);

		window.app.state = 'imageId',
		window.app.image = id
	}


});