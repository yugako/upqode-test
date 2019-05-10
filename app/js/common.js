!function($){function randInt(t,a){var e=t-.5+Math.random()*(a-t+1);return e=Math.round(e)}var methods={init:function(options){var defaults=$.extend(!0,{url:"mail/mail.php",reset:!0,beforeInit:function(){},afterInit:function(){},beforeSend:function(){},afterSend:function(){},onSuccess:function(){},onAjaxError:function(){},onServerError:function(){}},$.fn.sendMail.defaults);return this.each(function(){var $ths=$(this);if(1==$ths.data("_init"))return!1;$ths.data("defaults",defaults),$ths.data("options",options);var data=$ths.attr("data-sendmail");"object"!=typeof(data=eval("("+data+")"))&&(data={}),$ths.data("settings",$.extend(!0,{},defaults,options,data));var sets=$ths.data("settings");sets.beforeInit.call($ths,sets),$ths.addClass("sendmail-form"),sets._nsid=randInt(1e7,99999999),$ths.on("submit.sm-"+sets._nsid,function(){return methods.send.call($ths),!1}),$ths.data("_init",!0),sets.afterInit.call($ths,sets)}),$(this)},destroy:function(){if(!$(this).data("_init"))return!1;var t=$(this),a=t.data("settings");return t.removeClass("sendmail-form").off("submit.sm-"+a._nsid).removeData(),$(this)},reinit:function(t){var a=$(this),e=(a.data("settings"),a.data("options"));return methods.destroy.call(a),t&&"object"==typeof t?methods.init.call(a,t):methods.init.call(a,e),$(this)},send:function(){var t=$(this),a=t.data("settings");if(!1===a.beforeSend.call(t,a))return!1;if($.validator&&!t.valid())return!1;if(t.find('input[type="file"]').length)(e={data:new FormData(t.get(0)),ajaxProcData:!1,ajaxContType:!1}).data.append("errorReport",!0),window.FormData||(t.unbind("submit"),t.trigger("submit"));else var e={data:t.serialize()+"&errorReport=true",ajaxProcData:!0,ajaxContType:"application/x-www-form-urlencoded; charset=UTF-8"};return $.ajax({type:"POST",url:a.url,data:e.data,processData:e.ajaxProcData,contentType:e.ajaxContType,success:function(e){e.match(/sendmail-server-error/gim)?a.onServerError.call(t,a,e):(a.onSuccess.call(t,a,e),a.reset&&t.trigger("reset")),a.afterSend.call(t,a)},error:function(e){a.afterSend.call(t,a),a.onAjaxError.call(t,a,e)}}),$(this)}};$.fn.sendMail=function(t){return methods[t]?methods[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void $.error("Method "+t+" does not exist on jQuery.sendMail"):(methods.init.apply(this,arguments),this)}}(jQuery);
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

window.addEventListener('load', function() {
    let submit = $('.submit-btn');

    mail('.contact-form');

    function mail(elem) {
        $(elem).sendMail({
            afterInit: function(sets) {},
            beforeSend: function(sets) {
                submit.addClass('disabled');
            },
            afterSend: function(sets) {
                submit.removeClass('disabled');
                
            },
            onSuccess: function(sets, response) {
                $(elem).parent().append('<div class="message text-center">Повідомлення надіслано!</div> ');
               setTimeout(function () {
                   $('.message').fadeOut();
               }, 3000);
            },
            onServerError: function(sets, response) {
                $(elem).parent().append('<div class="message text-center">Повідомлення не надіслано! Помилка сервера</div> ');
               setTimeout(function () {
                   $('.message').fadeOut();
               }, 3000);
                
            },
            onAjaxError: function(sets, response) {
               $(elem).parent().append('<div class="message text-center">Повідомлення не надіслано! Помилка мережі!</div> ');
               setTimeout(function () {
                   $('.message').fadeOut();
               }, 3000);
                
            }
        })
    }        
});
