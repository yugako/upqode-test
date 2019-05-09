$(function() {

	$('.bar-item_value').each(function () {
		$(this).find('.counter').animate({
			width:$(this).attr('data-percent')
		}, 2000);
    });

});
