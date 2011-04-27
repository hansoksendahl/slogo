// JSS is a tiny jQuery plugin that makes use of jQuery live() and jQuery delegate()

// for assigining events to both statically and dynamically created elements.

//

// Also used is the "create" event which fires any time an element is added to the DOM

(function($){

  $.fn.jss = function(map) {

    for(key in map) {

      var identifiers = key.split(/\s*,\s*/),

          handler     = map[key];

      for(var i = identifiers.length; i--; ) {

        var identifier = identifiers[i],

            arr        = identifier.split('@'),

            selector   = arr[0] || this.selector,

            event      = arr[1] || 'create';

        if(typeof handler === 'function') {

          // handle "create" events on elements that are present on first run

          if(event === 'create') {

            // handle nested selectors

            if(selector != this.selector) { $(this.selector+' '+selector).each(handler); }

            else { $(selector).each(handler); }

          }

          // handle nested selectors

          if(selector != this.selector) { this.delegate(selector, event, handler); }

          else { this.live(event, handler); }

        }

        else {

          $(selector).jss(handler);

        }

      }

    }

    // preserve jQuery chainability

    return this;

  };

})(jQuery);