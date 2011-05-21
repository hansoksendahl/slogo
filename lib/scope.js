var preamble = {};
preamble.Math = require('./scope/math');
preamble.Logic = require('./scope/logic');
preamble.Class = require('./scope/class');

var parser = require('./grammar');

// ## SyntaxTable Class
//
// This class provides a simple symbol table interface where we can keep
// track of important variables related to the current parsing state.
//
// The syntax we track is the current className and methodName
var SyntaxTable = function() {
  this.table = [];
  this.push();
};

SyntaxTable.prototype = {
  'get': function(k) {
    return this.context[k];
  },

  'set': function(k,v) {
    this.context[k] = v;
    return this;
  },

  'pop': function() {
    this.table.pop();
    return this.setContext();
  },

  'push': function() {
    // Here we copy the previous state in the syntaxTable by creating then
    // parsing a JSON object.  This is totally cheating.  The JSON object only
    // exists in a modern browser we can't even imagine supporting legacy
    // browsers with this call
    var prev = (this.context) ? JSON.parse(JSON.stringify(this.context)) : {};
    this.table.push(prev);
    return this.setContext();
  },

  'setContext': function() {
    this.context = this.table[this.table.length - 1];
    return this;
  }
};

// The lexical scanning and parsing have been completed.  Now we take the
// parse tree returned from Jison and scan the JSON object returned.
//
// The Parser returns objects of the form:
//     # Default
//     {name: &lt;String&gt;, value: &lt;object&gt;}
//
// We take these objects and turn them into their javascript code equivalents.
// The resulting structure can then be `eval`ed or put into a `new Function`
// statement to be executed in the browser.

var Generator = function(node) {
  this.helpersPrefix = '__helpers';
  this.includes = {};
  this.includesCount = 0;
  // Keep track of the method name that we are currently in so we can render the
  // 
  this.syntaxTable = new SyntaxTable();
};

// Nodes are capitalized prototype functions.  Each Node in responsible for a
// specific Javascript generation task.
Generator.prototype = {
  // Generate a named node or return a string.
  'render': function(node) {
    if (!node) { return "undefined"; }
    if (this[node.name]) { return this[node.name](node); }
    else { return node; }
  },
  // Render any additional modules needed by our grammar.  This is where really
  // cool functionality becomes possible.  Like extended math functions and 
  // object oriented classes.
  //
  // Any object included in the preamble section above will be accessable via
  // a namespace attached to the helpersPrefix class variable.
  'renderIncludes': function() {
    var assigns = [
      {name: "Assign", newScope: true, value: [[this.helpersPrefix, '{}']]},
      {name: "Assign", value: []}
    ];

    for (key in this.includes) {
      var obj = this._ref(this.helpersPrefix, key);
      assigns[1].value.push([obj, '{}']);
      for (var i = this.includes[key].length -1; i >= 0; i--) {
        var method = this.includes[key][i]
        assigns[1].value.push([this._ref(obj, method), preamble[key][method]]);
      };
    }
    if(this.includesCount > 0) {
      return this.render({name: "Block", value: assigns});
    }
  },
  // Include an additional function with our preamble referenced by object and
  // function so we don't have to load an entire monolithic library.
  '_include': function(object, member) {
    if (this.includes[object] == undefined) {
      this.includes[object] = [];
    }
    if (this.includes[object][member] == undefined) {
      this.includesCount++;
      this.includes[object].push(member);
    }
  },
  // Hooking into the render function to render an Object Literal.
  '_ref': function(object, member) {
    return this.render({name: 'ObjectLiteral', proto: true, object: object, member: member});
  },
  // Return the name of a helper function.
  '_helper': function(object, member) {
    var obj = this._ref(this.helpersPrefix, object)
    return this._ref(obj, member);
  },
  // Include a math function in the program preamble and return a procedure
  // call to the named function.
  'MathLiteral': function(node) {
    node.name = 'Literal';
    if(node.extended) {
      this._include('Math', node.value);
      // return a reference to an extended Javascript math function
      node.value = this._helper('Math', node.value);
    }
    else {
      // return a reference to the Javascript Math object
      node.value = 'Math["'+node.value+'"]';
    }
    return this.render(node);
  },
  // Create a block (a list of statements) as either the program body or a
  // the body of a function.
  'Block': function(node) {
    var
      code          = [];
    for (var i = 0; i < node.value.length; i++) {
      var statement = this.render(node.value[i]);
      code.push(statement);
    };
    return code.join(';\n')+';\n';
  },
  // This function allows for the creation of Range data types.  Ranges are
  // Arrays with named entries [1..5] = [1, 2, 3, 4, 5]
  'Range': function(node) {
    var
      range = [],
      i     = node.value[0],
      l     = node.value[1]
    if (i < l) {
      if(node.exclusive) while(i < l) { range.push(i); i++ }
      else               while(i <= l) { range.push(i); i++ }
    }
    else {
      if(node.exclusive) while(i > l) { range.push(i); i-- }
      else               while(i >= l) { range.push(i); i-- }
    }
    return '['+range.join(', ')+']';
  },
  'ParentReference': function(node) {
    var parentRef = this._ref(this.syntaxTable.get('__className'), '__parent');
    return this._ref(parentRef, this.syntaxTable.get('__methodName'));
  },
  // Convert defined boolean values to either true or false.
  'Boolean': function(node) {
    return (/yes|true/.test(node.value)) ? "true" : "false";
  },
  // Convert string literal values to... string literal values
  'Literal': function(node) {
    var rendered = this.render(node.value);
    return (node.parenthesis) ? '('+rendered+')' : rendered;
  },
  // Convert string literal values to... string literal values
  'Number': function(node) {
    return this.render(node.value);
  },
  // Return a string
  'String': function(node) {
    if(node.value[0] == '"') {
      node.value = node.value.replace(/#{([^{}]*)}/g, function (a, b) {
        return '"+'+b.replace(/@/g, parser.parse(b))+'+"'
      });
    }
    return node.value;
  },
  'IfElse': function(node) {
    var
      a = this.render(node.value[0]),
      b = this.render(node.value[1]),
      c = node.value[2],
      out = '';
    if(node.ternary) {
      out += a+' ? '+b;
      if(c) out += ' : '+this.render(c);
    }
    else {
      out += 'if ('+a+') {'+b+'}'
      if(c) out += ' else {'+this.render(c)+'}'
    }
    return out;
  },
  // Create an array literal.
  'Array': function(node) {
    var arr = [];
    for (var i = 0; i < node.value.length; i++) {
      arr.push(this.render(node.value[i]));
    };
    return '['+arr.join(',')+']';
  },
  // Generate a `return` statement.
  'Return': function(node) {
    return 'return '+this.render(node.value);
  },
  // Generate a variable assignment.  Both `let` and `set` statements are
  // handled.
  'Assign': function(node) {
    var
      out      = (node.newScope) ? 'var ': '',
      joinChar = (node.newScope) ? ', ' : '; ',
      ids      = [],
      classIds = {name: 'Assign', value: []};

    for (var i = 0; i < node.value.length; i++) {
      var entry = node.value[i];
      var name = this.render(entry[0]);
      // If we're setting a function we want to push a new state on our state machine
      // to keep of things like the function name... since there is no reliable way to
      // return it in Javascript for anonymous functions.
      if (entry[1].name == 'Procedure') {
        this.syntaxTable.push().set('__methodName', 'constructor');
      }
      // Save the node to our syntax table
      this.syntaxTable.set(name, entry[1]);
      // get the value of this variable
      if(node.newScope && /^this/.test(name)) {
        classIds.value.push([name, entry[1]]);
      }
      else {
        ids.push(name+' = '+this.render(entry[1]));
      }
      // Pop a state back off the state machine
      if (entry[1].name == 'Procedure') this.syntaxTable.pop();
    };
    out += (node.value.length > 0) ? ids.join(joinChar) : '';
    out += (classIds.value.length > 0) ? ';'+this.render(classIds): '';
    return out;

  },
  // Reference a member of an object using strings to avoid collision with
  // Javascript keywords
  'ObjectLiteral': function(node) {
    var suffix = '';
    var prefix = this.render(node.object);
    if (node.member) {
      var rendered = this.render(node.member);
      if(
        node.proto
      ) rendered = '"'+rendered+'"';
      suffix += '['+rendered+']';
    }
    return prefix+suffix;
  },
  // Create a Javascript object literal.
  'Object': function(node) {
    var values = [];
    for (var i = 0; i < node.value.length; i++) {
      var key = this.render(node.value[i][0]);
      var value = this.render(node.value[i][1]);
      values.push(key+': '+value)
    };
    return '{'+values.join(', ')+'}'
  },
  // Create an anonymous Javascript procedure.
  'Procedure': function(node) {
    var args = [];
    if(node.arguments && node.arguments.length > 0) {
      for (var i = 0; i < node.arguments.length; i++) {
        args.push(this.render(node.arguments[i]));
      };
    }
    args.push(this.render(node.value));
    return Function.constructor.apply(new Object(), args);
  },
  // Generate an operator expression.
  'OpExpression': function(node) {
    var
      operandA = this.render(node.value[0]),
      operandB = this.render(node.value[1]);
    if(node.op == '!') {
      return '! '+operandB;
    }
    else {
      return [operandA, node.op, operandB].join(' ');
    }
  },
  // Generate a call to a defined procedure.
  'ProcedureCall': function(node) {
    var obj = this.render(node.object);
    var argList = [];
    if(node.arguments && node.arguments.length > 0) {
      for (var i = 0; i < node.arguments.length; i++) {
        argList.push(this.render(node.arguments[i]));
      };
    }
    if(node.isNew) { obj = 'new '+obj }
    return obj+'('+argList.join(', ')+')';
  },
  // Generate a Class
  'Class': function(node) {
    var
      name = this.render(node.value[0]),
      parent = this.parent,
      blocks = node.value[1].value,
      methods = [],
      constructor = [name, function() {}],
      classBlock = [];
    // So the parser thinks we're in a block but we're going to iterate through
    // like it's an object.
    //
    // We'll pluck off the constructor function and add the rest of the methods
    // to the class prototype.
    for (var i = blocks.length - 1; i >= 0; i--) {
      var obj = blocks[i];
      if(obj.name == 'Assign') {
        var method = obj.value[0];
        if(method[0].value == 'constructor') {
          method[0] = name;
          constructor = method;
        }
        else {
          method[0].value = this._ref(name+'.prototype', method[0].value);
          methods.push(method);
        }
      }
    };

    classBlock.push({name: "Assign", value: [constructor]});

    // Push a state on the syntax table and set the class name for the next
    // block of parent constructors
    this.syntaxTable.push().set('__className', name);

    // do we need to include the extends method?
    if(node.extends) {
      // Include the extends method
      this._include('Class', 'extends');
      // Construct a call to the extends method
      classBlock.push({
        name: 'ProcedureCall',
        object: this._helper('Class', 'extends'),
        arguments: [name, node.extends]
      });
    }


    if(methods.length > 0) {
      classBlock.push({name: "Assign", value: methods})
    }

    classBlock.push({name: "Return", value: name});
    var out = this.render({
      name: "Assign",
      newScope: true,
      value : [[name, {
        name: 'Literal',
        value: {
          name: 'ProcedureCall',
          object: {
            name: 'Procedure',
            value: {
              name: 'Block',
              value: classBlock
            }
          },
          arguments: []
        },
        parenthesis: true
      }]]
    });

    // pop a state off the syntax table
    this.syntaxTable.pop();

    return out;
  }
};

exports.Generator = Generator;