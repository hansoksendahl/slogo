var preamble = {};

preamble['Class'] = {
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

(function() {
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

  preamble['Math'] = {
    // This file contains useful functions to include in our grammar.  Any functions
    // "exported" from this file are attached to the Jison `yy` object.

    // ## The factorial operator
    //
    // `[NUMBER]!`
    'factorial': function(n) {
      return n==0 ? 1 : arguments.callee(n-1) * n;
    },

    // ## The percent operator
    //
    // `[NUMBER]%`
    'percent': function(n) {
      return n / 100;
    },

    // ## Sum function
    //
    // `sum 5, 2, 1 == 8`
    'sum': function() {
      return total(arguments, function(a, b) {
        return a += b;
      });
    },

    // ## Difference function
    //
    // `difference 15, 10, 3 == 7`
    'difference': function() {
      return total(arguments, function(a, b) {
        return a -= b;
      });
    },

    // ## Product function
    //
    // `product 4, 6, 2 == 48`
    'product': function() {
      return total(arguments, function(a, b) {
        return a *= b;
      });
    },

    // ## Quotient function
    //
    // `quotient 10, 2, 2 == 2.5`
    //
    // _Remember: Friends don't let friends divide by zero._
    'quotient': function() {
      return total(arguments, function(a, b) {
        return a /= b;
      });
    },

    // ## Mean function
    //
    // `mean 10, 1, 4 == 5`
    //
    // _Note: It's actually a nice function._
    'mean': function() {
      var i = exports.sum.apply(this, arguments);
      return i / arguments.length;
    },

    // ## Median function
    //
    // `median 1, 2, 3, 4 == 2.5`
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
    // `mode 2, 1, 2, 3, 2 == 2`
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
    // `range 2, 3, 10 == 8`
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
}());

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