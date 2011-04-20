// This file contains useful functions to include in our grammar.  Any functions
// "exported" from this file are attached to the Jison `yy` object.

// We'll begin with some math functions

// ## The factorial operator
//
// `[NUMBER]!`
var factorial = exports.factorial = function(n) {
  return n==0 ? 1 : arguments.callee(n-1) * n;
};

// The `total` function is used by `sum`, `difference`, `product`, and
// `quotient` functions.  This function takes a list of numbers and a operating
// function it then iterates through numbers applying the operation to each
// number in the list
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
var sum = exports.sum = function() {
  return total(arguments, function(a, b) {
    return a += b;
  });
};

// ## Difference function
//
// `difference 15, 10, 3 == 7`
var difference = exports.difference = function() {
  return total(arguments, function(a, b) {
    return a -= b;
  });
}

// ## Product function
//
// `product 4, 6, 2 == 48`
var product = exports.product = function() {
  return total(arguments, function(a, b) {
    return a *= b;
  });
};

// ## Quotient function
//
// `quotient 10, 2, 2 == 2.5`
//
// _Remember: Friends don't let friends divide by zero._
var quotient = exports.quotient = function() {
  return total(arguments, function(a, b) {
    return a /= b;
  });
};

// ## Mean function
//
// `mean 10, 1, 4 == 5`
//
// _Note: It's actually a nice function._
var mean = exports.mean = function() {
  var i = sum.apply(this, arguments);
  return i / arguments.length;
};

// ## Median function
//
// `median 1, 2, 3, 4 == 2.5`
var median = exports.median = function() {
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
};

// ## Mode function
//
// `mode 2, 1, 2, 3, 2 == 2`
var mode = exports.mode = function() {
  var
    numList       = {},
    maxOccurences = 0;
  for (var i = arguments.length - 1; i >= 0; i--) {
    var num = arguments[i];
    numList[num] = numList[num] + 1 || 1;
    if (numList[num] > numList[thisMode]) thisMode = num;
  };
  if(maxOccurences > 0) {
    var result = [];
    for (num in numList) {
      if (numList[num] == maxOccurences) { result.push(num) };
    }
    return result;
  }
};

// ## Range function
//
// `range 2, 3, 10 == 8`
var range = exports.range = function() {
  var i_max = Math.max.arguments.apply(Math, arguments);
  var i_min = Math.min.arguments.apply(Math, arguments);
  return i_max - i_min;
}

// ## And bitwise operator
//
//     a = true
//     b = false
//     a and b == false
var and = exports.and = function(a, b) {
  return a && b;
}

// ## Or bitwise operator
//
//     a = true
//     b = false
//     a and b == true
var or = exports.or = function(a, b) {
  return a || b;
}

// ## Not bitwise operator
//
//     a = true
//     b = false
//     a not b == true
var not = exports.not = function(a, b) {
  return a ! b;
}

// ## Xor bitwise operator
//
//     a = true
//     b = false
//     a xor b == true
var xor = exports.xor = function(a, b) {
  return a ^ b;
}