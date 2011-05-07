// The lexical scanning and parsing have been completed.  Now we take the
// parse tree returned from Jison and scan the JSON object returned.
//
// The Parser returns objects of the form:
//     # Default
//     {name: &lt;String&gt;, value: &lt;object&gt;}
//
// We take these objects and turn them into their javascript code equivalents.
// The resulting structure can then be `eval`ed or put into a `new Function`
// statement.

var Generators = {
  // Each statement in the block is returned as a separate element in an array.
  // We render each element in the array and join them.
  'Block': function(node) {
    var
      code          = [];
    for (var i = 0; i < node.value.length; i++) {
      var statement = render(node.value[i]);
      if(
        i == node.value.length - 1 &&
        /return/.test(statement) == false
      ) {
        statement = 'return '+statement;
      }
      code.push(statement);
    };
    return code.join(';\n')+';\n';
  },
  // Convert boolean values to either true or false.
  'Boolean': function(node) {
    return node.value ? "true" : "false";
  },
  // Convert string literal values to... string literal values
  'Literal': function(node) {
    return node.value;
  },
  // JSONify arrays
  'Array': function(node) {
    var arr = [];
    for (var i = 0; i < node.value.length; i++) {
      arr.push(render(node.value[i]));
    };
    return '['+arr.join(',')+']';
  },
  // This function handes both `let` and `set` style assignments
  'Assign': function(node) {
    var prefix = (node.newScope) ? 'var ': '';
    return prefix+node.id+' = '+render(node.value)
  },
  'Procedure': function(node) {
    var args = node.arguments || [];
    args.push(render(node.value));
    return Function.constructor.apply(new Object(), args);
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
  return render(tree)
}