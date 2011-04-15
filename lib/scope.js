// This file contains useful functions to include in our grammar.  Any functions
// "exported" from this file are attached to the Jison `yy` object.

// We'll begin with some math functions

// ## The factorial operator
//
// `[NUMBER]!`
exports.factorial = function(n) {
  return n==0 ? 1 : arguments.callee(n-1) * n;
};

// The `total` function is used by `sum`, `difference`, `product`, and
// `quotient` functions.  This function takes a list of numbers and a operating
// function it then iterates through numbers applying the operation to each
// resulting.
var total = function(args, func) {
  var
    args   = Array.prototype.slice.call(args);
    result = args.shift();
  for (var i = 1; i < args.length; i++) {
    args[i];
    result = func(result, args[i]);
  };
  return result;
};

// ## Sum function
//
// `sum 5, 2, 1 == 8`
exports.sum = function() {
  return total(arguments, function(a, b) {
    return a += b;
  });
};

// ## Difference function
//
// `difference 15, 10, 3 == 7`
exports.difference = function() {
  return total(arguments, function(a, b) {
    return a -= b;
  });
}

// ## Product function
//
// `product 4, 6, 2 == 48`
exports.product = function() {
  return total(arguments, function(a, b) {
    return a *= b;
  });
};

// ## Quotient function
//
// `quotient 10, 2, 2 == 2.5`
//
// _Remember: Friends don't let friends divide by zero._
exports.quotient = function() {
  return total(arguments, function(a, b) {
    return a /= b;
  });
};