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

var nodes = {
  // Each statement in the block is returned as a separate element in an array.
  // We render each element in the array and join them.
  'Block': function(node) {
    var
      code          = [];
    for (var i = 0; i < node.value.length; i++) {
      var statement = render(node.value[i]);
      code.push(statement);
    };
    return code.join(';\n')+';\n';
  },
  // Convert boolean values to either true or false.
  'Boolean': function(node) {
    return (/yes|true/.test(node.value)) ? "true" : "false";
  },
  // Convert string literal values to... string literal values
  'Literal': function(node) {
    var rendered = render(node.value);
    return (node.parenthesis) ? '('+rendered+')' : rendered;
  },
  'String': function(node) {
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
  'Return': function(node) {
    return 'return '+render(node.value);
  },
  // This function handes both `let` and `set` style assignments
  'Assign': function(node) {
    var
      prefix = (node.newScope) ? 'var ': '',
      ids    = '';

    for (var i = 0; i < node.value.length; i++) {
      var value = node.value[i];
      ids += render(value[0])+' = '+render(value[1]);
      if (i < node.value.length - 1) { ids += ', ' }
    };
    return prefix+ids;
  },
  'ObjectLiteral': function(node) {
    var suffix = '';
    var prefix = render(node.object);
    if (node.member) {
      var rendered = render(node.member);
      if(node.proto) {
        rendered = '"'+rendered+'"'
      }
      suffix += '['+rendered+']';
    }
    return prefix+suffix;
  },
  'Object': function(node) {
    var values = [];
    for (var i = 0; i < node.value.length; i++) {
      var key = render(node.value[i][0]);
      if(node.value[i][0].name == "String") {
        key = '"'+key+'"'
      }
      var value = render(node.value[i][1]);
      values.push(key+': '+value)
    };
    return '{'+values.join(', ')+'}'
  },
  'Procedure': function(node) {
    var args = [];
    if(node.arguments && node.arguments.length > 0) {
      for (var i = 0; i < node.arguments.length; i++) {
        args.push(render(node.arguments[i]));
      };
    }
    args.push(render(node.value));
    return Function.constructor.apply(new Object(), args);
  },
  'BoundProcedure': function(node) {
    // var args = [];
    // for (var i = 0; i < node.value.length; i++) {
    //   args.push(render(node.value[i]));
    // };
    // return '__helper.Function.bind('+args.join(', ')+')';
  },
  'OpExpression': function(node) {
    return [render(node.value[0]), node.op, render(node.value[1])].join(' ');
  },
  'ProcedureCall': function(node) {
    var obj = render(node.object);
    var argList = [];
    if(node.arguments && node.arguments.length > 0) {
      for (var i = 0; i < node.arguments.length; i++) {
        argList.push(render(node.arguments[i]));
      };
    }
    if(node.isNew) { obj = 'new '+obj }
    return obj+'('+argList.join(', ')+')';
  },
  'Class': function(node) {
    var
      name = render(node.value[0]),
      blocks = node.value[1].value,
      methods = {name: "Object", value: []},
      constructor;
    for (var i = blocks.length - 1; i >= 0; i--) {
      var obj = blocks[i];
      if(obj.name == 'Assign') {
        var method = obj.value[0];
        if(method[0].value == 'constructor') {
          method[0] = name;
          constructor = method;
        }
        else {
          methods.value.push(method);
        }
      }
    };
    var out = render({name: "Assign", newScope: true, value: [constructor]});
    if(methods.value.length > 0) {
      out += ';'+render({name: "Assign", value: [[name+'.prototype', methods]]})
    }
    return out;
  }
};

var includes = [];

var render = exports.Node = function(node) {
  if (!node) {
    return "undefined";
  }
  if (nodes[node.name]) {
    return nodes[node.name](node);
  }
  else {
    return node;
  }
}