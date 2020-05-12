(function($) {
	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');
	var $webappdata;
	$.fn.showIfAvailable = function() {
		// requires additional request hearders in your webserver, in my case nginx
		// Add to nginx configuration as much add_header as cards needed 
		// ->'add_header WEBAPP goaccess;' , for example.
		var	$this = $(this);
		var $a = $this.find('div.card');
		$.ajax({
			url: $(location).attr('href')
		}).done(function (data, textStatus, xhr) { 
			$webappdata = xhr.getResponseHeader('WEBAPP');
			//console.log(xhr.getAllResponseHeaders().toLowerCase()); 
			//$("#dump").html($webappdata);
			$a.each(function() {
				if ($webappdata.indexOf($(this).attr('id')) >= 0){
					//alert($(this).attr('id')+'-> is in Array!');
				} else {
					//alert($(this).attr('id')+ '-> Not in Array!');
					$(this).css("display", "none");
				}
				return this;
			});	
		});
	};

	// Play initial animations on page load.
	$window.on('load', function() {
		$('.cards-group').showIfAvailable();	  
		$('.preloader').fadeOut(2000, function (){
			$body.removeClass('is-preload');
		});
	});

	// Scrolly.
	$('#nav a, .scrolly').scrolly({
		speed: 1000,
		offset: function() { return $nav.height(); }
	});

})(jQuery);
