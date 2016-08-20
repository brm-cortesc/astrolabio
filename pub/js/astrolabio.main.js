/*Distribucion de grid*/
$('.grid').isotope({
  itemSelector: '.grid-item',
  percentPosition: true,
  masonry: {
    columnWidth: '.grid-sizer'
  }
});

var keyword = $('.buscador-header input'),
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


	var xhr;

	// keyword.on('change', function() {
	// 	//Consumimos los datos que traemos desde el json//
	// // var xhr = $.get('/front/images/all');
	// });

	

	keyword.change(function() {
		xhr = $.get('/searchst/'+$(this).val()+'/'+pg);

		$('.cargador').removeClass('hidden');
		// window.collections.imagenes.models.destroy();	
		console.log(window.collections.imagenes.models.length);


		

			
		// if ( window.collections.imagenes.models.length != 0){
			window.collections.imagenes.models = [];
		// };
		
		xhr.done(function(data){

			$('.cargador').addClass('hidden');
			data.forEach(function(resultados){
				//Los añadimos a la coleccion para poder mostrarlos//
				window.collections.imagenes.add(resultados);


		});

		console.log(window.collections.imagenes.models)


			//Se renderiza una vez se terminan de añadir los objetos a la colección	
			window.views.resultados.render();

		});

	});

	Backbone.history.start({
			root : "/",
			pushState : true,
			silent : false
	});

	
	$('#items').html(window.views.resultados.el);

	

	


});