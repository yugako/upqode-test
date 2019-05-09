$(function() {

	$('.bar-item_value').each(function () {
		$(this).find('.counter').animate({
			width:$(this).attr('data-percent')
		}, 2000);
    });

    $('.banner-slider').slick({
    	autoplay: true,
    	autoplaySpeed: Math.floor(Math.random()*2000 + 5000),
    	dots: true,
    	prevArrow: '<button class="banner-slider_prev banner-buttons">&lt;</button>',
    	nextArrow: '<button class="banner-slider_next banner-buttons">&gt;</button>',
    	customPaging : function(slider, i) {
    	 var thumb = $(slider.$slides[i-1]).data();
    	  return '<span class="dot"></span>';
    	 },
    });

    $('.products-slider').slick({
    	autoplay: false,
    	dots: true,
    	arrows: false,
    	customPaging : function(slider, i) {
    	 var thumb = $(slider.$slides[i-1]).data();
    	  return '<span class="dot"></span>';
    	 },
    });

    $('.burger').click(function () {
    	$('.burger span').toggleClass('active');
    	$('.menu').toggleClass('menu-active');
    })

});
