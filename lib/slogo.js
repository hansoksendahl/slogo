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
			this.gl.blendEquation.apply(this.gl, arguments);
			return this;
		},

    // ### blendFunc
    //
    // ?
    //
    // ``
    blendFunc: function() {
			this.gl.blendFunc.apply(this.gl, arguments);
			return this;
		},

    // ### blendFuncSeparate
    //
    // ?
    //
    // ``
    blendFuncSeparate: function() {
			this.gl.blendFuncSeparate.apply(this.gl, arguments);
			return this;
		},

    // ### depthFunc
    //
    // ?
    //
    // ``
    depthFunc: function() {
			this.gl.depthFunc.apply(this.gl, arguments);
			return this;
		},

    // ### sampleCoverage
    //
    // ?
    //
    // ``
    sampleCoverage: function() {
			this.gl.sampleCoverage.apply(this.gl, arguments);
			return this;
		},

    // ### stencilFunc
    //
    // ?
    //
    // ``
    stencilFunc: function() {
			this.gl.stencilFunc.apply(this.gl, arguments);
			return this;
		},

    // ### stencileFuncSeparate
    //
    // ?
    //
    // ``
    stencileFuncSeparate: function() {
			this.gl.stencileFuncSeparate.apply(this.gl, arguments);
			return this;
		},

    // ### stencilOp
    //
    // ?
    //
    // ``
    stencilOp: function() {
			this.gl.stencilOp.apply(this.gl, arguments);
			return this;
		},

    // ### stentileOpSeparate
    //
    // ?
    //
    // ``
    stentileOpSeparate: function() {
			this.gl.stentileOpSeparate.apply(this.gl, arguments);
			return this;
		},

    // ## Whole Framebuffer Operations

    // ### clear
    //
    // Specifies a mask to clear from the current framebuffer
    //
    // ``
    clear: function() {
			this.gl.clear.apply(this.gl, arguments);
			return this;
		},

    // ### clearColor
    //
    // Defines the color used to clear a section of the framebuffer.
    //
    // ``
    clearColor: function() {
			this.gl.clearColor.apply(this.gl, arguments);
			return this;
		},

    // ### clearDepth
    //
    // Defines the depth to traverse to when clearing
    //
    // ``
    clearDepth: function() {
			this.gl.clearDepth.apply(this.gl, arguments);
			return this;
		},

    // ### clearStencil
    //
    // ?
    //
    // ``
    clearStencil: function() {
			this.gl.clearStencil.apply(this.gl, arguments);
			return this;
		},

    // ### colorMask
    //
    // ?
    //
    // ``
    colorMask: function() {
			this.gl.colorMask.apply(this.gl, arguments);
			return this;
		},

    // ### depthMask
    //
    // ?
    //
    // ``
    depthMask: function() {
			this.gl.depthMask.apply(this.gl, arguments);
			return this;
		},

    // ### stencilMask
    //
    // ?
    //
    // ``
    stencilMask: function() {
			this.gl.stencilMask.apply(this.gl, arguments);
			return this;
		},

    // ### stencilMaskSeparate
    //
    // ?
    //
    // ``
    stencilMaskSeparate: function() {
			this.gl.stencilMaskSeparate.apply(this.gl, arguments);
			return this;
		},

    // ## Buffer Objects

    // ### bindBuffer
    //
    // ?
    //
    // ``
    bindBuffer: function() {
			this.gl.bindBuffer.apply(this.gl, arguments);
			return this;
		},

    // ### bufferData
    //
    // ?
    //
    // ``
    bufferData: function() {
			this.gl.bufferData.apply(this.gl, arguments);
			return this;
		},

    // ### bufferSubData
    //
    // ?
    //
    // ``
    bufferSubData: function() {
			this.gl.bufferSubData.apply(this.gl, arguments);
			return this;
		},

    // ### createBuffer
    //
    // ?
    //
    // ``
    createBuffer: function() {
			this.gl.createBuffer.apply(this.gl, arguments);
			return this;
		},

    // ### deleteBuffer
    //
    // ?
    //
    // ``
    deleteBuffer: function() {
			this.gl.deleteBuffer.apply(this.gl, arguments);
			return this;
		},

    // ### getBufferParameter
    //
    // ?
    //
    // ``
    getBufferParameter: function() {
			this.gl.getBufferParameter.apply(this.gl, arguments);
			return this;
		},

    // ### isBuffer
    //
    // ?
    //
    // ``
    isBuffer: function() {
			this.gl.isBuffer.apply(this.gl, arguments);
			return this;
		},

    // ## View and Clipping

    // ### depthRange
    //
    // ?
    //
    // ``
    depthRange: function() {
			this.gl.depthRange.apply(this.gl, arguments);
			return this;
		},

    // ### scissor
    //
    // The scissor test for our framebuffer
    //
    // ``
    scissor: function() {
			this.gl.scissor.apply(this.gl, arguments);
			return this;
		},

    // ### viewport
    //
    // ?
    //
    // ``
    viewport: function() {
			this.gl.viewport.apply(this.gl, arguments);
			return this;
		},

    // ## Rasterization

    // ### cullFace
    //
    // ?
    //
    // ``
    cullFace: function() {
			this.gl.cullFace.apply(this.gl, arguments);
			return this;
		},

    // ### frontFace
    //
    // ?
    //
    // ``
    frontFace: function() {
			this.gl.frontFace.apply(this.gl, arguments);
			return this;
		},

    // ### lineWidth
    //
    // ?
    //
    // ``
    lineWidth: function() {
			this.gl.lineWidth.apply(this.gl, arguments);
			return this;
		},

    // ### polygonOffest
    //
    // ?
    //
    // ``
    polygonOffest: function() {
			this.gl.polygonOffest.apply(this.gl, arguments);
			return this;
		},

    // ## Programs and Shaders

    // ### attachShader
    //
    // ?
    //
    // ``
    attachShader: function() {
			this.gl.attachShader.apply(this.gl, arguments);
			return this;
		},

    // ### bindAttribLocation
    //
    // ?
    //
    // ``
    bindAttribLocation: function() {
			this.gl.bindAttribLocation.apply(this.gl, arguments);
			return this;
		},

    // ### compileShader
    //
    // ?
    //
    // ``
    compileShader: function() {
			this.gl.compileShader.apply(this.gl, arguments);
			return this;
		},

    // ### createProgram
    //
    // ?
    //
    // ``
    createProgram: function() {
			this.gl.createProgram.apply(this.gl, arguments);
			return this;
		},

    // ### createShader
    //
    // Description of the function
    //
    // ``
    createShader: function() {
			this.gl.createShader.apply(this.gl, arguments);
			return this;
		},

    // ### deleteProgram
    //
    // ?
    //
    // ``
    deleteProgram: function() {
			this.gl.deleteProgram.apply(this.gl, arguments);
			return this;
		},

    // ### deleteShader
    //
    // ?
    //
    // ``
    deleteShader: function() {
			this.gl.deleteShader.apply(this.gl, arguments);
			return this;
		},

    // ### detachShader
    //
    // ?
    //
    // ``
    detachShader: function() {
			this.gl.detachShader.apply(this.gl, arguments);
			return this;
		},

    // ### getAttachedShaders
    //
    // ?
    //
    // ``
    getAttachedShaders: function() {
			this.gl.getAttachedShaders.apply(this.gl, arguments);
			return this;
		},

    // ### getProgramParameter
    //
    // ?
    //
    // ``
    getProgramParameter: function() {
			this.gl.getProgramParameter.apply(this.gl, arguments);
			return this;
		},

    // ### getProgramInfoLog
    //
    // ?
    //
    // ``
    getProgramInfoLog: function() {
			this.gl.getProgramInfoLog.apply(this.gl, arguments);
			return this;
		},

    // ### getShaderParameter
    //
    // ?
    //
    // ``
    getShaderParameter: function() {
			this.gl.getShaderParameter.apply(this.gl, arguments);
			return this;
		},

    // ### getShaderInfoLog
    //
    // ?
    //
    // ``
    getShaderInfoLog: function() {
			this.gl.getShaderInfoLog.apply(this.gl, arguments);
			return this;
		},

    // ### getShaderSource
    //
    // ?
    //
    // ``
    getShaderSource: function() {
			this.gl.getShaderSource.apply(this.gl, arguments);
			return this;
		},

    // ### isProgram
    //
    // ?
    //
    // ``
    isProgram: function() {
			this.gl.isProgram.apply(this.gl, arguments);
			return this;
		},

    // ### isShader
    //
    // ?
    //
    // ``
    isShader: function() {
			this.gl.isShader.apply(this.gl, arguments);
			return this;
		},

    // ### linkProgram
    //
    // ?
    //
    // ``
    linkProgram: function() {
			this.gl.linkProgram.apply(this.gl, arguments);
			return this;
		},

    // ### shaderSource
    //
    // ?
    //
    // ``
    shaderSource: function() {
			this.gl.shaderSource.apply(this.gl, arguments);
			return this;
		},

    // ### useProgram
    //
    // ?
    //
    // ``
    useProgram: function() {
			this.gl.useProgram.apply(this.gl, arguments);
			return this;
		},

    // ### validateProgram
    //
    // ?
    //
    // ``
    validateProgram: function() {
			this.gl.validateProgram.apply(this.gl, arguments);
			return this;
		},

    // ## Uniforms and Attributes

    // ### disableVertexAttribArray
    //
    // ?
    //
    // ``
    disableVertexAttribArray: function() {
			this.gl.disableVertexAttribArray.apply(this.gl, arguments);
			return this;
		},

    // ### enableVertexAttribArray
    //
    // ?
    //
    // ``
    enableVertexAttribArray: function() {
			this.gl.enableVertexAttribArray.apply(this.gl, arguments);
			return this;
		},

    // ### getActiveAttrib
    //
    // ?
    //
    // ``
    getActiveAttrib: function() {
			this.gl.getActiveAttrib.apply(this.gl, arguments);
			return this;
		},

    // ### getActiveUniform
    //
    // ?
    //
    // ``
    getActiveUniform: function() {
			this.gl.getActiveUniform.apply(this.gl, arguments);
			return this;
		},

    // ### getAttribLocation
    //
    // ?
    //
    // ``
    getAttribLocation: function() {
			this.gl.getAttribLocation.apply(this.gl, arguments);
			return this;
		},

    // ### getUniform
    //
    // ?
    //
    // ``
    getUniform: function() {
			this.gl.getUniform.apply(this.gl, arguments);
			return this;
		},

    // ### getUniformLocation
    //
    // ?
    //
    // ``
    getUniformLocation: function() {
			this.gl.getUniformLocation.apply(this.gl, arguments);
			return this;
		},

    // ### getVertexAttrib
    //
    // ?
    //
    // ``
    getVertexAttrib: function() {
			this.gl.getVertexAttrib.apply(this.gl, arguments);
			return this;
		},

    // ### getVertexAttribOffset
    //
    // ?
    //
    // ``
    getVertexAttribOffset: function() {
			this.gl.getVertexAttribOffset.apply(this.gl, arguments);
			return this;
		},

    // ### vertexAttribPointer
    //
    // ?
    //
    // ``
    vertexAttribPointer: function() {
      this.gl.vertexAttribPointer.apply(this.gl, arguments);
      return this;
    },

    // ## Texture Objects
  };



  return slogo();
}());