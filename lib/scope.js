exports.Logic = require('./scope/bitwiseLogic')

exports.Math = require('./scope/math')

// # SymbolTable

// It's a gosh darn [finite state machine](http://en.wikipedia.org/wiki/Finite-state_machine)
//
// I didn't realize that I needed one of these to save scope at the beginning of
// the quarter and started writing programs that all applied to the global.

//     var sb = new SymbolTable()
//     sb.declare('woo', 'yar');
//     sb.push().declare('blah', 'test');
//     sb.pop();
//     sb.context()['woo']; // returns 'yar'; 
var SymbolTable = (function() {
  // A constructor function for our SymbolTable "class"
  var symbolTable = function() {
    this.table = [];
    this._push();
  };

  symbolTable.prototype = {
    // Push a new scope onto the symbol table
    '_push': function() {
      this.table.push({});
      return this._setContext();
    },
    // Pop an old scope off of the symbol table
    '_pop': function() {
      this.table.pop();
      return this._setContext();
    },
    // Return a reference the current context
    '_setContext': function(index) {
      index = index || this.table.length - 1;
      this.context = this.table[index];
      return this;
    },
    // Lookup variable reassign the token if it's a function so that we can call
    // the function immediately
    //
    // If it's a value then just look up the value.
    'lookup': function(key) {
      var value = this.context[key];
      console.log(key, value);
      return (typeof value == 'function') ? value() : value;
    },
    // Declare a new variable within the current context
    'declare': function(key, value) {
      this.context[key] = value;
      return this;
    },
    // Declare a procedure by binding a new scope.
    'declareProcedure': function(key, args, statements, finalStatement) {
      var procedure = anonFunction(args, statements, finalStatement)
      this.declare(key, procedure);

      for (var i = args.length - 1; i >= 0; i--) {
        this.declare(args[i], void(0));
      };

      return this;
    }
  };

  return symbolTable;
}());

exports.SymbolTable = (function() {
  var sb = new SymbolTable();
  return sb;
}());

exports.Function = {}

var anonFunction = exports.Function.anonymous = function() {
  var args = Array.prototype.slice.apply(arguments);

  var
    vars = (typeof args[0] == 'object') ? args.shift() : [],
    statements = (args.length == 2) ? args.shift() : "",
    finalStatement = args.shift();

  if (finalStatement) { statements += ';return '+finalStatement; }

  return Function.constructor.apply(Function, vars.concat(statements));
}

exports.Literal = function(val) {
  return eval(val);
}