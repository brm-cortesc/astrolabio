$('.grid').isotope({
  itemSelector: '.grid-item',
  percentPosition: true,
  masonry: {
    // use outer width of grid-sizer for columnWidth
    columnWidth: '.grid-sizer'
  }
});

/*sticky header*/
jQuery(document).ready(function($) {
	
	$(window).scroll(function() {
		if( $(window).scrollTop() >= 180 ){
	
			$('header')
				.addClass('fixed')
				.velocity({
					backgroundColorAlpha: 0.5
				},{
					duration: 500,
					easing: 'easeInOutSine'
				});


		}else{

			$('header')
				.removeClass('fixed')
				.velocity('reverse');
		}

	});
});