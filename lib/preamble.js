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
      else               { while(i <= l) { range.push(i); i++; } }
    }
    else {
      if(exclusive) { while(i > l) { range.push(i); i--; } }
      else               { while(i >= l) { range.push(i); i--; } }
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

// Export our preamble object
exports.preamble = preamble;