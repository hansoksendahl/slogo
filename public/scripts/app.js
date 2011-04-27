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

    // We use cookies to track which theme and which tab are currently open.
    this.currentTheme = readCookie('theme');
    this.tabIndex     = readCookie('selectedTab') || 0;

    // We add a prefix to the id tags of each theme we load.
    // (e.g. theme-le-frog)
    this.themePrefix = 'theme-';

    // How long should our cookies last?
    this.cookieExpiration = 28;

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

    // We make use of the jQuery UI position function quite a bit in this
    // interface.  The following are the elements that are dynamically
    // positioned (organized by id).
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
    // Example: `$(evt.target);`
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

    this.markup({'target': $('#projectDocsEdit')});

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
      this.tabIndex = ui.index
      createCookie('selectedTab', this.tabIndex, this.cookieExpiration);
    },

    // Converts the #app element to a jQuery UI tabs element
    'create': function() {
      this.app.tabs({
        'show': this.bind('jostle'),
        'selected': this.tabIndex
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

    // Turn button elements into jQuery UI buttons
    'buttons': function(i, ele) {
      var
        self  = $(ele),
        id    = self.attr('id');
      self.button(this.buttonOptions[id]);
    },

    // Create the slider that we use for speed adjustments
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

    // Switch to the theme that the user has picked.
    // All themes are hosted on the Google Ajax CDN
    'changeTheme': function(evt) {
      var title = $(evt.target).val();
      createCookie('theme', title, this.cookieExpiration);
      this.currentTheme = this.themePrefix+title;
      if (! this.enableLoadedTheme()) {
        var
          e = $('<link rel="stylesheet" type="text/css">'),
          url =  'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/themes/'+title+'/jquery-ui.css';
        e.attr({'href': url, 'id': this.currentTheme});
        e.appendTo('head');
      }
      this.resize();
      // Wait a second and resize... Cheap way to deal with asynchronous
      // requests
      setTimeout(this.bind('resize'), 1000);
    },

    // Creates our list of themes (all of which are hosted on the Google Ajax
    // CDN).  If a theme has been set then we load it immediately via the
    // changeTheme function.
    'themeList': function(i, ele) {
      var
        self     = $(ele),
        setTheme = false;
      for (var i = this.themes.length - 1; i >= 0; i--) {
        var
          attribs = '',
          theme   = this.themes[i];
        if (theme == this.currentTheme) {
          attribs = ' selected="selected"';
          setTheme = true;
        }
        $('<option value="'+theme+'"'+attribs+'>'+theme+'</option>').prependTo(self);
      };
      if (setTheme) {
        this.changeTheme({target: self});
      }
    },

    // Documentation: View mode
    //
    // Convert the documentation editor from an editable textarea to a div.  Use
    // Showdown to convert the markup to HTML.
    'markup': function(evt) {
      var
        self = $(evt.target),
        md   = self.val();
        html = this.markdown.makeHtml(md),
        e    = $('<div id="projectDocs" class="ui-widget-content ui-corner-all">');
      e.html(html);
      e.data('md', md);
      self.replaceWith(e);
    },

    // Documentation: Edit mode
    //
    // Convert the documentation to an editable text area.
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