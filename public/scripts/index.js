$(document).ready(function() {
  var markdown = new Showdown.converter();

  var jss = {
    '#docs': function() {
      $(this).tabs();
    },
    '.markdown': function() {
      var
        self = $(this),
        md   = self.val();
        html = markdown.makeHtml(md),
        e    = $('<div class="ui-widget-content ui-corner-all" style="padding: 0.5em">');
      e.html(html);
      e.data('md', md);
      self.replaceWith(e);
    },
    // This is a clever hack from the internet.  It replaces any element with
    // the class "latex" with an image produced with the Google Chart API.
    'latex': function() {
      var
        self = $(this),
        textColor = rgbToHex($('.ui-widget-content').css('color')),
        img   = $('<img>').attr({
          'src': "http://chart.apis.google.com/chart?chco="+textColor+"&chf=bg,s,00000000&cht=tx&chl=" + encodeURIComponent(self.text()),
          'alt': 'A LaTeX equation'
        });
      self.replaceWith(img);
    },

    'pre code': function() {
      var self = $(this);
      self.addClass('ui-widget').addClass('ui-corner-all');
    },

    'abbr': function() {
      $(this).addClass('ui-state-highlight');
    }
  };

  $('body').jss(jss);
});