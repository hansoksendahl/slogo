// ## And bitwise operator
//
//     a = true
//     b = false
//     a and b == false
exports.and = function(a, b) {
  return a & b;
}

// ## Or bitwise operator
//
//     a = true
//     b = false
//     a and b == true
exports.or = function(a, b) {
  return a | b;
}

// ## Xor bitwise operator
//
//     a = true
//     b = false
//     a xor b == true
exports.xor = function(a, b) {
  return a ^ b;
}