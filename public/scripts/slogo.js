// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// The Slogo class written in Slogo
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// # I love recursive definitions!
//
// class Slogo
//   to constructor |container|
//     set
//       @container = document.getElementById(container),
//       @renderer  = new THREE.WebGLRenderer(),
//       @scene     = new THREE.Scene(),
//       @camera    = new THREE.Camera(
//         80,
//         container.offsetWidth / container.offsetHeight,
//         1,
//         100
//       )
//     @renderer.setSize(
//       @container.offsetWidth,
//       @container.offsetHeight
//     )
//     @container.appendChild(@renderer.domElement)
//   end
//
//   to render
//     @renderer.render(@scene, @camera)
//   end
//
//   to animate
//     requestAnimationFrame(@bind('animate'))
//     @render()
//   end
//
//   to bind |method|
//     let self = @
//     <- to
//       self[method].apply(self, arguments)
//     end
//   end
// end


// The Javascript output for the Slogo class
var Slogo = (function () {
  Slogo = function (container) {
    container = container || 'universe'
    this["container"] = document["getElementById"](container);
    this["renderer"] = new THREE["WebGLRenderer"]();
    this["scene"] = new THREE["Scene"]();
    this["camera"] = new THREE["PerspectiveCamera"](80, container["offsetWidth"] / container["offsetHeight"], 1, 100);
    
    this["renderer"]["setSize"](this["container"]["offsetWidth"], this["container"]["offsetHeight"]);
    this["container"]["appendChild"](this["renderer"]["domElement"]);
  };

  Slogo.prototype["bind"] = function (method) {
    var self = this;
    return function () {
      self[method]["apply"](self, arguments);
    };
  };

  Slogo.prototype["animate"] = function (method) {
    if(method === undefined) { method = this.bind('animate'); };
    requestAnimationFrame(method);
    this.render();
  };

  Slogo.prototype["render"] = function () {
    this["renderer"]["render"](this["scene"], this["camera"]);
  };

  return Slogo;
}());