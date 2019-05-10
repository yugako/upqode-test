// Run animation, when block is visible

var $window = $(window);
var $elem = $(".bar-item_value")
var $elem1 = $('.bar-item_percent');
var flag = true;
function isScrolledIntoView($elem,  $window) {
    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

$(document).on("scroll", function () {
    if (isScrolledIntoView($elem, $window)) {
        $elem.each(function () {
			$(this).find('.counter').animate({
				width:$(this).attr('data-percent')
			}, 2000);
        });
    }
});

$(document).on("scroll", function () {
    if (isScrolledIntoView($elem1, $window) && flag) {
        $elem1.each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 2000,
                easing: 'swing',
                step:function(now){
                    $(this).text(Math.ceil(now));
                }
            
            }
        );
        });
        flag = false;
    }
});

$(function() {
	// Slider config
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

    // Burger menu
    $('.burger').click(function () {
    	$('.burger span').toggleClass('active');
    	$('.menu').toggleClass('menu-active');
    });


    var sections = $('section'), 
    	nav = $('nav'), 
    	nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
      var cur_pos = $(this).scrollTop();
      
      sections.each(function() {
        var top = $(this).offset().top - nav_height,
            bottom = top + $(this).outerHeight();
        
        if (cur_pos >= top && cur_pos <= bottom) {
          nav.find('a').removeClass('link-active');
          sections.removeClass('link-active');
          
          $(this).addClass('link-active');
          nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('link-active');
        }
      });
    });

    nav.find('a').on('click', function () {
      var $el = $(this)
        , id = $el.attr('href');
      
      $('html, body').animate({
        scrollTop: $(id).offset().top - nav_height + 20
      }, 500);
      
      return false;
    });




});
