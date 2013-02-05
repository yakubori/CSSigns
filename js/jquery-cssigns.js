(function($) {

  var methods = {

    init: function(options) {
      return this.each(function() {
        var $this = $(this),
        data = $this.data('cssigns'),
        prefix = 'cssigns_',
        error = $( '<div/>', {class: prefix+'error'} );
        content = '',
        sign = $('<div/>');
        bang = $( '<span/>', {class: prefix+'bang'} ),
        overlay = $( '<div/>', {class: prefix+'overlay'} ),
        pageOverlayId = prefix+'page_overlay',
        errmsgId = prefix+'errmsg';

        if(!data) {
          $(this).data('cssigns', {
            prefix: prefix,
            error: error,
            content: content,
            sign: sign,
            bang: bang,
            overlay: overlay,
            pageOverlayId: pageOverlayId,
            errmsgId: errmsgId
            });
        }
        console.log('initialized!');
        });
    },
    
    render: function(type, content) {
      return this.each(function() {
        var $this = $(this),
        data = $this.data('cssigns');

        if(!data) {
          $.error('Cannot call render() on an uninitialized CSSign.');
        }

        data.content = data.content ?
            data.content :
            content ?
                content:
                $.error('CSSigns render() requires a content agrument.');

        var types = ['warn', 'error'];

        if( $.inArray(type.toLowerCase(), types) < 0 ) {
          $.error('Invalid type argument in render(): '+type);
        }
        
        var pos = $this.position();
        var width = $this.width();
        var error = data.error;
        var sign = data.sign;
        var signClass = data.prefix+type;
        console.log('rendering: '+signClass);
        console.log( $this.attr('id') +': '+ width );

        sign.addClass(signClass);
        sign.css({
          top: (pos.top + 2),
          left: (pos.left + width + 10)
          });

        $this.after(sign);

        // The bang.
        var bang = data.bang;
        bang.addClass(data.prefix+type+'bang');
        bang.text('!');
        var bangTop = type == 'warn' ? sign.position().top + 2 : sign.position().top;
        var bangLeft = sign.position().left + 7;
        bang.css( 'top', bangTop );
        bang.css( 'left', bangLeft );
        sign.after(bang);

        // overlay
        var overlay = data.overlay;
        overlay.css({
          top: sign.position().top,
          left: sign.position().left
          });
        $('body').append(overlay);

        // Manage rendering so the page overlay and error messages are not duplicated.
        var pageOverlay = $('#'+data.pageOverlayId);
        var errmsg = $('#'+data.errmsgId);
        if(pageOverlay.length == 0) {
            pageOverlay = $('<div/>', { id: data.pageOverlayId });
            errmsg = $('<div/>', { id: data.errmsgId });
            pageOverlay.append(errmsg);
            $('body').append(pageOverlay);
        }

        overlay.mouseover(function(e) {
            var X = e.pageX;
            var Y = e.pageY;
            errmsg.text(data.content);
            pageOverlay.show();
            errmsg.css('top', Y + 20);
            });
        
        overlay.mouseout(function(e) {
            pageOverlay.hide();
            });
        });
    },

    warn: function(content) {
      return this.each(function() {
        var $this = $(this),
            data = $this.data('cssigns');

        if(!data) {
          $.error('Cannot call warn() on an uninitialized CSSign.');
        }

        $this.cssigns('render', 'warn', content);
        });
    },
    
    error: function(content) {
      return this.each(function() {
        var $this = $(this),
            data = $this.data('cssigns');

        if(!data) {
          $.error('Cannot call error() on an uninitialized CSSign.');
        }

        $this.cssigns('render', 'error', content);
        });
    },
    
    clear: function() {
      return this.each(function() {
        var $this = $(this),
            data = $this.data('cssigns');

        if(!data) {
            $.error('Cannot call clear() on an uninitialized CSSign.');
        }

        $('#'+data.pageOverlayId).hide();
        data.overlay.remove();
        data.bang.remove();
        data.sign.remove();
        console.log('cleared');
        });
    },
    
    destroy: function() {
      return this.each(function() {
        var $this = $(this),
            data = $this.data('cssigns');

        if(!data) {
            $.error('Cannot call destroy() on an uninitialized CSSign.');
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
