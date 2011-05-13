exports.Math = require('./scope/math');
exports.Bitwise = require('./scope/bitwise');
exports.Logic = require('./scope/logic');
exports.Node = require('./generator').Node;


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

// var SymbolTable = (function() {
//   // A constructor function for our SymbolTable "class"
//   var symbolTable = function() {
//     this.table = [];
//     this._push();
//   };

//   symbolTable.prototype = {
//     // Push a new scope onto the symbol table
//     '_push': function() {
//       this.table.push({});
//       return this._setContext();
//     },
//     // Pop an old scope off of the symbol table
//     '_pop': function() {
//       this.table.pop();
//       return this._setContext();
//     },
//     // Return a reference the current context
//     '_setContext': function(index) {
//       index = index || this.table.length - 1;
//       this.context = this.table[index];
//       return this;
//     },
//     // Lookup variable reassign the token if it's a function so that we can call
//     // the function immediately
//     //
//     // If it's a value then just look up the value.
//     'lookup': function(key) {
//       var value = this.context[key];
//       return (typeof value == 'function') ? value() : value;
//     },
//     // Declare a new variable within the current context
//     'declare': function(key, value) {
//       this.context[key] = value;
//       return this;
//     }
//   };

//   return symbolTable;
// }());

// exports.SymbolTable = (function() {
//   var sb = new SymbolTable();
//   return sb;
// }());

exports.Literal = {};
exports.Literal.strip = function(str) {
  var name = /[\s\@](\w+)$/.exec(str)[1];
  return {name: "String", value: name};
}

exports.Type = {};

exports.Type.Boolean = function(str) {
  return /true|yes/.test(str);
}