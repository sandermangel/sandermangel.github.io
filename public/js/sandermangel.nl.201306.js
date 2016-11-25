
// SKILLS TABLE
(function($){
	
	var trigger_array = [
		{
			observer: 'div#skills_table',
			action: function(observer, offsettop) {
				var oneperc_px = parseInt( observer.width() - observer.find('.skills_label:first').outerWidth() ) / 100;
				
				observer.find('.skills_perc').each(function(i, elm){
					var perc = Math.round( parseInt( $(elm).attr('data-perc') ) );
					$(elm).animate({ width: oneperc_px * perc }, 1200);
				});
			}
		}
	];
	
	$(document).ready(function(){
		for (k in trigger_array)
		{
			trigger_array[k].triggered = false;
			trigger_array[k].offsettop = $(trigger_array[k].observer).offset().top;
			trigger_array[k].offsetbottom = $(trigger_array[k].observer).offset().top + $(trigger_array[k].observer).height();
		}
	});
	
	
	$(window).scroll(function(){
		var scroll_offset = $(window).scrollTop();
		var scroll_offsetbottom = $(window).scrollTop() + $(window).height();
		
		for (k in trigger_array)
		{
			if (trigger_array[k].offsetbottom < scroll_offsetbottom) 
			{
				trigger_array[k].action($(trigger_array[k].observer), scroll_offset);
				delete trigger_array[k];
			}
		}
	});

})(jQuery);


// LINKS
(function($){
	
	var intervalHandle;
	var intervalCntr = 1;
	var origText;
	
	$('#links_block').find('a').bind('mouseenter', function(e){
		var elm = $(e.currentTarget);
		
		origText = elm.find('span').html();
		
		elm.find('span')
			.html('')
			.css('display', 'inline');
			
		intervalCntr = origText.length;
		intervalHandle = setInterval(function(){
			elm.find('span').html( origText.substr(intervalCntr, origText.length - intervalCntr) );
			
			if (!intervalCntr--) clearTimeout(intervalHandle);
		}, 20);
	});
	
	$('#links_block').find('a').bind('mouseleave', function(e){
		var elm = $(e.currentTarget);
		
		clearTimeout(intervalHandle);
		
		elm.find('span')
			.css('display', 'none')
			.html(origText);
	});

})(jQuery);

// MAPS
function initialize() {
			
	var map = new google.maps.Map(document.getElementById("personal-map-canvas"), {
		center: new google.maps.LatLng(_maps_glob_lat, _maps_glob_lng),
		zoom: 13,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		overviewMapControl: false,
		scrollwheel: false,
		navigationControl: false,
		draggable: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	
}
google.maps.event.addDomListener(window, 'load', initialize);