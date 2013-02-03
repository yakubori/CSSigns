(function($) {

  var methods = {

    init: function(options) {
      return this.each(function() {
        var $this = $(this),
        data = $this.data('cssigns'),
        prefix = 'cssigns_',
        stopit = $( '<div/>', {class: prefix+'stopit'} );
        bang = $( '<span/>', {class: prefix+'stopbang'} ),
        overlay = $( '<div/>', {class: prefix+'overlay'} ),
        bigOverlay = $( '<div/>', {id: prefix+'big_overlay'} ),
        errmsg = $( '<span/>', {id: prefix+'errmsg'} );

        if(!data) {
          $(this).data('cssigns', {
            prefix: prefix,
            stopit: stopit,
            bang: bang,
            overlay: overlay,
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

        if(!data) {
            $.error('Cannot render() an uninitialized CSSign.');
        }

        var pos = $this.position();
        var width = $this.width();
        var stopit = data.stopit;

        stopit.css( 'top', pos.top + 2 );
        stopit.css( 'left', pos.left + width + 10 );

        $this.after(stopit);

        // The bang.
        var bang = data.bang;
        bang.text('!');
        bang.css( 'top', stopit.position().top - 3 );
        bang.css( 'left', stopit.position().left + 6 );
        stopit.after(bang);

        // overlay
        var overlay = data.overlay;
        overlay.css({
          top: stopit.position().top,
          left: stopit.position().left
          });
        $('body').append(overlay);

        var bigOverlay = data.bigOverlay.append(data.errmsg);
        $('body').append(bigOverlay);

        var errmsg = data.errmsg;
        errmsg.text(content);

        overlay.mouseover(function(e) {
            var X = e.pageX;
            var Y = e.pageY;
            bigOverlay.show();
            errmsg.css('top', Y + 20);
            // Determine centering...
            if( (errmsg.width() / $(document).width()) < .85 ) {
            errmsg.css({
              left: (($(document).width() / 2) - (errmsg.width() / 2))
              });
            } else {
              errmsg.css({
                left: (($(document).width() / 2) - (errmsg.width() / 2)) / 2, top: Y + 20
                });
            }
            });
        
        overlay.mouseout(function(e) {
            bigOverlay.hide();
            });
        });
    },
    
    clear: function() {
      return this.each(function() {
        var $this = $(this),
            data = $this.data('cssigns');

        if(!data) {
            $.error('Cannot clear() an uninitialized CSSign.');
        }

        data.bigOverlay.remove();
        data.overlay.remove();
        data.bang.remove();
        data.stopit.remove();
        console.log('cleared');
        });
    },
    
    destroy: function() {
      return this.each(function() {
        var $this = $(this),
            data = $this.data('cssigns');

        if(!data) {
            $.error('Cannot destroy() an uninitialized CSSign.');
        }

        $(window).unbind('.cssigns');
        $this.cssigns('clear');
        $this.removeData('cssigns');
        console.log('removed...');
        });
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
