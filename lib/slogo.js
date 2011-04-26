// # Slogo
// 
//    . .
//     \_\
//     (_ `.,--.__
//      \  (__.'  `.
//       `~~~~~~~~~~' ~~ ~~ ~~
//
// Slogo is a framework for wegGL.  It acts as a javascript interface for common
// WebGL tasks.

// ## The Slogo class
//
// _Note: it's wrapped in a closure like a protective layer of mucus_.
var Slogo = (function() {
  // ### Constructor function
  //
  // If we have an element reference then we use it, otherwise we use the first
  // canvas element on the page.  We fail _nicely_ if the browser doesn't
  // support WebGL.
  var slogo = function(canvas) {
    canvas = canvas || document.body.getElementsByTagName('canvas')[0];
    try {
      this.gl = canvas.getContext('experimental-webgl');
    }
    catch (error) {}
    if (! this.gl) {
      alert('Doh! Your browser doesn\'t support WebGL.\n\nTry one of the many others that do (i.e. Chrome, Firefox, Safari, Opera).');
    }
  };

  slogo.prototype = {
    // ### resizeTo
    //
    // Resizes the canvas and gl viewport.  Perfect for binding to
    // `window.onResize`.
    //
    //     resizeTo(x, y)
    //     resizeTo('css')
    resizeTo: function(x, y) {
      if (x == 'css') {
        x = this.gl.canvas.offsetWidth;
        y = this.gl.canvas.offsetHeight;
      }
      this.gl.canvas.width = x;
      this.gl.canvas.height = y;
      this.gl.viewport(0, 0, x, y);
      return this;
    },

    // ## Per Fragment Operations

    // ### blendColor
    //
    // Accepts colors in RGBA format
    //
    // `blendColor(r, g, b, a)`
    blendColor: function(r, g, b, a) {
      this.gl.blendColor(r, g, b, a);
    },

    // ### blendEquation
    //
    // An equation to use to blend the colors.  It accepts one of the modes
    // listed below.
    //
    // `blendEquation([modeRGB], [modeAlpha])`
    blendEquation: function() {
      
    },

    // ### blendFunc
    //
    // ?
    //
    // ``
    blendFunc: function() {
      
    },

    // ### blendFuncSeparate
    //
    // ?
    //
    // ``
    blendFuncSeparate: function() {
      
    },

    // ### depthFunc
    //
    // ?
    //
    // ``
    depthFunc: function() {
      
    },

    // ### sampleCoverage
    //
    // ?
    //
    // ``
    sampleCoverage: function() {
      
    },

    // ### stencilFunc
    //
    // ?
    //
    // ``
    stencilFunc: function() {
      
    },

    // ### stencileFuncSeparate
    //
    // ?
    //
    // ``
    stencileFuncSeparate: function() {
      
    },

    // ### stencilOp
    //
    // ?
    //
    // ``
    stencilOp: function() {
      
    },

    // ### stentileOpSeparate
    //
    // ?
    //
    // ``
    stentileOpSeparate: function() {
      
    },

    // ## Whole Framebuffer Operations

    // ### clear
    //
    // Specifies a mask to clear from the current framebuffer
    //
    // ``
    clear: function() {
      
    },

    // ### clearColor
    //
    // Defines the color used to clear a section of the framebuffer.
    //
    // ``
    clearColor: function() {
      
    },

    // ### clearDepth
    //
    // Defines the depth to traverse to when clearing
    //
    // ``
    clearDepth: function() {
      
    },

    // ### clearStencil
    //
    // ?
    //
    // ``
    clearStencil: function() {
      
    },

    // ### colorMask
    //
    // ?
    //
    // ``
    colorMask: function() {
      
    },

    // ### depthMask
    //
    // ?
    //
    // ``
    depthMask: function() {
      
    },

    // ### stencilMask
    //
    // ?
    //
    // ``
    stencilMask: function() {
      
    },

    // ### stencilMaskSeparate
    //
    // ?
    //
    // ``
    stencilMaskSeparate: function() {
      
    },

    // ## Buffer Objects

    // ### bindBuffer
    //
    // ?
    //
    // ``
    bindBuffer: function() {
      
    },

    // ### bufferData
    //
    // ?
    //
    // ``
    bufferData: function() {
      
    },

    // ### bufferSubData
    //
    // ?
    //
    // ``
    bufferSubData: function() {
      
    },

    // ### createBuffer
    //
    // ?
    //
    // ``
    createBuffer: function() {
      
    },

    // ### deleteBuffer
    //
    // ?
    //
    // ``
    deleteBuffer: function() {
      
    },

    // ### getBufferParameter
    //
    // ?
    //
    // ``
    getBufferParameter: function() {
      
    },

    // ### isBuffer
    //
    // ?
    //
    // ``
    isBuffer: function() {
      
    },

    // ## View and Clipping

    // ### depthRange
    //
    // ?
    //
    // ``
    depthRange: function() {
      
    },

    // ### scissor
    //
    // The scissor test for our framebuffer
    //
    // ``
    scissor: function() {
      
    },

    // ### viewport
    //
    // ?
    //
    // ``
    viewport: function() {
      
    },

    // ## Rasterization

    // ### cullFace
    //
    // ?
    //
    // ``
    cullFace: function() {
      
    },

    // ### frontFace
    //
    // ?
    //
    // ``
    frontFace: function() {
      
    },

    // ### lineWidth
    //
    // ?
    //
    // ``
    lineWidth: function() {
      
    },

    // ### polygonOffest
    //
    // ?
    //
    // ``
    polygonOffest: function() {
      
    },


  };



  return slogo();
}());