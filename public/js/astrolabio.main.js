/*Distribucion de grid*/
$('.grid').isotope({
  itemSelector: '.grid-item',
  percentPosition: true,
  masonry: {
    columnWidth: '.grid-sizer'
  }
});

var keyword = $('.buscador-header input').val(),
	pg = '1';

jQuery(document).ready(function($) {
	
	/*sticky header*/
	$(window).scroll(function() {
		if( $(window).scrollTop() >= 180 ){
	
			$('header')
				.addClass('fixed')
				.velocity({
					backgroundColor: '#000',
					backgroundColorAlpha: 0.7
				},{
					duration: 100,
					easing: 'easeInOutSine'
				});


		}else{

			$('header')
				.removeClass('fixed')
				.velocity({
					backgroundColor: '#e4aa15',
					backgroundColorAlpha: 1
				},{
					duration: 100,
					easing: 'easeInOutSine'
				});
		}

	});








	//Instanciamos los colleciones, views y enrutador
	window.routers = new astrolabio.Routers.BaseRouter();

	window.collections.imagenes = new astrolabio.Collections.ImagenesCollection();

	window.views.resultados = new astrolabio.Views.viewsResultados(window.collections.imagenes);



	//Consumimos los datos que traemos desde el json//
	// var xhr = $.get('/searchst/'+keyword+'/'+pg);
	// var xhr = $.get('/front/images/all');
	var xhr = $.get('http://history.muffinlabs.com/date');


	// console.log(window.location)

	xhr.done(function(data){

			console.log('es:' +data);
		
			data.forEach(function(resultados){
				//Los añadimos a la coleccion para poder mostrarlos//
				window.collections.imagenes.add(resultados);


			});

			Backbone.history.start({
				root : "/",
				pushState : true,
				silent : false
		});

		//Se renderiza una vez se terminan de añadir los objetos a la colección	
		window.views.resultados.render();

	});

	$('.grid').append(window.views.resultados.el);

	

	

	//efemerides//

	var date = 'http://history.muffinlabs.com/date';

		$.getJSON(date, {format: 'jsonp'}, function(data) {

			$.each(data, function(index, val) {
				 console.log(data);
			});
		});


});