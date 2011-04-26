// # App
//
// This is a closure which returns our App class.  The App class contains all
// of the events logic and 
var App = (function() {

  // ## Constructor function
  var app = function() {
    // This is a list of all of the themes available through jQuery UI
    this.themes = [
      'black-tie', 'blitzer', 'cupertino',
      'dark-hive', 'dot-luv', 'eggplant',
      'excite-bike', 'flick', 'hot-sneaks',
      'humanity', 'le-frog', 'mint-choc',
      'overcast', 'pepper-grinder', 'redmond',
      'smoothness', 'south-street', 'start',
      'sunny', 'swanky-purse', 'trontastic',
      'ui-darkness', 'ui-lightness', 'vader'
    ];
    this.currentTheme = 'le-frog';
    this.themePrefix = 'theme-';
    this.themeCookieExpiration = 28;

    this.markdown = new Showdown.converter();

    this.buttonOptions = {
      'settings': {
        'icons': {
          'primary': 'ui-icon-wrench',
        }
      },
      'newControl': {
        'icons': {
          'primary': 'ui-icon-gear'
        }
      }
    };

    this.positions = {
      '#speed': {
        'my': 'left center',
        'at': 'right center',
        'of': '#newControl',
        'offset': '13 0'
      },
      '#updateOn': {
        'my': 'left center',
        'at': 'right center',
        'of': '#speed',
        'offset': '13 0'
      },
      '#settings': {
        'my': 'left center',
        'at': 'right center',
        'of': '#updateOn',
        'offset': '3 0'
      }
    };

    this.app = $('#app');
    this.appParent = this.app.parent();

    // JSS rules make use of the JSS jQuery plugin.  JSS uses
    // `jQuery.delegate()` and `jQuery.live()` to make applying javascript event
    // listeners like applying CSS rules.
    //
    // We write each production with a CSS selector and an event name
    // _[optional: no event name implies "create" event]_ jQuery 
    //
    // We have to bind scope for any event that references this class.
    // We can still access the element referenced via the event variable
    //
    // Example: `$(evt.currentTarget);`
    var jss = {
      '@create':               this.bind('create'),
      '@resize':               this.bind('resize'),
      '@tabsselect':           this.changeTab,
      'button':                this.bind('buttons'),
      '.buttonset':            function() { $(this).buttonset(); },
      '.toolbar #speed':       this.bind('speedSlider'),
      '#themeChanger':         this.bind('themeList'),
      '#themeChanger@change':  this.bind('changeTheme'),
      '#projectDocsEdit@blur': this.bind('markup'),
      '#projectDocs@click':    this.editDocs,
      '#projectDocs a@click':  this.goToUrlNoEdit
    };

    var theme = readCookie('theme');
    // For some reason calls to `$('#themeChanger').trigger('change')` won't
    // work so we're going to execute the `changeTheme` function but act like
    // its being called form an event handler.
    this.changeTheme(
      {'currentTarget': $('#themeChanger')[0]},
      [theme]
    );  

    this.markup({'currentTarget': $('#projectDocsEdit')});

    // apply our JSS rules to the #app id
    this.app.jss(jss);
  };

  // The prototype for our App "class"
  app.prototype = {
    // Just a non-descript binding function
    'bind': function(f) {
      var self = this;
      return function() {
        return self[f].apply(self, arguments);
      }
    },

    'changeTab': function(evt, ui) {
      createCookie('selectedTab', ui.index, 2);
    },

    // Converts the #app element to a jQuery UI tabs element
    'create': function() {
      var index = readCookie('selectedTab') || 0;
      this.app.tabs({
        'show': this.bind('jostle'),
        'selected': index
      });
    },

    'resize': function() {
      var
        x = (this.app.width() >= this.appParent.width()) ? 'left' : 'center',
        y = (this.app.height() >= this.appParent.height()) ? 'top' : 'center';
      this.app.position({
        my: x+' '+y,
        at: x+' '+y,
        of: this.appParent,
        collision: 'none'
      });
      this.jostle();
    },

    // Jostle these elements to fit in the right place
    'jostle': function() {
      for(var key in this.positions) {
        $(key).position(this.positions[key]);
      }
    },

    // turn button elements into buttons
    'buttons': function(i, ele) {
      var
        self  = $(ele),
        id    = self.attr('id');
      self.button(this.buttonOptions[id]);
    },

    'speedSlider': function(i, ele) {
      $(ele).slider({value: 50});
    },

    // Search through the stylesheets we've already loaded attempting to enable
    // the matched <style> id example "Theme-Purdy-Pink-Bunnies"
    'enableLoadedTheme': function() {
      var enabled = void(0);
      $('link[id^='+this.themePrefix+']').each(function() {
        this.disabled = this.getAttribute('id') != this.currentTheme;
        if (! this.disabled) enabled = this;
      });
      return enabled;
    },

    'changeTheme': function(evt, title) {
      title = title || $(evt.currentTarget).val();
      createCookie('theme', title, this.themeCookieExpiration);
      this.currentTheme = this.themePrefix+title;
      if (! this.enableLoadedTheme()) {
        var
          e = $('<link rel="stylesheet" type="text/css">'),
          url =  'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/themes/'+title+'/jquery-ui.css';
        e.attr({'href': url, 'id': this.currentTheme});
        e.appendTo('head');
      }
      this.resize();
      // Wait a second and resize... Cheap way to deal with asynchronous requests
      setTimeout(this.bind('resize'), 1000);
    },

    'themeList': function(i, ele) {
      var self = $(ele);
      for (var i = this.themes.length - 1; i >= 0; i--) {
        var theme = this.themes[i];
        $('<option value="'+theme+'">'+theme+'</option>').prependTo(self);
      };
    },

    'markup': function(evt) {
      var
        self = $(evt.currentTarget),
        md   = self.val();
        html = this.markdown.makeHtml(md),
        e    = $('<div id="projectDocs" class="ui-widget-content ui-corner-all">');
      e.html(html);
      e.data('md', md);
      self.replaceWith(e);
    },

    'editDocs': function() {
      var
        self = $(this),
        md   = self.data('md'),
        e    = $('<textarea id="projectDocsEdit" class="ui-widget-content ui-corner-all">');
      e.html(md);
      self.replaceWith(e);
      e[0].focus();
    },

    'goToUrlNoEdit': function(evt) {
      window.location = $(evt.target).attr('href');
    }
  };

  // cookie functions http://www.quirksmode.org/js/cookies.html
  var createCookie = function(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  }

  var readCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  var eraseCookie = function(name) {
    createCookie(name,"",-1);
  }

  return app
}());

$(document).ready(function() {
  var app = new App();

  app.resize();
  $(window).resize(function(evt) { app.resize(); });
});