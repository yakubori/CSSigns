(function($) {

	var methods = {
		init: function(options) {
			return this.each(function() {
				var $this = $(this),
					data = $this.data('cssigns'),
					prefix = 'cssigns_',
					bigOverlay = $('<div/>', {id: prefix+'big_overlay'}),
					errmsg = $('<span/>', {id: prefix+'errmsg'});

				if(!data) {
					$(this).data('cssigns', {
						prefix: prefix,
						bigOverlay: bigOverlay,
						errmsg: errmsg
					});
				}
				console.log('initialized!');
			});
		},
		render: function(content) {
			return this.each(function() {
				var $this = $(this),
					data = $this.data('cssigns');

				var pos = $this.position();
				var width = $this.width();
				var stopit = jQuery('<div/>', {
					class: data.prefix+'stopit'
				});
				$(this).after(stopit);
				stopit.css('top', pos.top + 2);
				stopit.css('left', pos.left + width + 10);
			
				// The bang.
				var bang = jQuery('<span/>', {class: data.prefix+'stopbang'});
				bang.text('!');
				bang.css('top', stopit.position().top - 3);
				bang.css('left', stopit.position().left + 6);
				stopit.after(bang);

				// overlay
				var overlay = jQuery('<div/>', { class: data.prefix+'overlay'});
				overlay.css({top: stopit.position().top, left: stopit.position().left});
				$('body').append(overlay);

				data.bigOverlay.append(data.errmsg);
				$('body').append(data.bigOverlay);

				data.errmsg.text(content);

				overlay.mouseover(function(e) {
					var X = e.pageX;
					var Y = e.pageY;
					data.bigOverlay.show();
					data.errmsg.css('top', Y + 20);
					// Determine centering...
					if( ( data.errmsg.width() / $(document).width() ) < .85 ) {
						data.errmsg.css(
							'left',
							( ($(document).width() / 2) - (data.errmsg.width() / 2) )
						);
					} else {
						data.errmsg.css({left: (($(document).width() / 2) - (data.errmsg.width() / 2)) / 2, top: Y + 20});
					}
				});
				overlay.mouseout(function(e) {
					data.bigOverlay.hide();
				});
			});
		},
		remove: function() {
			console.log('removed...');
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