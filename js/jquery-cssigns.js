(function($) {

	var methods = {
		init: function(opts) {
			console.log('initialized!');
			console.log(this.position().top);
		},
		render: function(content) {
			var pluginClass = 'cssigns_';
			var pos = $(this).position();
			var width = $(this).width();
			var stopit = jQuery('<div/>', {
				class: pluginClass+'stopit'
			});
			$(this).after(stopit);
			stopit.css('top', pos.top + 2);
			stopit.css('left', pos.left + width + 10);
		
			// The bang.
			var bang = jQuery('<span/>', {class: pluginClass+'stopbang'});
			bang.text('!');
			bang.css('top', stopit.position().top - 3);
			bang.css('left', stopit.position().left + 6);
			stopit.after(bang);

			// overlay
			var overlay = jQuery('<div/>', { class: pluginClass+'overlay'});
			overlay.css({top: stopit.position().top, left: stopit.position().left});
			$('body').append(overlay);

			var bigOverlay = $('<div/>', {
				id: pluginClass+'big_overlay'
			});
			var errmsg = $('<span/>', {
				id: pluginClass+'errmsg'
			});

			bigOverlay.append(errmsg);
			$('body').append(bigOverlay);

			errmsg.text(content);

			overlay.mouseover(function(e) {
				var X = e.pageX;
				var Y = e.pageY;
				bigOverlay.show();
				errmsg.css('top', Y + 20);
				// Determine centering...
				if( ( errmsg.width() / $(document).width() ) < .85 ) {
					errmsg.css(
						'left',
						( ($(document).width() / 2) - (errmsg.width() / 2) )
					);
				} else {
					errmsg.css({left: (($(document).width() / 2) - (errmsg.width() / 2)) / 2, top: Y + 20});
				}
			});
			overlay.mouseout(function(e) {
				bigOverlay.hide();
			});

		},
		delete: function() {

		}
	};

	$.fn.cssigns = function(method) {
		// Method calling logic (taken right from plugin documentation).
	    if ( methods[method] ) {
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	      return methods.init.apply( this, arguments );
	    } else {
	      $.error( 'Method ' +  method + ' does not exist on jQuery.cssigns' );
	    }
	};

})(jQuery);