var Generators = {
  'Block': function(node) {
    var code = [];
    for (var i = 0; i < node.value.length; i++) {
      var n = node.value[i];
      code.push(render(n));
    };
    return code.join('\n');
  },
  'Boolean': function(node) {
    return node.value ? "true" : "false";
  },
  'Number': function(node) {
    return Number(node.value);
  },
  'Literal': function(node) {
    return node.value;
  },
  'Array': function(node) {
    var arr = [];
    for (var i = 0; i < node.value.length; i++) {
      arr.push(render(node.value[i]));
    };
    return '['+arr.join(',')+']';
  },
  'String': function(node) {
    return node.value;
  }
};

var render = function(node) {
  if (!node) {
    return "";
  }
  if (Generators[node.name]) {
    return Generators[node.name](node);
  }
  return JSON.stringify(node);
}

exports.generate = function(tree) {
  console.log(tree);
  return render(tree)
}