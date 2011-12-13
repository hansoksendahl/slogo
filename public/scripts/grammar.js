/* Jison generated parser */
var parser = (function(){

// The preamble is an object containing various snippets of functionality which
// don't exist in Javascript.
//
// When a Slogo program is parsed the generator looks for keywords which require
// these extended functions.  If a match is found the corresponding function
// is prepended to the Javascript output.

var preamble = {};

// ## Class
preamble['Class'] = {
  // The `extend` function makes it possible to define a class which inherits
  // its prototype from a parent class.  This also sets the object member
  // `__parent` of the child class which let's us access the parent's protototype.
  'extend': function(child, parent) {
    for (var key in parent) {
      if (Object.prototype.hasOwnProperty.call(parent, key)) child[key] = parent[key];
    }
    var ctor = function() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__parent = parent.prototype;
    return child;
  }
};

preamble['Function'] = {
  'bind': function(scope, procedure) {
    return function() {
      return procedure.apply(scope, arguments);
    }
  }
}

// ## Array
preamble['Array'] = {
  // The `range` function creates an array of integers of fixed length and value.
  // Ranges come in two varieties inclusive and exclusive.  Inclusive ranges
  // create an array containing every integer between `i` and `l`.  Exclusive
  // ranges create an array containing every integer between `i` up to, but not
  // including `l`.
  'range': function(i, l, exclusive) {
    var range = [];
    if (i < l) {
      if(exclusive) { while(i < l) { range.push(i); i++; } }
      else          { while(i <= l) { range.push(i); i++; } }
    }
    else {
      if(exclusive) { while(i > l) { range.push(i); i--; } }
      else          { while(i >= l) { range.push(i); i--; } }
    }
    return range;
  }
};

// ## Math
preamble['Math'] = {
  // ### The Factorial Operator
  //
  // Returns the factorial of an integer.
  //
  // `[NUMBER]!`
  'factorial': function(n) {
    return n==0 ? 1 : arguments.callee(n-1) * n;
  },

  // ### The Percent Operator
  //
  // Converts a percentage to decimal notation.
  //
  // `[NUMBER]%`
  'percent': function(n) {
    return n / 100;
  },

  // ### Sum
  // 
  // Returns the result of several successive additive operations.
  //
  // `sum(args...)`
  'sum': function() {
    var
      args   = Array.prototype.slice.call(arguments);
      result = args.shift();
    for (var i = 0; i < args.length; i++) {
      result += args[i];
    };
    return result;
  },

  // ### Difference
  //
  // Returns the result of several successive subtractive operations.
  //
  // `difference(args...)`
  'difference': function() {
    var
      args   = Array.prototype.slice.call(arguments);
      result = args.shift();
    for (var i = 0; i < args.length; i++) {
      result -= args[i];
    };
    return result;
  },

  // ### Product
  //
  // Returns the result of several successive multiplicative operations.
  //
  // `product(args...)`
  'product': function() {
    var
      args   = Array.prototype.slice.call(arguments);
      result = args.shift();
    for (var i = 0; i < args.length; i++) {
      result *= args[i];
    };
    return result;
  },

  // ### Quotient
  //
  // Returns the result of several successive division operations.
  //
  // `quotient(args...)`
  //
  // _Remember: Friends don't let friends divide by zero._
  'quotient': function() {
    var
      args   = Array.prototype.slice.call(arguments);
      result = args.shift();
    for (var i = 0; i < args.length; i++) {
      result /= args[i];
    };
    return result;
  },

  // ## Mean function
  //
  // Returns the [mean](http://www.wolframalpha.com/input/?i=arithmetic+mean) of the input arguments.
  //
  // `mean(args...)`
  'mean': function() {
    var
      args   = Array.prototype.slice.call(arguments);
      result = args.shift();
    for (var i = 0; i < args.length; i++) {
      result += args[i];
    };
    return result / arguments.length;
  },

  // ## Median function
  //
  // Returns the [median](http://www.wolframalpha.com/input/?i=median) of the input arguments.
  //
  // `median(args...)`
  'median': function() {
    var
      args = Array.prototype.slice.call(arguments),
      h    = args.length / 2;
    args.sort();
    if (args.length % 2 == 1) {
      return args[Math.ceil(h)];
    }
    else {
      return (args[h] + args[h+1]) / 2;
    }
  },

  // ## Mode function
  //
  // Returns the [mode](http://www.wolframalpha.com/input/?i=mode&a=*C.mode-_*MathWorld-) of the input arguments.
  //
  // `mode(args...)`
  'mode': function() {
    var
      numList       = {},
      maxOccurences = 0;
    for (var i = arguments.length - 1; i >= 0; i--) {
      var num = arguments[i];
      numList[num] = numList[num] + 1 || 1;
      if (numList[num] > maxOccurences) maxOccurences = numList[num];
    };
    if(maxOccurences > 0) {
      var result = [];
      for (num in numList) {
        if (numList[num] == maxOccurences) { result.push(num) };
      }
      return result;
    }
  },

  // ## Range function
  //
  // `range(args...)`
  'range': function() {
    var i_max = Math.max.apply(this, arguments);
    var i_min = Math.min.apply(this, arguments);
    return i_max - i_min;
  },

  // ## RandomInt function
  //
  // `rnd 10` returns an integer between 0 and 9
  //
  // `rnd -10` returns an integer between 0 and -9
  'randomInt': function(i) {
    var f = (i >= 0) ? 'floor' : 'ceil'; 
    return Math[f](Math.random() * i);
  }
};

preamble['Logic'] = {
  // ## And bitwise / logic operator
  //
  //     a = true
  //     b = false
  //     a and b == false
  'and': function(a, b) {
    return (typeof a == 'number' && typeof b == 'number') ? a & b : a && b;
  },

  // ## Or bitwise / logic operator
  //
  //     a = true
  //     b = false
  //     a and b == true
  'or': function(a, b) {
    return (typeof a == 'number' && typeof b == 'number') ? a | b : a || b;
  },

  // ## Xor bitwise / logic operator
  //
  //     a = true
  //     b = false
  //     a xor b == true
  'xor': function(a, b) {
    if (typeof a == 'number' && typeof b == 'number') {
      return a ^ b;
    }
    else {
      return (a || b) && !(a && b);
    }
  }
};

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

    for (var key in this.includes) {
      if(this.includes.hasOwnProperty(key)) {
        var obj = this._ref(this.helpersPrefix, key);
        assigns[1].value.push([obj, '{}']);
        for (var i = this.includes[key].length -1; i >= 0; i--) {
          var method = this.includes[key][i];
          assigns[1].value.push([this._ref(obj, method), preamble[key][method]]);
        }
      }
    }
    if(this.includesCount > 0) {
      return this.render({name: "Block", value: assigns});
    }
  },
  // Include an additional function with our preamble referenced by object and
  // function so we don't have to load an entire monolithic library.
  '_include': function(object, member) {
    if (this.includes[object] === undefined) {
      this.includes[object] = [];
    }
    if (this.includes[object].indexOf(member)) {
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
    var obj = this._ref(this.helpersPrefix, object);
    return this._ref(obj, member);
  },
  '_helperCall': function(object, member, args) {
    this._include(object, member);
    return this.render({
      name: 'ProcedureCall',
      object: this._helper(object, member),
      args: args
    });
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
    }
    return code.join(';\n')+';\n';
  },
  // This function allows for the creation of Range data types.  Ranges are
  // Arrays with named entries [1..5] = [1, 2, 3, 4, 5]
  'Range': function(node) {
    var
      i     = this.render(node.value[0]),
      l     = this.render(node.value[1]);
    return this._helperCall('Array', 'range', [i, l, node.exclusive])
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
    // test the string for new lines    
    if(/\r|\n/.test(node.value)) {
      // strip the first new line
      node.value = node.value.replace(/^(["'])\r?\n/, '$1');
      // strip the last new line
      node.value = node.value.replace(/\r?\n(["'])$/, '$1');
      // replace newline literals with newline escaped characters
      node.value = node.value.replace(/\r?\n/g, '\\n');
    }
    if(node.value[0] == '"') {
      node.value = node.value.replace(/#\{([^{}]*)\}/g, function (a, b) {
        return '"+'+parser.parse(b).slice(0, -2)+'+"';
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
      if(c) { out += ' : '+this.render(c); }
    }
    else {
      out += 'if ('+a+') {'+b+'}';
      if(c) { out += ' else {'+this.render(c)+'}'; }
    }
    return out;
  },
  'Switch': function(node) {
    console.log(node.value[1]);
    var
      expression = this.render(node.value[0]),
      caseStatements = [];
    for(var i = 0; i < node.value[1].length; i++) {
      caseStatements.push(this.render(node.value[1][i]));
    }
    return 'switch('+expression+') {\n'+ caseStatements.join('') +'\n}';
  },
  'Case': function(node) {
    var out = (node['default']) ? 'default' : 'case';
    if(! node['default']) { out += ' '+this.render(node.value[0]); }
    out += ':\n';
    out += ' '+this.render(node.value[1])+';\n';
    out += 'break;\n';
    return out;
  },
  // Create an array literal.
  'Array': function(node) {
    var arr = [];
    for (var i = 0; i < node.value.length; i++) {
      arr.push(this.render(node.value[i]));
    }
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
      out      = '',
      joinChar = (node.newScope) ? ', ' : '; ',
      ids      = [],
      classIds = {name: 'Assign', value: []};

    for (var i = 0; i < node.value.length; i++) {
      var
        entry = node.value[i],
        name  = this.render(entry[0]),
        op    = entry[2] || '=';
      // If we're setting a function we want to push a new state on our state machine
      // to keep of things like the function name... since there is no reliable way to
      // return it in Javascript for anonymous functions.
      if (entry[1].name == 'Procedure') {
        var
          methodMatch = /\["(\w+)"\]$/.exec(name),
          methodName  = (methodMatch) ? methodMatch[1] : 'constructor'

        this.syntaxTable.push().set('__methodName', methodName);
      }
      // Save the node to our syntax table
      this.syntaxTable.set(name, entry[1]);
      // get the value of this variable
      if(
        node.newScope &&
        ( /^this/.test(name) || /[\.\[]/.test(name) || /\*|\/|\+|-/.test(op) )
      ) {
        classIds.value.push([name, entry[1], op]);
      }
      else {
        ids.push(name+' '+op+' '+this.render(entry[1]));
      }
      // Pop a state back off the state machine
      if (entry[1].name == 'Procedure') { this.syntaxTable.pop(); }
    }
    out += (node.newScope && ids.length > 0)             ? 'var '                : '';
    out += (ids.length > 0)                              ? ids.join(joinChar)    : '';
    out += (ids.length > 0 && classIds.value.length > 0) ? ';'                   : '';
    out += (classIds.value.length > 0)                   ? this.render(classIds) : '';
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
      ) { rendered = '"'+rendered+'"'; }
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
      values.push(key+': '+value);
    }
    return '{'+values.join(', ')+'}';
  },
  // Create an anonymous Javascript procedure.
  'Procedure': function(node) {
    var args = [];
    if(node.args !== undefined && node.args.length > 0) {
      for (var i = 0; i < node.args.length; i++) {
        args.push(this.render(node.args[i]));
      }
    }
    args.push(this.render(node.value));
    var f = Function.constructor.apply({}, args);
    f = (f+'').replace('anonymous', '');
    return (node.bound) ? this._helperCall('Function', 'bind', ['this', f]) : f;
  },
  // Generate an operator expression.
  'OpExpression': function(node) {
    var
      operandA = this.render(node.value[0]),
      operandB = this.render(node.value[1]);
    switch(node.op) {
      case '!':
        return '! '+operandB;
      case 'or':
        return this._helperCall('Logic', node.op, [operandA, operandB]);
      case 'xor':
        return this._helperCall('Logic', node.op, [operandA, operandB]);
      case 'and':
        return this._helperCall('Logic', node.op, [operandA, operandB]);
      default:
        return [operandA, node.op, operandB].join(' ');
    }
  },
  // Generate a call to a defined procedure.
  'ProcedureCall': function(node) {
    var obj = this.render(node.object);
    var argList = [];
    if(node.args && node.args.length > 0) {
      for (var i = 0; i < node.args.length; i++) {
        argList.push(this.render(node.args[i]));
      }
    }
    if(node.isNew) { obj = 'new '+obj; }
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
    }

    classBlock.push({name: "Assign", value: [constructor]});

    // Push a state on the syntax table and set the class name for the next
    // block of parent constructors
    this.syntaxTable.push().set('__className', name);

    // do we need to include the extends method?
    if(node.extend) {
      // Include the extends method
      this._include('Class', 'extend');
      // Construct a call to the extends method
      classBlock.push(
        this._helperCall('Class', 'extend', [name, node.extend])
      );
    }

    if(methods.length > 0) {
      classBlock.push({name: "Assign", value: methods});
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
          args: []
        },
        parenthesis: true
      }]]
    });

    // pop a state off the syntax table
    this.syntaxTable.pop();

    return out;
  }
};

var parser = {trace: function trace() { },
yy: {
  // Node is hook into our the Javascript generation function contained in
  // [scope.js](http://hansineffect.github.com/Slogo/docs/scope.html).
  'Node': function(node) {
    var generator = new Generator();
    var code = generator.render(node);
    var includes = generator.renderIncludes() || '';
    return includes + code;
  },
  // Literal returns the last segment of a string divided by either white-space
  // or the **at** symbol.
  'Literal': {
    'strip': function(str) {
      var name = /[\s\@](\w+)$/.exec(str)[1];
      return {name: "Literal", value: name};
    }
  },
  // Cheap way to convert **yes** to **true** and **no** to **false**
  'Type': {
    'Boolean': function(str) {
      return (/true|yes/).test(str);
  }   
  }
},

symbols_: {"error":2,"Nl":3,"NL":4,"Comma":5,",":6,"Proto":7,".":8,"Root":9,"Block":10,"EOF":11,"Block.Fragment":12,"Statement":13,"Statement.Definition":14,"Statement.Alteration":15,"Proc.Assignment":16,"Proc.Class":17,"Statement.Return":18,"Statement.Expression":19,"Statement.If":20,"Statement.Oneliner":21,"Statement.Definition.Oneliner":22,"Statement.Alteration.Oneliner":23,"Type.Literal":24,"TYPE.LITERAL":25,"Type.String":26,"TYPE.STRING":27,"Type.Number":28,"TYPE.NUMBER":29,"Type.Nil":30,"TYPE.NIL":31,"Type.Boolean":32,"TYPE.BOOLEAN":33,"Type.Object":34,"{":35,"}":36,"Object.List":37,"Object.Member":38,":":39,"Expression.Conditional":40,"Type.Array":41,"[":42,"RANGE.INCLUSIVE":43,"]":44,"RANGE.EXCLUSIVE":45,"Array.List":46,"Statement.Empty":47,"Expression.Conditional.Lambda":48,"VAR.DEFINITION":49,"Assignment.List":50,"Assignment.Member":51,"VAR.ALTERATION":52,"Expression.Left":53,"VAR.ASSIGN":54,"PROC.RETURN":55,"Type.Class.Literal":56,"OBJECT.MEMBER":57,"Expression.Literal":58,"Expression.Primary":59,"Expression.Primary.Lambda":60,"MATH.CONSTANT":61,"MATH.FUNCTION":62,"MATH.FUNCTION.EXT":63,"(":64,")":65,"OBJECT.THIS":66,"PROC.PARENT":67,"Expression.Prototype":68,"Expression.Reserved":69,"Expression.Member":70,"Proc.Anonymous":71,"Proc.Declaration":72,"PROC.NEW":73,"Proc.Arguments":74,"Expression.Member.Lambda":75,"LOGIC.AND":76,"LOGIC.OR":77,"LOGIC.XOR":78,"LOGIC.NOT":79,"MATH.MODULUS":80,"OBJECT.EXTEND":81,"Expression.New":82,"Expression.New.Lambda":83,"Expression.Call":84,"Expression.Call.Lambda":85,"Expression.Left.Lambda":86,"Logic.Unary":87,"Logic.Unary.Lambda":88,"Math.Unary":89,"MATH.FACTORIAL":90,"MATH.PERCENT":91,"Math.Unary.Lambda":92,"Math.Power":93,"MATH.POWER":94,"Math.Power.Lambda":95,"Math.Multiplicative":96,"MATH.MULTIPLICATIVE":97,"Math.Multiplicative.Lambda":98,"Math.Additive":99,"MATH.ADDITIVE":100,"Math.Additive.Lambda":101,"Math.Relational":102,"LOGIC.COMPARE":103,"Math.Relational.Lambda":104,"Math.Equality":105,"LOGIC.EQUALITY":106,"Math.Equality.Lambda":107,"Logic.And":108,"Logic.And.Lambda":109,"Logic.Xor":110,"Logic.Xor.Lambda":111,"Logic.Or":112,"Logic.Or.Lambda":113,"Statement.IfThen":114,"Statement.IfThenElse":115,"LOGIC.IF":116,"LOGIC.THEN":117,"If.Member":118,"LOGIC.ELSE":119,"PROC.END":120,"?":121,"PROC.NAMED":122,"Proc.FormalParameterList":123,"PROC.START":124,"|":125,"Proc.FormalParameters":126,"PROC.CLASS":127,"OBJECT.EXTENDS":128,"Proc.ArgumentList":129,"$accept":0,"$end":1},
terminals_: {2:"error",4:"NL",6:",",8:".",11:"EOF",25:"TYPE.LITERAL",27:"TYPE.STRING",29:"TYPE.NUMBER",31:"TYPE.NIL",33:"TYPE.BOOLEAN",35:"{",36:"}",39:":",42:"[",43:"RANGE.INCLUSIVE",44:"]",45:"RANGE.EXCLUSIVE",49:"VAR.DEFINITION",52:"VAR.ALTERATION",54:"VAR.ASSIGN",55:"PROC.RETURN",57:"OBJECT.MEMBER",61:"MATH.CONSTANT",62:"MATH.FUNCTION",63:"MATH.FUNCTION.EXT",64:"(",65:")",66:"OBJECT.THIS",67:"PROC.PARENT",72:"Proc.Declaration",73:"PROC.NEW",76:"LOGIC.AND",77:"LOGIC.OR",78:"LOGIC.XOR",79:"LOGIC.NOT",80:"MATH.MODULUS",81:"OBJECT.EXTEND",90:"MATH.FACTORIAL",91:"MATH.PERCENT",94:"MATH.POWER",97:"MATH.MULTIPLICATIVE",100:"MATH.ADDITIVE",103:"LOGIC.COMPARE",106:"LOGIC.EQUALITY",116:"LOGIC.IF",117:"LOGIC.THEN",119:"LOGIC.ELSE",120:"PROC.END",121:"?",122:"PROC.NAMED",124:"PROC.START",125:"|",127:"PROC.CLASS",128:"OBJECT.EXTENDS"},
productions_: [0,[3,1],[3,2],[5,2],[5,1],[5,2],[7,2],[7,1],[7,2],[9,3],[9,2],[10,1],[12,1],[12,2],[13,1],[13,1],[13,2],[13,2],[13,2],[13,2],[13,1],[21,1],[21,2],[21,1],[21,1],[21,1],[21,1],[24,1],[26,1],[28,1],[30,1],[32,1],[34,2],[34,3],[34,4],[34,4],[37,2],[37,1],[37,3],[38,3],[38,3],[38,3],[41,5],[41,5],[41,2],[41,3],[41,4],[46,2],[46,1],[46,3],[47,0],[47,1],[19,1],[14,3],[22,2],[15,3],[23,2],[50,2],[50,1],[50,3],[51,3],[18,2],[56,1],[58,1],[58,1],[58,1],[58,1],[58,1],[59,1],[60,1],[60,1],[60,1],[60,1],[60,1],[60,1],[60,3],[60,1],[60,1],[60,1],[68,2],[68,2],[70,1],[70,1],[70,1],[70,4],[70,3],[70,3],[70,3],[75,1],[75,4],[75,3],[75,3],[75,3],[69,1],[69,1],[69,1],[69,1],[69,1],[69,1],[69,1],[69,1],[69,1],[69,1],[69,1],[82,1],[83,1],[84,2],[84,2],[84,4],[84,3],[84,3],[85,2],[85,2],[85,4],[85,3],[85,3],[53,1],[53,1],[86,1],[86,1],[87,1],[87,2],[88,1],[88,2],[89,1],[89,2],[89,2],[92,1],[92,2],[92,2],[93,1],[93,3],[95,1],[95,3],[96,1],[96,3],[96,3],[98,1],[98,3],[98,3],[99,1],[99,3],[101,1],[101,3],[102,1],[102,3],[104,1],[104,3],[105,1],[105,3],[107,1],[107,3],[108,1],[108,3],[109,1],[109,3],[110,1],[110,3],[111,1],[111,3],[112,1],[112,3],[113,1],[113,3],[20,1],[20,1],[115,10],[115,9],[115,9],[115,8],[114,6],[114,7],[118,1],[118,1],[40,1],[40,5],[48,1],[48,5],[16,4],[16,3],[16,4],[16,5],[71,3],[71,4],[71,4],[71,5],[123,3],[126,1],[126,3],[17,4],[17,5],[74,2],[74,3],[74,4],[129,2],[129,1],[129,3]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:this.$ =$$[$0];
break;
case 2:this.$ =$$[$0-1];
break;
case 3:this.$ =$$[$0];
break;
case 4:this.$ =$$[$0];
break;
case 5:this.$ =$$[$0-1];
break;
case 6:this.$ =$$[$0];
break;
case 7:this.$ =$$[$0];
break;
case 8:this.$ =$$[$0-1];
break;
case 9:this.$ =$$[$0-1]; return yy.Node($$[$0-1]);
break;
case 10:this.$ =$$[$0-1]; return yy.Node($$[$0-1]);
break;
case 11:this.$ ={name: "Block", value: $$[$0]};
break;
case 12:this.$ =[$$[$0]];
break;
case 13:this.$ =$$[$0-1].concat($$[$0]);
break;
case 14:this.$ =$$[$0];
break;
case 15:this.$ =$$[$0];
break;
case 16:this.$ =$$[$0-1];
break;
case 17:this.$ =$$[$0-1];
break;
case 18:this.$ =$$[$0-1];
break;
case 19:this.$ =$$[$0-1];
break;
case 20:this.$ =$$[$0];
break;
case 21:this.$ =$$[$0];
break;
case 22:this.$ =$$[$0-1];
break;
case 23:this.$ =$$[$0];
break;
case 24:this.$ =$$[$0];
break;
case 25:this.$ =$$[$0];
break;
case 26:this.$ =$$[$0];
break;
case 27:this.$ ={name: "Literal", value: $$[$0]};
break;
case 28:this.$ ={name: "String", value: $$[$0]};
break;
case 29:this.$ ={name: "Number", value: $$[$0]};
break;
case 30:this.$ ={name: "Literal", value: "undefined"};
break;
case 31:this.$ ={name: "Boolean", value: $$[$0]};
break;
case 32:this.$ ={name: "Object", value: []};
break;
case 33:this.$ ={name: "Object", value: $$[$0-1]};
break;
case 34:this.$ ={name: "Object", value: $$[$0-2]};
break;
case 35:this.$ ={name: "Object", value: $$[$0-2]};
break;
case 36:this.$ =[$$[$0]];
break;
case 37:this.$ =[$$[$0]];
break;
case 38:this.$ =$$[$0-2]; this.$.push($$[$0]);
break;
case 39:this.$ =[$$[$0-2], $$[$0]];
break;
case 40:this.$ =[$$[$0-2], $$[$0]];
break;
case 41:this.$ =[$$[$0-2], $$[$0]];
break;
case 42:this.$ ={name: "Range", value: [$$[$0-3], $$[$0-1]]};
break;
case 43:this.$ ={name: "Range", exclusive: true, value: [$$[$0-3], $$[$0-1]]};
break;
case 44:this.$ ={name: "Array", value: []};
break;
case 45:this.$ ={name: "Array", value: $$[$0-1]};
break;
case 46:this.$ ={name: "Array", value: $$[$0-2]};
break;
case 47:this.$ =[$$[$0]];
break;
case 48:this.$ =[$$[$0]];
break;
case 49:this.$ =$$[$0-2].concat($$[$0]);
break;
case 50:this.$ =$$[$0];
break;
case 51:this.$ =$$[$0];
break;
case 52:this.$ =$$[$0];
break;
case 53:this.$ ={name: "Assign", value: $$[$0-1], newScope: true};
break;
case 54:this.$ ={name: "Assign", value: [$$[$0]]};
break;
case 55:this.$ ={name: "Assign", value: $$[$0-1]};
break;
case 56:this.$ ={name: "Assign", value: [$$[$0]]};
break;
case 57:this.$ =[$$[$0]];
break;
case 58:this.$ =[$$[$0]];
break;
case 59:this.$ =$$[$0-2]; this.$.push($$[$0]);
break;
case 60:this.$ =[$$[$0-2], $$[$0], $$[$0-1]];
break;
case 61:this.$ ={name: "Return", value: $$[$0]};
break;
case 62:this.$ ={name: "ObjectLiteral", object: "this", proto: true, member: yy.Literal.strip($$[$0])};
break;
case 63:this.$ =$$[$0];
break;
case 64:this.$ =$$[$0];
break;
case 65:this.$ =$$[$0];
break;
case 66:this.$ =$$[$0];
break;
case 67:this.$ =$$[$0];
break;
case 68:this.$ =$$[$0];
break;
case 69:this.$ ={name: "MathLiteral", value: $$[$0]};
break;
case 70:this.$ ={name: "MathLiteral", value: $$[$0]};
break;
case 71:this.$ ={name: "MathLiteral", extended: true, value: $$[$0]};
break;
case 72:this.$ =$$[$0];
break;
case 73:this.$ =$$[$0];
break;
case 74:this.$ =$$[$0];
break;
case 75:this.$ ={name: "Literal", parenthesis: true, value: $$[$0-1]};
break;
case 76:this.$ =$$[$0];
break;
case 77:this.$ ={name: "Literal", value: "this"};
break;
case 78:this.$ ={name: "ParentReference"};
break;
case 79:this.$ =$$[$0];
break;
case 80:this.$ =$$[$0];
break;
case 81:this.$ =$$[$0];
break;
case 82:this.$ =$$[$0];
break;
case 83:this.$ =$$[$0];
break;
case 84:this.$ ={name: "ObjectLiteral", object: $$[$0-3], member: $$[$0-1]};
break;
case 85:this.$ ={name: "ObjectLiteral", proto: true, object: $$[$0-2], member: $$[$0]};
break;
case 86:this.$ ={name: "ObjectLiteral", proto: true, object: $$[$0-2], member: $$[$0]};
break;
case 87:this.$ ={name: "ProcedureCall", isNew: true, object: $$[$0-1], args: $$[$0]};
break;
case 88:this.$ =$$[$0];
break;
case 89:this.$ ={name: "ObjectLiteral", object: $$[$0-3], member: $$[$0-1]};
break;
case 90:this.$ ={name: "ObjectLiteral", proto: true, object: $$[$0-2], member: $$[$0]};
break;
case 91:this.$ ={name: "ObjectLiteral", proto: true, object: $$[$0-2], member: $$[$0]};
break;
case 92:this.$ ={name: "ProcedureCall", isNew: true, object: $$[$0-1], args: $$[$0]};
break;
case 93:this.$ ={name: "Literal", value: $$[$0]};
break;
case 94:this.$ ={name: "Literal", value: $$[$0]};
break;
case 95:this.$ ={name: "Literal", value: $$[$0]};
break;
case 96:this.$ ={name: "Literal", value: $$[$0]};
break;
case 97:this.$ ={name: "Literal", value: $$[$0]};
break;
case 98:this.$ ={name: "Literal", value: $$[$0]};
break;
case 99:this.$ ={name: "Literal", value: $$[$0]};
break;
case 100:this.$ ={name: "Literal", value: $$[$0]};
break;
case 101:this.$ ={name: "Literal", value: $$[$0]};
break;
case 102:this.$ ={name: "Literal", value: $$[$0]};
break;
case 103:this.$ ={name: "Literal", value: $$[$0]};
break;
case 104:this.$ =$$[$0];
break;
case 105:this.$ =$$[$0];
break;
case 106:this.$ ={name: "ProcedureCall", object: $$[$0-1], args: $$[$0]};
break;
case 107:this.$ ={name: "ProcedureCall", object: $$[$0-1], args: $$[$0]};
break;
case 108:this.$ ={name: "ObjectLiteral, object: $$[$0-3], member: $$[$0-1]}"};
break;
case 109:this.$ ={name: "ObjectLiteral", proto: true, object: $$[$0-2], member: $$[$0]};
break;
case 110:this.$ ={name: "ObjectLiteral", proto: true, object: $$[$0-2], member: $$[$0]};
break;
case 111:this.$ ={name: "ProcedureCall", object: $$[$0-1], args: $$[$0]};
break;
case 112:this.$ ={name: "ProcedureCall", object: $$[$0-1], args: $$[$0]};
break;
case 113:this.$ ={name: "ObjectLiteral", object: $$[$0-3], member: $$[$0-1]};
break;
case 114:this.$ ={name: "ObjectLiteral", proto: true, object: $$[$0-2], member: $$[$0]};
break;
case 115:this.$ ={name: "ObjectLiteral", proto: true, object: $$[$0-2], member: $$[$0]};
break;
case 116:this.$ =$$[$0];
break;
case 117:this.$ =$$[$0];
break;
case 118:this.$ =$$[$0];
break;
case 119:this.$ =$$[$0];
break;
case 120:this.$ =$$[$0];
break;
case 121:this.$ ={name: "OpExpression", op: "!", value: [void(0), $$[$0]]};
break;
case 122:this.$ =$$[$0];
break;
case 123:this.$ ={name: "OpExpression", op: "!", value: [void(0), $$[$0]]};
break;
case 124:this.$ =$$[$0];
break;
case 125:this.$ ={name: "ProcedureCall", object: {name: "MathLiteral", extended: true, value: "factorial"}, args: [$$[$0-1]]};
break;
case 126:this.$ ={name: "Literal", parenthesis: true, value: {name: "OpExpression", op: "/", value: [$$[$0-1], 100]}};
break;
case 127:this.$ =$$[$0];
break;
case 128:this.$ ={name: "ProcedureCall", object: {name: "MathLiteral", extended: true, value: "factorial"}, args: [$$[$0-1]]};
break;
case 129:this.$ ={name: "Literal", parenthesis: true, value: {name: "OpExpression", op: "/", value: [$$[$0-1], 100]}};
break;
case 130:this.$ =$$[$0];
break;
case 131:this.$ ={name: "ProcedureCall", object: {name: "MathLiteral", value: "pow"}, args: [$$[$0-2], $$[$0]]};
break;
case 132:this.$ =$$[$0];
break;
case 133:this.$ ={name: "ProcedureCall", object: {name: "MathLiteral", value: "pow"}, args: [$$[$0-2], $$[$0]]};
break;
case 134:this.$ =$$[$0];
break;
case 135:this.$ ={name: "OpExpression", op: $$[$0-1], value: [$$[$0-2], $$[$0]]};
break;
case 136:this.$ ={name: "OpExpression", op: "%", value: [$$[$0-2], $$[$0]]};
break;
case 137:this.$ =$$[$0];
break;
case 138:this.$ ={name: "OpExpression", op: $$[$0-1], value: [$$[$0-2], $$[$0]]};
break;
case 139:this.$ ={name: "OpExpression", op: "%", value: [$$[$0-2], $$[$0]]};
break;
case 140:this.$ =$$[$0];
break;
case 141:this.$ ={name: "OpExpression", op: $$[$0-1], value: [$$[$0-2], $$[$0]]};
break;
case 142:this.$ =$$[$0];
break;
case 143:this.$ ={name: "OpExpression", op: $$[$0-1], value: [$$[$0-2], $$[$0]]};
break;
case 144:this.$ =$$[$0];
break;
case 145:this.$ ={name: "OpExpression", op: $$[$0-1], value: [$$[$0-2], $$[$0]]};
break;
case 146:this.$ =$$[$0];
break;
case 147:this.$ ={name: "OpExpression", op: $$[$0-1], value: [$$[$0-2], $$[$0]]};
break;
case 148:this.$ =$$[$0];
break;
case 149:this.$ ={name: "OpExpression", op: $$[$0-1], value: [$$[$0-2], $$[$0]]};
break;
case 150:this.$ =$$[$0];
break;
case 151:this.$ ={name: "OpExpression", op: $$[$0-1], value: [$$[$0-2], $$[$0]]};
break;
case 152:this.$ =$$[$0];
break;
case 153:this.$ ={name: "OpExpression", op: $$[$0-1], value: [$$[$0-2], $$[$0]]};
break;
case 154:this.$ =$$[$0];
break;
case 155:this.$ ={name: "OpExpression", op: $$[$0-1], value: [$$[$0-2], $$[$0]]};
break;
case 156:this.$ =$$[$0];
break;
case 157:this.$ ={name: "OpExpression", op: $$[$0-1], value: [$$[$0-2], $$[$0]]};
break;
case 158:this.$ =$$[$0];
break;
case 159:this.$ ={name: "OpExpression", op: $$[$0-1], value: [$$[$0-2], $$[$0]]};
break;
case 160:this.$ =$$[$0];
break;
case 161:this.$ ={name: "OpExpression", op: $$[$0-1], value: [$$[$0-2], $$[$0]]};
break;
case 162:this.$ =$$[$0];
break;
case 163:this.$ ={name: "OpExpression", op: $$[$0-1], value: [$$[$0-2], $$[$0]]};
break;
case 164:this.$ =$$[$0];
break;
case 165:this.$ =$$[$0];
break;
case 166:this.$ ={name: "IfElse", value: [$$[$0-8], $$[$0-5], $$[$0-2]]};
break;
case 167:this.$ ={name: "IfElse", value: [$$[$0-7], $$[$0-5], $$[$0-2]]};
break;
case 168:this.$ ={name: "IfElse", value: [$$[$0-7], $$[$0-4], $$[$0-2]]};
break;
case 169:this.$ ={name: "IfElse", value: [$$[$0-6], $$[$0-4], $$[$0-2]]};
break;
case 170:this.$ ={name: "IfElse", value: [$$[$0-4], $$[$0-2], null]};
break;
case 171:this.$ ={name: "IfElse", value: [$$[$0-5], $$[$0-2], null]};
break;
case 172:this.$ =$$[$0];
break;
case 173:this.$ =$$[$0];
break;
case 174:this.$ =$$[$0];
break;
case 175:this.$ ={name: "IfElse", ternary: true, value: [$$[$0-4], $$[$0-2], $$[$0]]};
break;
case 176:this.$ =$$[$0];
break;
case 177:this.$ ={name: "IfElse", ternary: true, value: [$$[$0-4], $$[$0-2], $$[$0]]};
break;
case 178:this.$ ={name: "Assign", newScope: true, value: [[yy.Literal.strip($$[$0-3]), {name: "Procedure", value: $$[$0-1]}]]};
break;
case 179:this.$ ={name: "Assign", newScope: true, value: [[yy.Literal.strip($$[$0-2]), {name: "Procedure", value: $$[$0-1]}]]};
break;
case 180:this.$ ={name: "Assign", newScope: true, value: [[yy.Literal.strip($$[$0-3]), {name: "Procedure", value: $$[$0-1], args: $$[$0-2]}]]};
break;
case 181:this.$ ={name: "Assign", newScope: true, value: [[yy.Literal.strip($$[$0-4]), {name: "Procedure", value: $$[$0-1], args: $$[$0-3]}]]};
break;
case 182:this.$ ={name: "Procedure", value: $$[$0-1]};
break;
case 183:this.$ ={name: "Procedure", value: $$[$0-1]};
break;
case 184:this.$ ={name: "Procedure", value: $$[$0-1], args: $$[$0-2]};
break;
case 185:this.$ ={name: "Procedure", value: $$[$0-1], args: $$[$0-3]};
break;
case 186:this.$ =$$[$0-1];
break;
case 187:this.$ =[$$[$0]];
break;
case 188:this.$ =$$[$0-2].concat($$[$0]);
break;
case 189:this.$ ={name: "Class", value: [yy.Literal.strip($$[$0-3]), $$[$0-1]]};
break;
case 190:this.$ ={name: "Class", value: [yy.Literal.strip($$[$0-4]), $$[$0-1]], extend: yy.Literal.strip($$[$0-3])};
break;
case 191:this.$ =[];
break;
case 192:this.$ =$$[$0-1];
break;
case 193:this.$ =$$[$0-2];
break;
case 194:this.$ =[$$[$0]];
break;
case 195:this.$ =[$$[$0]];
break;
case 196:this.$ =$$[$0-2].concat($$[$0]);
break;
}
},
table: [{3:2,4:[1,4],9:1,10:3,12:5,13:6,14:7,15:8,16:9,17:10,18:11,19:12,20:13,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,14],52:[1,15],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,114:20,115:21,116:[1,23],122:[1,16],127:[1,17]},{1:[3]},{4:[1,64],10:63,12:5,13:6,14:7,15:8,16:9,17:10,18:11,19:12,20:13,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,14],52:[1,15],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,114:20,115:21,116:[1,23],122:[1,16],127:[1,17]},{11:[1,65]},{4:[2,1],6:[2,1],11:[2,1],25:[2,1],27:[2,1],29:[2,1],31:[2,1],33:[2,1],35:[2,1],36:[2,1],42:[2,1],44:[2,1],49:[2,1],52:[2,1],55:[2,1],57:[2,1],61:[2,1],62:[2,1],63:[2,1],64:[2,1],65:[2,1],66:[2,1],67:[2,1],72:[2,1],73:[2,1],79:[2,1],116:[2,1],119:[2,1],120:[2,1],122:[2,1],124:[2,1],127:[2,1]},{11:[2,11],13:66,14:7,15:8,16:9,17:10,18:11,19:12,20:13,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,14],52:[1,15],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,114:20,115:21,116:[1,23],119:[2,11],120:[2,11],122:[1,16],127:[1,17]},{11:[2,12],25:[2,12],27:[2,12],29:[2,12],31:[2,12],33:[2,12],35:[2,12],42:[2,12],49:[2,12],52:[2,12],55:[2,12],57:[2,12],61:[2,12],62:[2,12],63:[2,12],64:[2,12],66:[2,12],67:[2,12],73:[2,12],79:[2,12],116:[2,12],119:[2,12],120:[2,12],122:[2,12],127:[2,12]},{11:[2,14],25:[2,14],27:[2,14],29:[2,14],31:[2,14],33:[2,14],35:[2,14],42:[2,14],49:[2,14],52:[2,14],55:[2,14],57:[2,14],61:[2,14],62:[2,14],63:[2,14],64:[2,14],66:[2,14],67:[2,14],73:[2,14],79:[2,14],116:[2,14],119:[2,14],120:[2,14],122:[2,14],127:[2,14]},{11:[2,15],25:[2,15],27:[2,15],29:[2,15],31:[2,15],33:[2,15],35:[2,15],42:[2,15],49:[2,15],52:[2,15],55:[2,15],57:[2,15],61:[2,15],62:[2,15],63:[2,15],64:[2,15],66:[2,15],67:[2,15],73:[2,15],79:[2,15],116:[2,15],119:[2,15],120:[2,15],122:[2,15],127:[2,15]},{3:67,4:[1,4]},{3:68,4:[1,4]},{3:69,4:[1,4]},{3:70,4:[1,4]},{11:[2,20],25:[2,20],27:[2,20],29:[2,20],31:[2,20],33:[2,20],35:[2,20],42:[2,20],49:[2,20],52:[2,20],55:[2,20],57:[2,20],61:[2,20],62:[2,20],63:[2,20],64:[2,20],66:[2,20],67:[2,20],73:[2,20],79:[2,20],116:[2,20],119:[2,20],120:[2,20],122:[2,20],127:[2,20]},{3:72,4:[1,4],24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],50:71,51:73,53:74,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],82:75,84:76,124:[1,83]},{3:72,4:[1,4],24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],50:84,51:73,53:74,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],82:75,84:76,124:[1,83]},{3:85,4:[1,4],16:88,17:89,18:90,19:91,21:86,22:92,23:93,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,95],52:[1,96],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,122:[1,16],123:87,125:[1,94],127:[1,17]},{3:97,4:[1,4],128:[1,98]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:99,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{4:[2,52],119:[2,52],120:[2,52]},{11:[2,164],25:[2,164],27:[2,164],29:[2,164],31:[2,164],33:[2,164],35:[2,164],42:[2,164],49:[2,164],52:[2,164],55:[2,164],57:[2,164],61:[2,164],62:[2,164],63:[2,164],64:[2,164],66:[2,164],67:[2,164],73:[2,164],79:[2,164],116:[2,164],119:[2,164],120:[2,164],122:[2,164],127:[2,164]},{11:[2,165],25:[2,165],27:[2,165],29:[2,165],31:[2,165],33:[2,165],35:[2,165],42:[2,165],49:[2,165],52:[2,165],55:[2,165],57:[2,165],61:[2,165],62:[2,165],63:[2,165],64:[2,165],66:[2,165],67:[2,165],73:[2,165],79:[2,165],116:[2,165],119:[2,165],120:[2,165],122:[2,165],127:[2,165]},{4:[2,176],77:[1,113],119:[2,176],120:[2,176],121:[1,112]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:114,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{4:[2,162],77:[2,162],78:[1,115],119:[2,162],120:[2,162],121:[2,162]},{4:[2,158],76:[1,116],77:[2,158],78:[2,158],119:[2,158],120:[2,158],121:[2,158]},{4:[2,154],76:[2,154],77:[2,154],78:[2,154],106:[1,117],119:[2,154],120:[2,154],121:[2,154]},{4:[2,150],76:[2,150],77:[2,150],78:[2,150],103:[1,118],106:[2,150],119:[2,150],120:[2,150],121:[2,150]},{4:[2,146],76:[2,146],77:[2,146],78:[2,146],100:[1,119],103:[2,146],106:[2,146],119:[2,146],120:[2,146],121:[2,146]},{4:[2,142],76:[2,142],77:[2,142],78:[2,142],80:[1,121],97:[1,120],100:[2,142],103:[2,142],106:[2,142],119:[2,142],120:[2,142],121:[2,142]},{4:[2,137],76:[2,137],77:[2,137],78:[2,137],80:[2,137],94:[1,122],97:[2,137],100:[2,137],103:[2,137],106:[2,137],119:[2,137],120:[2,137],121:[2,137]},{4:[2,132],76:[2,132],77:[2,132],78:[2,132],80:[2,132],90:[1,123],91:[1,124],94:[2,132],97:[2,132],100:[2,132],103:[2,132],106:[2,132],119:[2,132],120:[2,132],121:[2,132]},{4:[2,127],76:[2,127],77:[2,127],78:[2,127],80:[2,127],90:[2,127],91:[2,127],94:[2,127],97:[2,127],100:[2,127],103:[2,127],106:[2,127],119:[2,127],120:[2,127],121:[2,127]},{4:[2,122],76:[2,122],77:[2,122],78:[2,122],80:[2,122],90:[2,122],91:[2,122],94:[2,122],97:[2,122],100:[2,122],103:[2,122],106:[2,122],119:[2,122],120:[2,122],121:[2,122]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:125},{4:[2,118],76:[2,118],77:[2,118],78:[2,118],80:[2,118],90:[2,118],91:[2,118],94:[2,118],97:[2,118],100:[2,118],103:[2,118],106:[2,118],119:[2,118],120:[2,118],121:[2,118]},{4:[2,119],8:[1,128],42:[1,127],64:[1,129],74:126,76:[2,119],77:[2,119],78:[2,119],80:[2,119],90:[2,119],91:[2,119],94:[2,119],97:[2,119],100:[2,119],103:[2,119],106:[2,119],119:[2,119],120:[2,119],121:[2,119]},{4:[2,105],8:[1,132],42:[1,131],64:[1,129],74:130,76:[2,105],77:[2,105],78:[2,105],80:[2,105],90:[2,105],91:[2,105],94:[2,105],97:[2,105],100:[2,105],103:[2,105],106:[2,105],119:[2,105],120:[2,105],121:[2,105]},{4:[2,88],8:[2,88],42:[2,88],64:[2,88],76:[2,88],77:[2,88],78:[2,88],80:[2,88],90:[2,88],91:[2,88],94:[2,88],97:[2,88],100:[2,88],103:[2,88],106:[2,88],119:[2,88],120:[2,88],121:[2,88]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:133},{4:[2,69],6:[2,69],8:[2,69],36:[2,69],39:[2,69],42:[2,69],43:[2,69],44:[2,69],45:[2,69],54:[2,69],64:[2,69],65:[2,69],76:[2,69],77:[2,69],78:[2,69],80:[2,69],90:[2,69],91:[2,69],94:[2,69],97:[2,69],100:[2,69],103:[2,69],106:[2,69],117:[2,69],119:[2,69],120:[2,69],121:[2,69]},{4:[2,70],6:[2,70],8:[2,70],36:[2,70],39:[2,70],42:[2,70],43:[2,70],44:[2,70],45:[2,70],54:[2,70],64:[2,70],65:[2,70],76:[2,70],77:[2,70],78:[2,70],80:[2,70],90:[2,70],91:[2,70],94:[2,70],97:[2,70],100:[2,70],103:[2,70],106:[2,70],117:[2,70],119:[2,70],120:[2,70],121:[2,70]},{4:[2,71],6:[2,71],8:[2,71],36:[2,71],39:[2,71],42:[2,71],43:[2,71],44:[2,71],45:[2,71],54:[2,71],64:[2,71],65:[2,71],76:[2,71],77:[2,71],78:[2,71],80:[2,71],90:[2,71],91:[2,71],94:[2,71],97:[2,71],100:[2,71],103:[2,71],106:[2,71],117:[2,71],119:[2,71],120:[2,71],121:[2,71]},{4:[2,72],6:[2,72],8:[2,72],36:[2,72],39:[2,72],42:[2,72],43:[2,72],44:[2,72],45:[2,72],54:[2,72],64:[2,72],65:[2,72],76:[2,72],77:[2,72],78:[2,72],80:[2,72],90:[2,72],91:[2,72],94:[2,72],97:[2,72],100:[2,72],103:[2,72],106:[2,72],117:[2,72],119:[2,72],120:[2,72],121:[2,72]},{4:[2,73],6:[2,73],8:[2,73],36:[2,73],39:[2,73],42:[2,73],43:[2,73],44:[2,73],45:[2,73],54:[2,73],64:[2,73],65:[2,73],76:[2,73],77:[2,73],78:[2,73],80:[2,73],90:[2,73],91:[2,73],94:[2,73],97:[2,73],100:[2,73],103:[2,73],106:[2,73],117:[2,73],119:[2,73],120:[2,73],121:[2,73]},{4:[2,74],6:[2,74],8:[2,74],36:[2,74],39:[2,74],42:[2,74],43:[2,74],44:[2,74],45:[2,74],54:[2,74],64:[2,74],65:[2,74],76:[2,74],77:[2,74],78:[2,74],80:[2,74],90:[2,74],91:[2,74],94:[2,74],97:[2,74],100:[2,74],103:[2,74],106:[2,74],117:[2,74],119:[2,74],120:[2,74],121:[2,74]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:134,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{4:[2,76],6:[2,76],8:[2,76],36:[2,76],39:[2,76],42:[2,76],43:[2,76],44:[2,76],45:[2,76],54:[2,76],64:[2,76],65:[2,76],76:[2,76],77:[2,76],78:[2,76],80:[2,76],90:[2,76],91:[2,76],94:[2,76],97:[2,76],100:[2,76],103:[2,76],106:[2,76],117:[2,76],119:[2,76],120:[2,76],121:[2,76]},{4:[2,77],6:[2,77],8:[2,77],36:[2,77],39:[2,77],42:[2,77],43:[2,77],44:[2,77],45:[2,77],54:[2,77],64:[2,77],65:[2,77],76:[2,77],77:[2,77],78:[2,77],80:[2,77],90:[2,77],91:[2,77],94:[2,77],97:[2,77],100:[2,77],103:[2,77],106:[2,77],117:[2,77],119:[2,77],120:[2,77],121:[2,77]},{4:[2,78],6:[2,78],8:[2,78],36:[2,78],39:[2,78],42:[2,78],43:[2,78],44:[2,78],45:[2,78],54:[2,78],64:[2,78],65:[2,78],76:[2,78],77:[2,78],78:[2,78],80:[2,78],90:[2,78],91:[2,78],94:[2,78],97:[2,78],100:[2,78],103:[2,78],106:[2,78],117:[2,78],119:[2,78],120:[2,78],121:[2,78]},{4:[2,63],6:[2,63],8:[2,63],36:[2,63],39:[2,63],42:[2,63],43:[2,63],44:[2,63],45:[2,63],54:[2,63],64:[2,63],65:[2,63],76:[2,63],77:[2,63],78:[2,63],80:[2,63],90:[2,63],91:[2,63],94:[2,63],97:[2,63],100:[2,63],103:[2,63],106:[2,63],117:[2,63],119:[2,63],120:[2,63],121:[2,63]},{4:[2,64],6:[2,64],8:[2,64],36:[2,64],39:[2,64],42:[2,64],43:[2,64],44:[2,64],45:[2,64],54:[2,64],64:[2,64],65:[2,64],76:[2,64],77:[2,64],78:[2,64],80:[2,64],90:[2,64],91:[2,64],94:[2,64],97:[2,64],100:[2,64],103:[2,64],106:[2,64],117:[2,64],119:[2,64],120:[2,64],121:[2,64]},{4:[2,65],6:[2,65],8:[2,65],36:[2,65],39:[2,65],42:[2,65],43:[2,65],44:[2,65],45:[2,65],54:[2,65],64:[2,65],65:[2,65],76:[2,65],77:[2,65],78:[2,65],80:[2,65],90:[2,65],91:[2,65],94:[2,65],97:[2,65],100:[2,65],103:[2,65],106:[2,65],117:[2,65],119:[2,65],120:[2,65],121:[2,65]},{4:[2,66],6:[2,66],8:[2,66],36:[2,66],39:[2,66],42:[2,66],43:[2,66],44:[2,66],45:[2,66],54:[2,66],64:[2,66],65:[2,66],76:[2,66],77:[2,66],78:[2,66],80:[2,66],90:[2,66],91:[2,66],94:[2,66],97:[2,66],100:[2,66],103:[2,66],106:[2,66],117:[2,66],119:[2,66],120:[2,66],121:[2,66]},{4:[2,67],6:[2,67],8:[2,67],36:[2,67],39:[2,67],42:[2,67],43:[2,67],44:[2,67],45:[2,67],54:[2,67],64:[2,67],65:[2,67],76:[2,67],77:[2,67],78:[2,67],80:[2,67],90:[2,67],91:[2,67],94:[2,67],97:[2,67],100:[2,67],103:[2,67],106:[2,67],117:[2,67],119:[2,67],120:[2,67],121:[2,67]},{3:137,4:[1,4],24:139,25:[1,62],26:141,27:[1,61],28:140,29:[1,60],36:[1,135],37:136,38:138},{3:145,4:[1,4],24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:142,41:45,42:[1,56],44:[1,143],46:144,53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{4:[2,62],6:[2,62],8:[2,62],36:[2,62],39:[2,62],42:[2,62],43:[2,62],44:[2,62],45:[2,62],54:[2,62],64:[2,62],65:[2,62],76:[2,62],77:[2,62],78:[2,62],80:[2,62],90:[2,62],91:[2,62],94:[2,62],97:[2,62],100:[2,62],103:[2,62],106:[2,62],117:[2,62],119:[2,62],120:[2,62],121:[2,62]},{4:[2,30],6:[2,30],8:[2,30],36:[2,30],39:[2,30],42:[2,30],43:[2,30],44:[2,30],45:[2,30],54:[2,30],64:[2,30],65:[2,30],76:[2,30],77:[2,30],78:[2,30],80:[2,30],90:[2,30],91:[2,30],94:[2,30],97:[2,30],100:[2,30],103:[2,30],106:[2,30],117:[2,30],119:[2,30],120:[2,30],121:[2,30]},{4:[2,31],6:[2,31],8:[2,31],36:[2,31],39:[2,31],42:[2,31],43:[2,31],44:[2,31],45:[2,31],54:[2,31],64:[2,31],65:[2,31],76:[2,31],77:[2,31],78:[2,31],80:[2,31],90:[2,31],91:[2,31],94:[2,31],97:[2,31],100:[2,31],103:[2,31],106:[2,31],117:[2,31],119:[2,31],120:[2,31],121:[2,31]},{4:[2,29],6:[2,29],8:[2,29],36:[2,29],39:[2,29],42:[2,29],43:[2,29],44:[2,29],45:[2,29],54:[2,29],64:[2,29],65:[2,29],76:[2,29],77:[2,29],78:[2,29],80:[2,29],90:[2,29],91:[2,29],94:[2,29],97:[2,29],100:[2,29],103:[2,29],106:[2,29],117:[2,29],119:[2,29],120:[2,29],121:[2,29]},{4:[2,28],6:[2,28],8:[2,28],36:[2,28],39:[2,28],42:[2,28],43:[2,28],44:[2,28],45:[2,28],54:[2,28],64:[2,28],65:[2,28],76:[2,28],77:[2,28],78:[2,28],80:[2,28],90:[2,28],91:[2,28],94:[2,28],97:[2,28],100:[2,28],103:[2,28],106:[2,28],117:[2,28],119:[2,28],120:[2,28],121:[2,28]},{4:[2,27],6:[2,27],8:[2,27],36:[2,27],39:[2,27],42:[2,27],43:[2,27],44:[2,27],45:[2,27],54:[2,27],64:[2,27],65:[2,27],76:[2,27],77:[2,27],78:[2,27],80:[2,27],90:[2,27],91:[2,27],94:[2,27],97:[2,27],100:[2,27],103:[2,27],106:[2,27],117:[2,27],119:[2,27],120:[2,27],121:[2,27],125:[2,27]},{11:[1,146]},{4:[2,2],6:[2,2],11:[2,2],25:[2,2],27:[2,2],29:[2,2],31:[2,2],33:[2,2],35:[2,2],36:[2,2],42:[2,2],44:[2,2],49:[2,2],52:[2,2],55:[2,2],57:[2,2],61:[2,2],62:[2,2],63:[2,2],64:[2,2],65:[2,2],66:[2,2],67:[2,2],72:[2,2],73:[2,2],79:[2,2],116:[2,2],119:[2,2],120:[2,2],122:[2,2],124:[2,2],127:[2,2]},{1:[2,10]},{11:[2,13],25:[2,13],27:[2,13],29:[2,13],31:[2,13],33:[2,13],35:[2,13],42:[2,13],49:[2,13],52:[2,13],55:[2,13],57:[2,13],61:[2,13],62:[2,13],63:[2,13],64:[2,13],66:[2,13],67:[2,13],73:[2,13],79:[2,13],116:[2,13],119:[2,13],120:[2,13],122:[2,13],127:[2,13]},{4:[1,64],11:[2,16],25:[2,16],27:[2,16],29:[2,16],31:[2,16],33:[2,16],35:[2,16],42:[2,16],49:[2,16],52:[2,16],55:[2,16],57:[2,16],61:[2,16],62:[2,16],63:[2,16],64:[2,16],66:[2,16],67:[2,16],73:[2,16],79:[2,16],116:[2,16],119:[2,16],120:[2,16],122:[2,16],127:[2,16]},{4:[1,64],11:[2,17],25:[2,17],27:[2,17],29:[2,17],31:[2,17],33:[2,17],35:[2,17],42:[2,17],49:[2,17],52:[2,17],55:[2,17],57:[2,17],61:[2,17],62:[2,17],63:[2,17],64:[2,17],66:[2,17],67:[2,17],73:[2,17],79:[2,17],116:[2,17],119:[2,17],120:[2,17],122:[2,17],127:[2,17]},{4:[1,64],11:[2,18],25:[2,18],27:[2,18],29:[2,18],31:[2,18],33:[2,18],35:[2,18],42:[2,18],49:[2,18],52:[2,18],55:[2,18],57:[2,18],61:[2,18],62:[2,18],63:[2,18],64:[2,18],66:[2,18],67:[2,18],73:[2,18],79:[2,18],116:[2,18],119:[2,18],120:[2,18],122:[2,18],127:[2,18]},{4:[1,64],11:[2,19],25:[2,19],27:[2,19],29:[2,19],31:[2,19],33:[2,19],35:[2,19],42:[2,19],49:[2,19],52:[2,19],55:[2,19],57:[2,19],61:[2,19],62:[2,19],63:[2,19],64:[2,19],66:[2,19],67:[2,19],73:[2,19],79:[2,19],116:[2,19],119:[2,19],120:[2,19],122:[2,19],127:[2,19]},{3:147,4:[1,4],5:148,6:[1,149]},{4:[1,64],24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],51:150,53:74,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],82:75,84:76,124:[1,83]},{4:[2,58],6:[2,58]},{54:[1,151]},{4:[2,116],6:[2,116],36:[2,116],39:[2,116],43:[2,116],44:[2,116],45:[2,116],54:[2,116],65:[2,116],76:[2,116],77:[2,116],78:[2,116],80:[2,116],90:[2,116],91:[2,116],94:[2,116],97:[2,116],100:[2,116],103:[2,116],106:[2,116],117:[2,116],119:[2,116],120:[2,116],121:[2,116]},{4:[2,117],6:[2,117],8:[1,154],36:[2,117],39:[2,117],42:[1,153],43:[2,117],44:[2,117],45:[2,117],54:[2,117],64:[1,129],65:[2,117],74:152,76:[2,117],77:[2,117],78:[2,117],80:[2,117],90:[2,117],91:[2,117],94:[2,117],97:[2,117],100:[2,117],103:[2,117],106:[2,117],117:[2,117],119:[2,117],120:[2,117],121:[2,117]},{4:[2,104],6:[2,104],8:[1,157],36:[2,104],39:[2,104],42:[1,156],43:[2,104],44:[2,104],45:[2,104],54:[2,104],64:[1,129],65:[2,104],74:155,76:[2,104],77:[2,104],78:[2,104],80:[2,104],90:[2,104],91:[2,104],94:[2,104],97:[2,104],100:[2,104],103:[2,104],106:[2,104],117:[2,104],119:[2,104],120:[2,104],121:[2,104]},{4:[2,81],6:[2,81],8:[2,81],36:[2,81],39:[2,81],42:[2,81],43:[2,81],44:[2,81],45:[2,81],54:[2,81],64:[2,81],65:[2,81],76:[2,81],77:[2,81],78:[2,81],80:[2,81],90:[2,81],91:[2,81],94:[2,81],97:[2,81],100:[2,81],103:[2,81],106:[2,81],117:[2,81],119:[2,81],120:[2,81],121:[2,81]},{4:[2,82],6:[2,82],8:[2,82],36:[2,82],39:[2,82],42:[2,82],43:[2,82],44:[2,82],45:[2,82],54:[2,82],64:[2,82],65:[2,82],76:[2,82],77:[2,82],78:[2,82],80:[2,82],90:[2,82],91:[2,82],94:[2,82],97:[2,82],100:[2,82],103:[2,82],106:[2,82],117:[2,82],119:[2,82],120:[2,82],121:[2,82]},{4:[2,83],6:[2,83],8:[2,83],36:[2,83],39:[2,83],42:[2,83],43:[2,83],44:[2,83],45:[2,83],54:[2,83],64:[2,83],65:[2,83],76:[2,83],77:[2,83],78:[2,83],80:[2,83],90:[2,83],91:[2,83],94:[2,83],97:[2,83],100:[2,83],103:[2,83],106:[2,83],117:[2,83],119:[2,83],120:[2,83],121:[2,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:158,71:79,72:[1,80],73:[1,81],124:[1,83]},{4:[2,68],6:[2,68],8:[2,68],36:[2,68],39:[2,68],42:[2,68],43:[2,68],44:[2,68],45:[2,68],54:[2,68],64:[2,68],65:[2,68],76:[2,68],77:[2,68],78:[2,68],80:[2,68],90:[2,68],91:[2,68],94:[2,68],97:[2,68],100:[2,68],103:[2,68],106:[2,68],117:[2,68],119:[2,68],120:[2,68],121:[2,68]},{3:160,4:[1,4],16:88,17:89,18:90,19:91,21:159,22:92,23:93,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,95],52:[1,96],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,122:[1,16],123:161,125:[1,94],127:[1,17]},{3:162,4:[1,4],5:148,6:[1,149]},{4:[1,64],10:163,12:5,13:6,14:7,15:8,16:9,17:10,18:11,19:12,20:13,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,14],52:[1,15],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,114:20,115:21,116:[1,23],122:[1,16],127:[1,17]},{120:[1,164]},{3:166,4:[1,4],16:88,17:89,18:90,19:91,21:165,22:92,23:93,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,95],52:[1,96],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,122:[1,16],127:[1,17]},{119:[2,21],120:[2,21]},{3:167,4:[1,4]},{119:[2,23],120:[2,23]},{119:[2,24],120:[2,24]},{119:[2,25],120:[2,25]},{119:[2,26],120:[2,26]},{24:169,25:[1,62],126:168},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],51:170,53:74,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],82:75,84:76,124:[1,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],51:171,53:74,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],82:75,84:76,124:[1,83]},{4:[1,64],10:172,12:5,13:6,14:7,15:8,16:9,17:10,18:11,19:12,20:13,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,14],52:[1,15],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,114:20,115:21,116:[1,23],122:[1,16],127:[1,17]},{3:173,4:[1,4]},{4:[2,61],119:[2,61],120:[2,61]},{4:[2,174],6:[2,174],36:[2,174],39:[2,174],43:[2,174],44:[2,174],45:[2,174],65:[2,174],77:[1,175],117:[2,174],119:[2,174],120:[2,174],121:[1,174]},{4:[2,160],6:[2,160],36:[2,160],39:[2,160],43:[2,160],44:[2,160],45:[2,160],65:[2,160],77:[2,160],78:[1,176],117:[2,160],119:[2,160],120:[2,160],121:[2,160]},{4:[2,156],6:[2,156],36:[2,156],39:[2,156],43:[2,156],44:[2,156],45:[2,156],65:[2,156],76:[1,177],77:[2,156],78:[2,156],117:[2,156],119:[2,156],120:[2,156],121:[2,156]},{4:[2,152],6:[2,152],36:[2,152],39:[2,152],43:[2,152],44:[2,152],45:[2,152],65:[2,152],76:[2,152],77:[2,152],78:[2,152],106:[1,178],117:[2,152],119:[2,152],120:[2,152],121:[2,152]},{4:[2,148],6:[2,148],36:[2,148],39:[2,148],43:[2,148],44:[2,148],45:[2,148],65:[2,148],76:[2,148],77:[2,148],78:[2,148],103:[1,179],106:[2,148],117:[2,148],119:[2,148],120:[2,148],121:[2,148]},{4:[2,144],6:[2,144],36:[2,144],39:[2,144],43:[2,144],44:[2,144],45:[2,144],65:[2,144],76:[2,144],77:[2,144],78:[2,144],100:[1,180],103:[2,144],106:[2,144],117:[2,144],119:[2,144],120:[2,144],121:[2,144]},{4:[2,140],6:[2,140],36:[2,140],39:[2,140],43:[2,140],44:[2,140],45:[2,140],65:[2,140],76:[2,140],77:[2,140],78:[2,140],80:[1,182],97:[1,181],100:[2,140],103:[2,140],106:[2,140],117:[2,140],119:[2,140],120:[2,140],121:[2,140]},{4:[2,134],6:[2,134],36:[2,134],39:[2,134],43:[2,134],44:[2,134],45:[2,134],65:[2,134],76:[2,134],77:[2,134],78:[2,134],80:[2,134],94:[1,183],97:[2,134],100:[2,134],103:[2,134],106:[2,134],117:[2,134],119:[2,134],120:[2,134],121:[2,134]},{4:[2,130],6:[2,130],36:[2,130],39:[2,130],43:[2,130],44:[2,130],45:[2,130],65:[2,130],76:[2,130],77:[2,130],78:[2,130],80:[2,130],90:[1,184],91:[1,185],94:[2,130],97:[2,130],100:[2,130],103:[2,130],106:[2,130],117:[2,130],119:[2,130],120:[2,130],121:[2,130]},{4:[2,124],6:[2,124],36:[2,124],39:[2,124],43:[2,124],44:[2,124],45:[2,124],65:[2,124],76:[2,124],77:[2,124],78:[2,124],80:[2,124],90:[2,124],91:[2,124],94:[2,124],97:[2,124],100:[2,124],103:[2,124],106:[2,124],117:[2,124],119:[2,124],120:[2,124],121:[2,124]},{4:[2,120],6:[2,120],36:[2,120],39:[2,120],43:[2,120],44:[2,120],45:[2,120],65:[2,120],76:[2,120],77:[2,120],78:[2,120],80:[2,120],90:[2,120],91:[2,120],94:[2,120],97:[2,120],100:[2,120],103:[2,120],106:[2,120],117:[2,120],119:[2,120],120:[2,120],121:[2,120]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:186,124:[1,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:187,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:188},{117:[1,189]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:190},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:191},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:192},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:193},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:194},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:195},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:196},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:197},{4:[2,128],76:[2,128],77:[2,128],78:[2,128],80:[2,128],90:[2,128],91:[2,128],94:[2,128],97:[2,128],100:[2,128],103:[2,128],106:[2,128],119:[2,128],120:[2,128],121:[2,128]},{4:[2,129],76:[2,129],77:[2,129],78:[2,129],80:[2,129],90:[2,129],91:[2,129],94:[2,129],97:[2,129],100:[2,129],103:[2,129],106:[2,129],119:[2,129],120:[2,129],121:[2,129]},{4:[2,123],76:[2,123],77:[2,123],78:[2,123],80:[2,123],90:[2,123],91:[2,123],94:[2,123],97:[2,123],100:[2,123],103:[2,123],106:[2,123],119:[2,123],120:[2,123],121:[2,123]},{4:[2,112],8:[2,112],42:[2,112],64:[2,112],76:[2,112],77:[2,112],78:[2,112],80:[2,112],90:[2,112],91:[2,112],94:[2,112],97:[2,112],100:[2,112],103:[2,112],106:[2,112],119:[2,112],120:[2,112],121:[2,112]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:198,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{24:199,25:[1,62],49:[1,204],52:[1,203],61:[1,201],62:[1,202],67:[1,211],69:200,76:[1,205],77:[1,206],78:[1,207],79:[1,208],80:[1,209],81:[1,210]},{4:[1,214],24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:215,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],65:[1,212],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83],129:213},{4:[2,111],8:[2,111],42:[2,111],64:[2,111],76:[2,111],77:[2,111],78:[2,111],80:[2,111],90:[2,111],91:[2,111],94:[2,111],97:[2,111],100:[2,111],103:[2,111],106:[2,111],119:[2,111],120:[2,111],121:[2,111]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:216,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{24:217,25:[1,62],49:[1,204],52:[1,203],61:[1,201],62:[1,202],67:[1,211],69:218,76:[1,205],77:[1,206],78:[1,207],79:[1,208],80:[1,209],81:[1,210]},{8:[1,132],42:[1,131],64:[1,129],74:219},{65:[1,220]},{4:[2,32],6:[2,32],8:[2,32],36:[2,32],39:[2,32],42:[2,32],43:[2,32],44:[2,32],45:[2,32],54:[2,32],64:[2,32],65:[2,32],76:[2,32],77:[2,32],78:[2,32],80:[2,32],90:[2,32],91:[2,32],94:[2,32],97:[2,32],100:[2,32],103:[2,32],106:[2,32],117:[2,32],119:[2,32],120:[2,32],121:[2,32]},{3:223,4:[1,4],5:222,6:[1,149],36:[1,221]},{4:[1,64],24:139,25:[1,62],26:141,27:[1,61],28:140,29:[1,60],38:224},{4:[2,37],6:[2,37],36:[2,37]},{39:[1,225]},{39:[1,226]},{39:[1,227]},{4:[2,48],6:[2,48],43:[1,228],44:[2,48],45:[1,229]},{4:[2,44],6:[2,44],8:[2,44],36:[2,44],39:[2,44],42:[2,44],43:[2,44],44:[2,44],45:[2,44],54:[2,44],64:[2,44],65:[2,44],76:[2,44],77:[2,44],78:[2,44],80:[2,44],90:[2,44],91:[2,44],94:[2,44],97:[2,44],100:[2,44],103:[2,44],106:[2,44],117:[2,44],119:[2,44],120:[2,44],121:[2,44]},{3:231,4:[1,4],5:232,6:[1,149],44:[1,230]},{4:[1,64],24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:233,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{1:[2,9]},{4:[1,64],6:[1,234],11:[2,53],25:[2,53],27:[2,53],29:[2,53],31:[2,53],33:[2,53],35:[2,53],42:[2,53],49:[2,53],52:[2,53],55:[2,53],57:[2,53],61:[2,53],62:[2,53],63:[2,53],64:[2,53],66:[2,53],67:[2,53],73:[2,53],79:[2,53],116:[2,53],119:[2,53],120:[2,53],122:[2,53],127:[2,53]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],51:235,53:74,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],82:75,84:76,124:[1,83]},{3:236,4:[1,4],25:[2,4],27:[2,4],29:[2,4],31:[2,4],33:[2,4],35:[2,4],36:[2,4],42:[2,4],57:[2,4],61:[2,4],62:[2,4],63:[2,4],64:[2,4],66:[2,4],67:[2,4],72:[2,4],73:[2,4],79:[2,4],124:[2,4]},{4:[2,57],6:[2,57]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:237,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{4:[2,107],6:[2,107],8:[2,107],36:[2,107],39:[2,107],42:[2,107],43:[2,107],44:[2,107],45:[2,107],54:[2,107],64:[2,107],65:[2,107],76:[2,107],77:[2,107],78:[2,107],80:[2,107],90:[2,107],91:[2,107],94:[2,107],97:[2,107],100:[2,107],103:[2,107],106:[2,107],117:[2,107],119:[2,107],120:[2,107],121:[2,107]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:238,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{24:239,25:[1,62],49:[1,204],52:[1,203],61:[1,201],62:[1,202],67:[1,211],69:240,76:[1,205],77:[1,206],78:[1,207],79:[1,208],80:[1,209],81:[1,210]},{4:[2,106],6:[2,106],8:[2,106],36:[2,106],39:[2,106],42:[2,106],43:[2,106],44:[2,106],45:[2,106],54:[2,106],64:[2,106],65:[2,106],76:[2,106],77:[2,106],78:[2,106],80:[2,106],90:[2,106],91:[2,106],94:[2,106],97:[2,106],100:[2,106],103:[2,106],106:[2,106],117:[2,106],119:[2,106],120:[2,106],121:[2,106]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:241,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{24:242,25:[1,62],49:[1,204],52:[1,203],61:[1,201],62:[1,202],67:[1,211],69:243,76:[1,205],77:[1,206],78:[1,207],79:[1,208],80:[1,209],81:[1,210]},{8:[1,157],42:[1,156],64:[1,129],74:244},{120:[1,245]},{4:[1,64],10:246,12:5,13:6,14:7,15:8,16:9,17:10,18:11,19:12,20:13,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,14],52:[1,15],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,114:20,115:21,116:[1,23],122:[1,16],127:[1,17]},{3:248,4:[1,4],16:88,17:89,18:90,19:91,21:247,22:92,23:93,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,95],52:[1,96],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,122:[1,16],127:[1,17]},{4:[1,64],6:[1,234],11:[2,55],25:[2,55],27:[2,55],29:[2,55],31:[2,55],33:[2,55],35:[2,55],42:[2,55],49:[2,55],52:[2,55],55:[2,55],57:[2,55],61:[2,55],62:[2,55],63:[2,55],64:[2,55],66:[2,55],67:[2,55],73:[2,55],79:[2,55],116:[2,55],119:[2,55],120:[2,55],122:[2,55],127:[2,55]},{120:[1,249]},{4:[2,179],119:[2,179],120:[2,179]},{120:[1,250]},{4:[1,64],10:251,12:5,13:6,14:7,15:8,16:9,17:10,18:11,19:12,20:13,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,14],52:[1,15],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,114:20,115:21,116:[1,23],122:[1,16],127:[1,17]},{4:[1,64],119:[2,22],120:[2,22]},{3:254,4:[1,4],5:253,6:[1,149],125:[1,252]},{4:[2,187],6:[2,187],125:[2,187]},{119:[2,54],120:[2,54]},{119:[2,56],120:[2,56]},{120:[1,255]},{4:[1,64],10:256,12:5,13:6,14:7,15:8,16:9,17:10,18:11,19:12,20:13,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,14],52:[1,15],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,114:20,115:21,116:[1,23],122:[1,16],127:[1,17]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:257,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:258,124:[1,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:259,124:[1,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:260,124:[1,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:261,124:[1,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:262,124:[1,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:263,124:[1,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:264,124:[1,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:265,124:[1,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:266,124:[1,83]},{4:[2,125],6:[2,125],36:[2,125],39:[2,125],43:[2,125],44:[2,125],45:[2,125],65:[2,125],76:[2,125],77:[2,125],78:[2,125],80:[2,125],90:[2,125],91:[2,125],94:[2,125],97:[2,125],100:[2,125],103:[2,125],106:[2,125],117:[2,125],119:[2,125],120:[2,125],121:[2,125]},{4:[2,126],6:[2,126],36:[2,126],39:[2,126],43:[2,126],44:[2,126],45:[2,126],65:[2,126],76:[2,126],77:[2,126],78:[2,126],80:[2,126],90:[2,126],91:[2,126],94:[2,126],97:[2,126],100:[2,126],103:[2,126],106:[2,126],117:[2,126],119:[2,126],120:[2,126],121:[2,126]},{4:[2,121],6:[2,121],36:[2,121],39:[2,121],43:[2,121],44:[2,121],45:[2,121],65:[2,121],76:[2,121],77:[2,121],78:[2,121],80:[2,121],90:[2,121],91:[2,121],94:[2,121],97:[2,121],100:[2,121],103:[2,121],106:[2,121],117:[2,121],119:[2,121],120:[2,121],121:[2,121]},{39:[1,267]},{4:[2,163],77:[2,163],78:[1,115],119:[2,163],120:[2,163],121:[2,163]},{3:269,4:[1,4],16:88,17:89,18:90,19:91,21:268,22:92,23:93,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,95],52:[1,96],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,122:[1,16],127:[1,17]},{4:[2,159],76:[1,116],77:[2,159],78:[2,159],119:[2,159],120:[2,159],121:[2,159]},{4:[2,155],76:[2,155],77:[2,155],78:[2,155],106:[1,117],119:[2,155],120:[2,155],121:[2,155]},{4:[2,151],76:[2,151],77:[2,151],78:[2,151],103:[1,118],106:[2,151],119:[2,151],120:[2,151],121:[2,151]},{4:[2,147],76:[2,147],77:[2,147],78:[2,147],100:[1,119],103:[2,147],106:[2,147],119:[2,147],120:[2,147],121:[2,147]},{4:[2,143],76:[2,143],77:[2,143],78:[2,143],80:[1,121],97:[1,120],100:[2,143],103:[2,143],106:[2,143],119:[2,143],120:[2,143],121:[2,143]},{4:[2,138],76:[2,138],77:[2,138],78:[2,138],80:[2,138],94:[1,122],97:[2,138],100:[2,138],103:[2,138],106:[2,138],119:[2,138],120:[2,138],121:[2,138]},{4:[2,139],76:[2,139],77:[2,139],78:[2,139],80:[2,139],94:[1,122],97:[2,139],100:[2,139],103:[2,139],106:[2,139],119:[2,139],120:[2,139],121:[2,139]},{4:[2,133],76:[2,133],77:[2,133],78:[2,133],80:[2,133],90:[1,123],91:[1,124],94:[2,133],97:[2,133],100:[2,133],103:[2,133],106:[2,133],119:[2,133],120:[2,133],121:[2,133]},{44:[1,270]},{4:[2,114],8:[2,114],42:[2,114],64:[2,114],76:[2,114],77:[2,114],78:[2,114],80:[2,114],90:[2,114],91:[2,114],94:[2,114],97:[2,114],100:[2,114],103:[2,114],106:[2,114],119:[2,114],120:[2,114],121:[2,114]},{4:[2,115],8:[2,115],42:[2,115],64:[2,115],76:[2,115],77:[2,115],78:[2,115],80:[2,115],90:[2,115],91:[2,115],94:[2,115],97:[2,115],100:[2,115],103:[2,115],106:[2,115],119:[2,115],120:[2,115],121:[2,115]},{4:[2,93],6:[2,93],8:[2,93],36:[2,93],39:[2,93],42:[2,93],43:[2,93],44:[2,93],45:[2,93],54:[2,93],64:[2,93],65:[2,93],76:[2,93],77:[2,93],78:[2,93],80:[2,93],90:[2,93],91:[2,93],94:[2,93],97:[2,93],100:[2,93],103:[2,93],106:[2,93],117:[2,93],119:[2,93],120:[2,93],121:[2,93]},{4:[2,94],6:[2,94],8:[2,94],36:[2,94],39:[2,94],42:[2,94],43:[2,94],44:[2,94],45:[2,94],54:[2,94],64:[2,94],65:[2,94],76:[2,94],77:[2,94],78:[2,94],80:[2,94],90:[2,94],91:[2,94],94:[2,94],97:[2,94],100:[2,94],103:[2,94],106:[2,94],117:[2,94],119:[2,94],120:[2,94],121:[2,94]},{4:[2,95],6:[2,95],8:[2,95],36:[2,95],39:[2,95],42:[2,95],43:[2,95],44:[2,95],45:[2,95],54:[2,95],64:[2,95],65:[2,95],76:[2,95],77:[2,95],78:[2,95],80:[2,95],90:[2,95],91:[2,95],94:[2,95],97:[2,95],100:[2,95],103:[2,95],106:[2,95],117:[2,95],119:[2,95],120:[2,95],121:[2,95]},{4:[2,96],6:[2,96],8:[2,96],36:[2,96],39:[2,96],42:[2,96],43:[2,96],44:[2,96],45:[2,96],54:[2,96],64:[2,96],65:[2,96],76:[2,96],77:[2,96],78:[2,96],80:[2,96],90:[2,96],91:[2,96],94:[2,96],97:[2,96],100:[2,96],103:[2,96],106:[2,96],117:[2,96],119:[2,96],120:[2,96],121:[2,96]},{4:[2,97],6:[2,97],8:[2,97],36:[2,97],39:[2,97],42:[2,97],43:[2,97],44:[2,97],45:[2,97],54:[2,97],64:[2,97],65:[2,97],76:[2,97],77:[2,97],78:[2,97],80:[2,97],90:[2,97],91:[2,97],94:[2,97],97:[2,97],100:[2,97],103:[2,97],106:[2,97],117:[2,97],119:[2,97],120:[2,97],121:[2,97]},{4:[2,98],6:[2,98],8:[2,98],36:[2,98],39:[2,98],42:[2,98],43:[2,98],44:[2,98],45:[2,98],54:[2,98],64:[2,98],65:[2,98],76:[2,98],77:[2,98],78:[2,98],80:[2,98],90:[2,98],91:[2,98],94:[2,98],97:[2,98],100:[2,98],103:[2,98],106:[2,98],117:[2,98],119:[2,98],120:[2,98],121:[2,98]},{4:[2,99],6:[2,99],8:[2,99],36:[2,99],39:[2,99],42:[2,99],43:[2,99],44:[2,99],45:[2,99],54:[2,99],64:[2,99],65:[2,99],76:[2,99],77:[2,99],78:[2,99],80:[2,99],90:[2,99],91:[2,99],94:[2,99],97:[2,99],100:[2,99],103:[2,99],106:[2,99],117:[2,99],119:[2,99],120:[2,99],121:[2,99]},{4:[2,100],6:[2,100],8:[2,100],36:[2,100],39:[2,100],42:[2,100],43:[2,100],44:[2,100],45:[2,100],54:[2,100],64:[2,100],65:[2,100],76:[2,100],77:[2,100],78:[2,100],80:[2,100],90:[2,100],91:[2,100],94:[2,100],97:[2,100],100:[2,100],103:[2,100],106:[2,100],117:[2,100],119:[2,100],120:[2,100],121:[2,100]},{4:[2,101],6:[2,101],8:[2,101],36:[2,101],39:[2,101],42:[2,101],43:[2,101],44:[2,101],45:[2,101],54:[2,101],64:[2,101],65:[2,101],76:[2,101],77:[2,101],78:[2,101],80:[2,101],90:[2,101],91:[2,101],94:[2,101],97:[2,101],100:[2,101],103:[2,101],106:[2,101],117:[2,101],119:[2,101],120:[2,101],121:[2,101]},{4:[2,102],6:[2,102],8:[2,102],36:[2,102],39:[2,102],42:[2,102],43:[2,102],44:[2,102],45:[2,102],54:[2,102],64:[2,102],65:[2,102],76:[2,102],77:[2,102],78:[2,102],80:[2,102],90:[2,102],91:[2,102],94:[2,102],97:[2,102],100:[2,102],103:[2,102],106:[2,102],117:[2,102],119:[2,102],120:[2,102],121:[2,102]},{4:[2,103],6:[2,103],8:[2,103],36:[2,103],39:[2,103],42:[2,103],43:[2,103],44:[2,103],45:[2,103],54:[2,103],64:[2,103],65:[2,103],76:[2,103],77:[2,103],78:[2,103],80:[2,103],90:[2,103],91:[2,103],94:[2,103],97:[2,103],100:[2,103],103:[2,103],106:[2,103],117:[2,103],119:[2,103],120:[2,103],121:[2,103]},{4:[2,191],6:[2,191],8:[2,191],36:[2,191],39:[2,191],42:[2,191],43:[2,191],44:[2,191],45:[2,191],54:[2,191],64:[2,191],65:[2,191],76:[2,191],77:[2,191],78:[2,191],80:[2,191],90:[2,191],91:[2,191],94:[2,191],97:[2,191],100:[2,191],103:[2,191],106:[2,191],117:[2,191],119:[2,191],120:[2,191],121:[2,191]},{3:272,4:[1,4],5:273,6:[1,149],65:[1,271]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:274,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{4:[2,195],6:[2,195],65:[2,195]},{44:[1,275]},{4:[2,90],8:[2,90],42:[2,90],64:[2,90],76:[2,90],77:[2,90],78:[2,90],80:[2,90],90:[2,90],91:[2,90],94:[2,90],97:[2,90],100:[2,90],103:[2,90],106:[2,90],119:[2,90],120:[2,90],121:[2,90]},{4:[2,91],8:[2,91],42:[2,91],64:[2,91],76:[2,91],77:[2,91],78:[2,91],80:[2,91],90:[2,91],91:[2,91],94:[2,91],97:[2,91],100:[2,91],103:[2,91],106:[2,91],119:[2,91],120:[2,91],121:[2,91]},{4:[2,92],8:[2,92],42:[2,92],64:[2,92],76:[2,92],77:[2,92],78:[2,92],80:[2,92],90:[2,92],91:[2,92],94:[2,92],97:[2,92],100:[2,92],103:[2,92],106:[2,92],119:[2,92],120:[2,92],121:[2,92]},{4:[2,75],6:[2,75],8:[2,75],36:[2,75],39:[2,75],42:[2,75],43:[2,75],44:[2,75],45:[2,75],54:[2,75],64:[2,75],65:[2,75],76:[2,75],77:[2,75],78:[2,75],80:[2,75],90:[2,75],91:[2,75],94:[2,75],97:[2,75],100:[2,75],103:[2,75],106:[2,75],117:[2,75],119:[2,75],120:[2,75],121:[2,75]},{4:[2,33],6:[2,33],8:[2,33],36:[2,33],39:[2,33],42:[2,33],43:[2,33],44:[2,33],45:[2,33],54:[2,33],64:[2,33],65:[2,33],76:[2,33],77:[2,33],78:[2,33],80:[2,33],90:[2,33],91:[2,33],94:[2,33],97:[2,33],100:[2,33],103:[2,33],106:[2,33],117:[2,33],119:[2,33],120:[2,33],121:[2,33]},{24:139,25:[1,62],26:141,27:[1,61],28:140,29:[1,60],36:[1,276],38:277},{4:[1,64],6:[1,234],36:[1,278]},{4:[2,36],6:[2,36],36:[2,36]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:279,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:280,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:281,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:282,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:283,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{4:[2,45],6:[2,45],8:[2,45],36:[2,45],39:[2,45],42:[2,45],43:[2,45],44:[2,45],45:[2,45],54:[2,45],64:[2,45],65:[2,45],76:[2,45],77:[2,45],78:[2,45],80:[2,45],90:[2,45],91:[2,45],94:[2,45],97:[2,45],100:[2,45],103:[2,45],106:[2,45],117:[2,45],119:[2,45],120:[2,45],121:[2,45]},{4:[1,64],6:[1,234],44:[1,284]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:285,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{4:[2,47],6:[2,47],44:[2,47]},{25:[2,3],27:[2,3],29:[2,3],31:[2,3],33:[2,3],35:[2,3],36:[2,3],42:[2,3],57:[2,3],61:[2,3],62:[2,3],63:[2,3],64:[2,3],66:[2,3],67:[2,3],72:[2,3],73:[2,3],79:[2,3],124:[2,3]},{4:[2,59],6:[2,59]},{4:[1,64],25:[2,5],27:[2,5],29:[2,5],31:[2,5],33:[2,5],35:[2,5],36:[2,5],42:[2,5],57:[2,5],61:[2,5],62:[2,5],63:[2,5],64:[2,5],66:[2,5],67:[2,5],72:[2,5],73:[2,5],79:[2,5],124:[2,5]},{4:[2,60],6:[2,60],119:[2,60],120:[2,60]},{44:[1,286]},{4:[2,109],6:[2,109],8:[2,109],36:[2,109],39:[2,109],42:[2,109],43:[2,109],44:[2,109],45:[2,109],54:[2,109],64:[2,109],65:[2,109],76:[2,109],77:[2,109],78:[2,109],80:[2,109],90:[2,109],91:[2,109],94:[2,109],97:[2,109],100:[2,109],103:[2,109],106:[2,109],117:[2,109],119:[2,109],120:[2,109],121:[2,109]},{4:[2,110],6:[2,110],8:[2,110],36:[2,110],39:[2,110],42:[2,110],43:[2,110],44:[2,110],45:[2,110],54:[2,110],64:[2,110],65:[2,110],76:[2,110],77:[2,110],78:[2,110],80:[2,110],90:[2,110],91:[2,110],94:[2,110],97:[2,110],100:[2,110],103:[2,110],106:[2,110],117:[2,110],119:[2,110],120:[2,110],121:[2,110]},{44:[1,287]},{4:[2,85],6:[2,85],8:[2,85],36:[2,85],39:[2,85],42:[2,85],43:[2,85],44:[2,85],45:[2,85],54:[2,85],64:[2,85],65:[2,85],76:[2,85],77:[2,85],78:[2,85],80:[2,85],90:[2,85],91:[2,85],94:[2,85],97:[2,85],100:[2,85],103:[2,85],106:[2,85],117:[2,85],119:[2,85],120:[2,85],121:[2,85]},{4:[2,86],6:[2,86],8:[2,86],36:[2,86],39:[2,86],42:[2,86],43:[2,86],44:[2,86],45:[2,86],54:[2,86],64:[2,86],65:[2,86],76:[2,86],77:[2,86],78:[2,86],80:[2,86],90:[2,86],91:[2,86],94:[2,86],97:[2,86],100:[2,86],103:[2,86],106:[2,86],117:[2,86],119:[2,86],120:[2,86],121:[2,86]},{4:[2,87],6:[2,87],8:[2,87],36:[2,87],39:[2,87],42:[2,87],43:[2,87],44:[2,87],45:[2,87],54:[2,87],64:[2,87],65:[2,87],76:[2,87],77:[2,87],78:[2,87],80:[2,87],90:[2,87],91:[2,87],94:[2,87],97:[2,87],100:[2,87],103:[2,87],106:[2,87],117:[2,87],119:[2,87],120:[2,87],121:[2,87]},{4:[2,182],6:[2,182],8:[2,182],36:[2,182],39:[2,182],42:[2,182],43:[2,182],44:[2,182],45:[2,182],54:[2,182],64:[2,182],65:[2,182],76:[2,182],77:[2,182],78:[2,182],80:[2,182],90:[2,182],91:[2,182],94:[2,182],97:[2,182],100:[2,182],103:[2,182],106:[2,182],117:[2,182],119:[2,182],120:[2,182],121:[2,182]},{120:[1,288]},{120:[1,289]},{4:[1,64],10:290,12:5,13:6,14:7,15:8,16:9,17:10,18:11,19:12,20:13,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,14],52:[1,15],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,114:20,115:21,116:[1,23],122:[1,16],127:[1,17]},{4:[2,178],119:[2,178],120:[2,178]},{4:[2,180],119:[2,180],120:[2,180]},{120:[1,291]},{4:[2,186],25:[2,186],27:[2,186],29:[2,186],31:[2,186],33:[2,186],35:[2,186],42:[2,186],49:[2,186],52:[2,186],55:[2,186],57:[2,186],61:[2,186],62:[2,186],63:[2,186],64:[2,186],66:[2,186],67:[2,186],73:[2,186],79:[2,186],122:[2,186],127:[2,186]},{24:292,25:[1,62]},{4:[1,64],6:[1,234]},{4:[2,189]},{120:[1,293]},{39:[1,294]},{4:[2,161],6:[2,161],36:[2,161],39:[2,161],43:[2,161],44:[2,161],45:[2,161],65:[2,161],77:[2,161],78:[1,176],117:[2,161],119:[2,161],120:[2,161],121:[2,161]},{4:[2,157],6:[2,157],36:[2,157],39:[2,157],43:[2,157],44:[2,157],45:[2,157],65:[2,157],76:[1,177],77:[2,157],78:[2,157],117:[2,157],119:[2,157],120:[2,157],121:[2,157]},{4:[2,153],6:[2,153],36:[2,153],39:[2,153],43:[2,153],44:[2,153],45:[2,153],65:[2,153],76:[2,153],77:[2,153],78:[2,153],106:[1,178],117:[2,153],119:[2,153],120:[2,153],121:[2,153]},{4:[2,149],6:[2,149],36:[2,149],39:[2,149],43:[2,149],44:[2,149],45:[2,149],65:[2,149],76:[2,149],77:[2,149],78:[2,149],103:[1,179],106:[2,149],117:[2,149],119:[2,149],120:[2,149],121:[2,149]},{4:[2,145],6:[2,145],36:[2,145],39:[2,145],43:[2,145],44:[2,145],45:[2,145],65:[2,145],76:[2,145],77:[2,145],78:[2,145],100:[1,180],103:[2,145],106:[2,145],117:[2,145],119:[2,145],120:[2,145],121:[2,145]},{4:[2,141],6:[2,141],36:[2,141],39:[2,141],43:[2,141],44:[2,141],45:[2,141],65:[2,141],76:[2,141],77:[2,141],78:[2,141],80:[1,182],97:[1,181],100:[2,141],103:[2,141],106:[2,141],117:[2,141],119:[2,141],120:[2,141],121:[2,141]},{4:[2,135],6:[2,135],36:[2,135],39:[2,135],43:[2,135],44:[2,135],45:[2,135],65:[2,135],76:[2,135],77:[2,135],78:[2,135],80:[2,135],94:[1,183],97:[2,135],100:[2,135],103:[2,135],106:[2,135],117:[2,135],119:[2,135],120:[2,135],121:[2,135]},{4:[2,136],6:[2,136],36:[2,136],39:[2,136],43:[2,136],44:[2,136],45:[2,136],65:[2,136],76:[2,136],77:[2,136],78:[2,136],80:[2,136],94:[1,183],97:[2,136],100:[2,136],103:[2,136],106:[2,136],117:[2,136],119:[2,136],120:[2,136],121:[2,136]},{4:[2,131],6:[2,131],36:[2,131],39:[2,131],43:[2,131],44:[2,131],45:[2,131],65:[2,131],76:[2,131],77:[2,131],78:[2,131],80:[2,131],90:[1,184],91:[1,185],94:[2,131],97:[2,131],100:[2,131],103:[2,131],106:[2,131],117:[2,131],119:[2,131],120:[2,131],121:[2,131]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:295,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{119:[1,297],120:[1,296]},{4:[1,64],10:300,12:5,13:6,14:7,15:8,16:9,17:10,18:11,19:299,20:13,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,14],52:[1,15],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,114:20,115:21,116:[1,23],118:298,122:[1,16],127:[1,17]},{4:[2,113],8:[2,113],42:[2,113],64:[2,113],76:[2,113],77:[2,113],78:[2,113],80:[2,113],90:[2,113],91:[2,113],94:[2,113],97:[2,113],100:[2,113],103:[2,113],106:[2,113],119:[2,113],120:[2,113],121:[2,113]},{4:[2,192],6:[2,192],8:[2,192],36:[2,192],39:[2,192],42:[2,192],43:[2,192],44:[2,192],45:[2,192],54:[2,192],64:[2,192],65:[2,192],76:[2,192],77:[2,192],78:[2,192],80:[2,192],90:[2,192],91:[2,192],94:[2,192],97:[2,192],100:[2,192],103:[2,192],106:[2,192],117:[2,192],119:[2,192],120:[2,192],121:[2,192]},{4:[1,64],6:[1,234],65:[1,301]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:302,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{4:[2,194],6:[2,194],65:[2,194]},{4:[2,89],8:[2,89],42:[2,89],64:[2,89],76:[2,89],77:[2,89],78:[2,89],80:[2,89],90:[2,89],91:[2,89],94:[2,89],97:[2,89],100:[2,89],103:[2,89],106:[2,89],119:[2,89],120:[2,89],121:[2,89]},{4:[2,34],6:[2,34],8:[2,34],36:[2,34],39:[2,34],42:[2,34],43:[2,34],44:[2,34],45:[2,34],54:[2,34],64:[2,34],65:[2,34],76:[2,34],77:[2,34],78:[2,34],80:[2,34],90:[2,34],91:[2,34],94:[2,34],97:[2,34],100:[2,34],103:[2,34],106:[2,34],117:[2,34],119:[2,34],120:[2,34],121:[2,34]},{4:[2,38],6:[2,38],36:[2,38]},{4:[2,35],6:[2,35],8:[2,35],36:[2,35],39:[2,35],42:[2,35],43:[2,35],44:[2,35],45:[2,35],54:[2,35],64:[2,35],65:[2,35],76:[2,35],77:[2,35],78:[2,35],80:[2,35],90:[2,35],91:[2,35],94:[2,35],97:[2,35],100:[2,35],103:[2,35],106:[2,35],117:[2,35],119:[2,35],120:[2,35],121:[2,35]},{4:[2,39],6:[2,39],36:[2,39]},{4:[2,40],6:[2,40],36:[2,40]},{4:[2,41],6:[2,41],36:[2,41]},{44:[1,303]},{44:[1,304]},{4:[2,46],6:[2,46],8:[2,46],36:[2,46],39:[2,46],42:[2,46],43:[2,46],44:[2,46],45:[2,46],54:[2,46],64:[2,46],65:[2,46],76:[2,46],77:[2,46],78:[2,46],80:[2,46],90:[2,46],91:[2,46],94:[2,46],97:[2,46],100:[2,46],103:[2,46],106:[2,46],117:[2,46],119:[2,46],120:[2,46],121:[2,46]},{4:[2,49],6:[2,49],44:[2,49]},{4:[2,108],6:[2,108],8:[2,108],36:[2,108],39:[2,108],42:[2,108],43:[2,108],44:[2,108],45:[2,108],54:[2,108],64:[2,108],65:[2,108],76:[2,108],77:[2,108],78:[2,108],80:[2,108],90:[2,108],91:[2,108],94:[2,108],97:[2,108],100:[2,108],103:[2,108],106:[2,108],117:[2,108],119:[2,108],120:[2,108],121:[2,108]},{4:[2,84],6:[2,84],8:[2,84],36:[2,84],39:[2,84],42:[2,84],43:[2,84],44:[2,84],45:[2,84],54:[2,84],64:[2,84],65:[2,84],76:[2,84],77:[2,84],78:[2,84],80:[2,84],90:[2,84],91:[2,84],94:[2,84],97:[2,84],100:[2,84],103:[2,84],106:[2,84],117:[2,84],119:[2,84],120:[2,84],121:[2,84]},{4:[2,183],6:[2,183],8:[2,183],36:[2,183],39:[2,183],42:[2,183],43:[2,183],44:[2,183],45:[2,183],54:[2,183],64:[2,183],65:[2,183],76:[2,183],77:[2,183],78:[2,183],80:[2,183],90:[2,183],91:[2,183],94:[2,183],97:[2,183],100:[2,183],103:[2,183],106:[2,183],117:[2,183],119:[2,183],120:[2,183],121:[2,183]},{4:[2,184],6:[2,184],8:[2,184],36:[2,184],39:[2,184],42:[2,184],43:[2,184],44:[2,184],45:[2,184],54:[2,184],64:[2,184],65:[2,184],76:[2,184],77:[2,184],78:[2,184],80:[2,184],90:[2,184],91:[2,184],94:[2,184],97:[2,184],100:[2,184],103:[2,184],106:[2,184],117:[2,184],119:[2,184],120:[2,184],121:[2,184]},{120:[1,305]},{4:[2,181],119:[2,181],120:[2,181]},{4:[2,188],6:[2,188],125:[2,188]},{4:[2,190]},{24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],40:306,41:45,42:[1,56],53:110,56:47,57:[1,57],58:43,59:78,60:82,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],70:77,71:79,72:[1,80],73:[1,81],79:[1,111],82:75,84:76,87:109,89:108,93:107,96:106,99:105,102:104,105:103,108:102,110:101,112:100,124:[1,83]},{4:[2,177],119:[2,177],120:[2,177]},{3:307,4:[1,4]},{3:308,4:[1,4],16:88,17:89,18:90,19:91,21:309,22:92,23:93,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,95],52:[1,96],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,122:[1,16],127:[1,17]},{119:[1,311],120:[1,310]},{3:70,4:[1,4],119:[2,172],120:[2,172]},{119:[2,173],120:[2,173]},{4:[2,193],6:[2,193],8:[2,193],36:[2,193],39:[2,193],42:[2,193],43:[2,193],44:[2,193],45:[2,193],54:[2,193],64:[2,193],65:[2,193],76:[2,193],77:[2,193],78:[2,193],80:[2,193],90:[2,193],91:[2,193],94:[2,193],97:[2,193],100:[2,193],103:[2,193],106:[2,193],117:[2,193],119:[2,193],120:[2,193],121:[2,193]},{4:[2,196],6:[2,196],65:[2,196]},{4:[2,42],6:[2,42],8:[2,42],36:[2,42],39:[2,42],42:[2,42],43:[2,42],44:[2,42],45:[2,42],54:[2,42],64:[2,42],65:[2,42],76:[2,42],77:[2,42],78:[2,42],80:[2,42],90:[2,42],91:[2,42],94:[2,42],97:[2,42],100:[2,42],103:[2,42],106:[2,42],117:[2,42],119:[2,42],120:[2,42],121:[2,42]},{4:[2,43],6:[2,43],8:[2,43],36:[2,43],39:[2,43],42:[2,43],43:[2,43],44:[2,43],45:[2,43],54:[2,43],64:[2,43],65:[2,43],76:[2,43],77:[2,43],78:[2,43],80:[2,43],90:[2,43],91:[2,43],94:[2,43],97:[2,43],100:[2,43],103:[2,43],106:[2,43],117:[2,43],119:[2,43],120:[2,43],121:[2,43]},{4:[2,185],6:[2,185],8:[2,185],36:[2,185],39:[2,185],42:[2,185],43:[2,185],44:[2,185],45:[2,185],54:[2,185],64:[2,185],65:[2,185],76:[2,185],77:[2,185],78:[2,185],80:[2,185],90:[2,185],91:[2,185],94:[2,185],97:[2,185],100:[2,185],103:[2,185],106:[2,185],117:[2,185],119:[2,185],120:[2,185],121:[2,185]},{4:[2,175],6:[2,175],36:[2,175],39:[2,175],43:[2,175],44:[2,175],45:[2,175],65:[2,175],117:[2,175],119:[2,175],120:[2,175]},{4:[1,64],11:[2,170],25:[2,170],27:[2,170],29:[2,170],31:[2,170],33:[2,170],35:[2,170],42:[2,170],49:[2,170],52:[2,170],55:[2,170],57:[2,170],61:[2,170],62:[2,170],63:[2,170],64:[2,170],66:[2,170],67:[2,170],73:[2,170],79:[2,170],116:[2,170],119:[2,170],120:[2,170],122:[2,170],127:[2,170]},{4:[1,64],10:300,12:5,13:6,14:7,15:8,16:9,17:10,18:11,19:299,20:13,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,14],52:[1,15],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,114:20,115:21,116:[1,23],118:312,122:[1,16],127:[1,17]},{120:[1,313]},{3:314,4:[1,4]},{3:315,4:[1,4],16:88,17:89,18:90,19:91,21:316,22:92,23:93,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,95],52:[1,96],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,122:[1,16],127:[1,17]},{120:[1,317]},{3:318,4:[1,4]},{4:[1,64],11:[2,171],25:[2,171],27:[2,171],29:[2,171],31:[2,171],33:[2,171],35:[2,171],42:[2,171],49:[2,171],52:[2,171],55:[2,171],57:[2,171],61:[2,171],62:[2,171],63:[2,171],64:[2,171],66:[2,171],67:[2,171],73:[2,171],79:[2,171],116:[2,171],119:[2,171],120:[2,171],122:[2,171],127:[2,171]},{4:[1,64],10:300,12:5,13:6,14:7,15:8,16:9,17:10,18:11,19:299,20:13,24:54,25:[1,62],26:53,27:[1,61],28:52,29:[1,60],30:50,31:[1,58],32:51,33:[1,59],34:44,35:[1,55],41:45,42:[1,56],48:19,49:[1,14],52:[1,15],55:[1,18],56:47,57:[1,57],58:43,60:38,61:[1,40],62:[1,41],63:[1,42],64:[1,46],66:[1,48],67:[1,49],73:[1,39],75:37,79:[1,34],83:35,85:36,86:33,88:32,92:31,95:30,98:29,101:28,104:27,107:26,109:25,111:24,113:22,114:20,115:21,116:[1,23],118:319,122:[1,16],127:[1,17]},{120:[1,320]},{3:321,4:[1,4]},{4:[1,64],11:[2,169],25:[2,169],27:[2,169],29:[2,169],31:[2,169],33:[2,169],35:[2,169],42:[2,169],49:[2,169],52:[2,169],55:[2,169],57:[2,169],61:[2,169],62:[2,169],63:[2,169],64:[2,169],66:[2,169],67:[2,169],73:[2,169],79:[2,169],116:[2,169],119:[2,169],120:[2,169],122:[2,169],127:[2,169]},{120:[1,322]},{3:323,4:[1,4]},{4:[1,64],11:[2,167],25:[2,167],27:[2,167],29:[2,167],31:[2,167],33:[2,167],35:[2,167],42:[2,167],49:[2,167],52:[2,167],55:[2,167],57:[2,167],61:[2,167],62:[2,167],63:[2,167],64:[2,167],66:[2,167],67:[2,167],73:[2,167],79:[2,167],116:[2,167],119:[2,167],120:[2,167],122:[2,167],127:[2,167]},{3:324,4:[1,4]},{4:[1,64],11:[2,168],25:[2,168],27:[2,168],29:[2,168],31:[2,168],33:[2,168],35:[2,168],42:[2,168],49:[2,168],52:[2,168],55:[2,168],57:[2,168],61:[2,168],62:[2,168],63:[2,168],64:[2,168],66:[2,168],67:[2,168],73:[2,168],79:[2,168],116:[2,168],119:[2,168],120:[2,168],122:[2,168],127:[2,168]},{4:[1,64],11:[2,166],25:[2,166],27:[2,166],29:[2,166],31:[2,166],33:[2,166],35:[2,166],42:[2,166],49:[2,166],52:[2,166],55:[2,166],57:[2,166],61:[2,166],62:[2,166],63:[2,166],64:[2,166],66:[2,166],67:[2,166],73:[2,166],79:[2,166],116:[2,166],119:[2,166],120:[2,166],122:[2,166],127:[2,166]}],
defaultActions: {65:[2,10],146:[2,9],255:[2,189],293:[2,190]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    };

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+'\nExpecting '+expected.join(', ');
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};/* Jison generated lexer */
var lexer = (function(){var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);
            if (match) {
                lines = match[0].match(/\n.*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match.length}
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                if (token) return token;
                else return;
            }
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    }});
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:
break;
case 1:return "NL";
break;
case 2:
break;
case 3:return "RANGE.EXCLUSIVE";
break;
case 4:return "RANGE.INCLUSIVE";
break;
case 5:return "TYPE.NUMBER";
break;
case 6:return "TYPE.NUMBER";
break;
case 7:return "TYPE.STRING";
break;
case 8:return "TYPE.NIL";
break;
case 9:return "PROC.NAMED";
break;
case 10:return "PROC.START";
break;
case 11:return "PROC.BOUND";
break;
case 12:return "PROC.END";
break;
case 13:return "PROC.RETURN";
break;
case 14:return "LOGIC.COMPARE";
break;
case 15:return "LOGIC.EQUALITY";
break;
case 16:return "LOGIC.IF";
break;
case 17:return "LOGIC.THEN";
break;
case 18:return "LOGIC.ELSE";
break;
case 19:return "LOGIC.OR";
break;
case 20:return "LOGIC.XOR";
break;
case 21:return "LOGIC.AND";
break;
case 22:return "LOGIC.NOT";
break;
case 23:return "VAR.ASSIGN";
break;
case 24:return "VAR.DEFINITION";
break;
case 25:return "VAR.ALTERATION";
break;
case 26:return "OBJECT.MEMBER";
break;
case 27:return "OBJECT.THIS";
break;
case 28:return "OBJECT.EXTENDS";
break;
case 29:return "PROC.NEW";
break;
case 30:return "PROC.CLASS";
break;
case 31:return "PROC.PARENT";
break;
case 32:return "MATH.ADDITIVE";
break;
case 33:return "MATH.MULTIPLICATIVE";
break;
case 34:return "MATH.MODULUS";
break;
case 35:return "MATH.POWER";
break;
case 36:return "MATH.FACTORIAL";
break;
case 37:return "MATH.PERCENT";
break;
case 38:return "MATH.CONSTANT";
break;
case 39:return "MATH.FUNCTION";
break;
case 40:return "MATH.FUNCTION.EXT";
break;
case 41:return "TYPE.BOOLEAN";
break;
case 42:return "TYPE.LITERAL";
break;
case 43:return "|";
break;
case 44:return ",";
break;
case 45:return "[";
break;
case 46:return "]";
break;
case 47:return "(";
break;
case 48:return ")";
break;
case 49:return "{";
break;
case 50:return "}";
break;
case 51:return ":";
break;
case 52:return ".";
break;
case 53:return "?";
break;
case 54:return "EOF";
break;
}
};

lexer.rules = [/^#[^\n]*/,/^\n/,/^\s+/,/^\.\.\./,/^\.\./,/^0[xX][a-fA-F0-9]+/,
/^-?([1-9][0-9]+|[0-9])(?:.[0-9]+)?(?:[eE][-+]?[0-9]+)?/,/^(?:\'[^\']*\'|\"[^\"]*\")/,/^nil\b/,
/^to [a-zA-Z_$][0-9a-zA-Z_$]*/,/^to\b/,/^do [a-zA-Z_$][0-9a-zA-Z_$]*/,
/^end\b/,/^<-/,/^[<>]=?/,/^(?:not|=)==?/,/^if\b/,/^then\b/,/^else\b/,
/^or\b/,/^xor\b/,/^and\b/,/^not\b/,/^(?:\+|\-|\*|\/)?=/,/^let\b/,/^set\b/,
/^\@[a-zA-Z_$][0-9a-zA-Z_$]*/,/^\@/,/^extends [a-zA-Z_$][0-9a-zA-Z_$]*/,
/^new\b/,/^class [a-zA-Z_$][0-9a-zA-Z_$]*/,/^parent\b/,/^(?:\-|\+)/,
/^(?:\/|\*)/,/^mod\b/,/^\^/,/^!/,/^\%/,/^(?:E|LN2|LN10|LOG2E|LOG10E|PI|SQRT1_2|SQRT2)\b/,
/^(?:acos|asin|atan|atan2|cos|sin|tan|exp|log|abs|ceil|floor|max|min|random|round|sqrt|abs|ceil|floor|max|min|random|round|sqrt)\b/,
/^(?:average|difference|mean|median|mode|product|quotient|range|sum|randomInt)\b/,/^(?:true|false|yes|no)/,
/^[a-zA-Z_$][0-9a-zA-Z_$]*/,/^\|/,/^\,/,/^\[/,/^\]/,/^\(/,/^\)/,/^\{/,/^\}/,/^:/,/^\./,/^\?/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
