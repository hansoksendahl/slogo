// This file contains useful functions to include in our grammar.  Any functions
// "exported" from this file are attached to the Jison `yy` object.

// Export the Math object just for fun
for(key in Math) {
  exports[key] = Math[key];
}

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
// number in the list
var total = function(args, func) {
  var
    args   = Array.prototype.slice.call(args);
    result = args.shift();
  for (var i = 0; i < args.length; i++) {
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

// ## Mean function
//
// `mean 10, 1, 4 == 5`
//
// _Note: It's actually a nice function._
exports.mean = function() {
  var i = exports.sum.apply(this, arguments);
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
exports.mode = function() {
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
};

// ## Range function
//
// `range 2, 3, 10 == 8`
exports.range = function() {
  var i_max = Math.max.apply(this, arguments);
  var i_min = Math.min.apply(this, arguments);
  return i_max - i_min;
}

// ## RandomInt function
//
// `rnd 10` returns an integer between 0 and 9
//
// `rnd -10` returns an integer between 0 and -9
exports.randomInt = function(i) {
  var f = (i >= 0) ? 'floor' : 'ceil'; 
  return Math[f](Math.random() * i);
}