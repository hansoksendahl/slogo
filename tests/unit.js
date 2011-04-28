// I'm not crazy about testing or test driven development.  I'd rather have a
// well documented project than a well tested one.

// That said...

// ## Slogo Math tests

var Slogo = require('../lib/grammar');

// Include the `assert` module included in [Node.js](http://nodejs.org).
var assert = require('assert');

exports.parse = function() {
  console.log(Slogo.parser.parse.apply(Slogo.parser, arguments));
}

// This function takes a list of Slogo strings and they're expected outputs and
// tests whether they're equal.
exports.test = function() {
  for (var i = 0; i < arguments.length; i = i + 2) {
    var
      expression = arguments[i],
      expected = arguments[i+1],
      error;
    console.log('Attempting: "'+expression+'", Expecting: '+expected);
    try {
      var value = Slogo.parser.parse(arguments[i]);
      assert.equal(value, expected);
    }
    catch (err) {
      error = err;
    }
    var message = error || 'Successful!'
    console.log(message);
  };
}