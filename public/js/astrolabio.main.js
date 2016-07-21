/*Distribucion de grid*/
$('.grid').isotope({
  itemSelector: '.grid-item',
  percentPosition: true,
  masonry: {
    columnWidth: '.grid-sizer'
  }
});

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


	//Instanciamos los colleciones y views
	window.collections.imagenes = new astrolabio.Collections.ImagenesCollection();

	window.views.resultados = new astrolabio.Views.viewsResultados(window.collections.imagenes.models);

	



	//Consumimos los datos que traemos desde el json//
	var xhr = $.get('/images/all');

	//Los añadimos a la coleccion para poder mostrarlos//

	xhr.done(function(data){
		
			data.forEach(function(resultados){
				// console.log(data.assets.preview.url);
				// console.log(resultados)
				window.collections.imagenes.add(resultados);

			});

			
	});
	// window.views.resultados.$el.appendTo($('.grid'));
	window.views.resultados.render();
});