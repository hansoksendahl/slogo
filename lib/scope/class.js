exports.extends = function(child, parent) {
  for (var key in parent) {
    if (Object.prototype.hasOwnProperty.call(parent, key)) child[key] = parent[key];
  }
  var ctor = function() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__parent = parent.prototype;
  return child;
};