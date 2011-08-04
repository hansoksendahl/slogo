// We'll be working on creating a JSON data structure to feed into Jison.
// This data will contain all of the information that Jison needs to generate a
// parser from our input grammar. The following helper functions allow us to
// create a grammar with an easy to read syntax.


// ### `rules`
// This is a utility function to assist in setting rules.  It accepts unlimited
// arguments in pairs and returns an array of regular expression rules.
//
// Usage
//
// `rules(/b/, 'RANDOM') # returns [['/b/', 'return "RANDOM";']]`
exports.rules = function() {
  var rules = [];
  for (var i = 0; i < arguments.length; i = i + 2) {
    var
      regex = arguments[i].toString().slice(1, -1),
      token = /^\/[\/\*]/.test(arguments[i+1]) ? '' : 'return "'+arguments[i+1]+'";';
    rules.push([regex, token]);
  }
  return rules;
};

// ### `operators`
// This is a utility function to assist in setting operators.  It takes a list
// of _handed_ operators and return an array of operators that can be used
// as input for Jison.
//
// Usage
//
// `operators('l + -'); // returns [['left', '+', '-' ]];`
exports.operators = function() {
  var operators = [];
  for (var i = 0; i < arguments.length; i++) {
    var match = /^(l|r)\s*(\S[\s\S]*)/.exec(arguments[i]);
    operators[i] = [match[1] == 'l' ? 'left' : 'right'];
    operators[i] = operators[i].concat(match[2].split(/\s+/));
  }
  return operators;
};

// ### `alternates`
// This is a utility function which helps us in preserving scope and creating
// productions.  It also allows us to hook into the [yy property of Jison](http://zaach.github.com/jison/docs/#sharing-scope).
//
// We check to see if any of the ExprStatements begin with `$.` if so we produce the
// corresponding code needed to access the Jison yy object.
//
// One other side effect is that any references to `<this>` in a production
// returns the production name.  Which is useful for recursive rules such as
// argument lists.
//
// Usage
//
// `alternates('token1 token2', '$1($2)'); // returns [['token1 token2', 'return $1($2);']]`
var alternates = function(token, args) {
  var
    list    = [],
    regSelf = /<this>/g;
  for (var i = 0; i < args.length; i = i + 2) {
    var
      symbol        = args[i].replace(regSelf, token),
      exprStatement = '$$ ='+args[i+1]+';',
      production    = [symbol, exprStatement];

    if (typeof args[i+2] == 'object') {
      production[2] = args[i+2];
      i++;
    }

    list.push(production);
  }
  return list;
};

// ### `bnf`
// This is a utility function that iterates through a javascript object
// and produces productions rules 
exports.bnf = function(productions) {
  var list = {};
  for (var token in productions) {
    if(productions.hasOwnProperty(token)) {
      list[token] = alternates(token, productions[token]);
    }
  }
  return list;
};

// ### `tokens`
// This is a utility function that will take the grammar defined through the
// bnf function and return a list of tokens that we can feed into Jison.
exports.tokens = function(bnf) {
  var tokens = [];
  for (var name in bnf) {
    if(bnf.hasOwnProperty(name)) {
      var alternates = bnf[name];
      for (var i = alternates.length - 1; i >= 0; i--) {
        var words = alternates[0][0].split(/\s+/);
        for (var j = words.length - 1; j >= 0; j--) {
          var token = words[j];
          if (bnf[token] === undefined) { tokens.push(token); }
        }
      }
    }
  }
  
  return tokens.join(' ');
};