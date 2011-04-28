var unit = require('./unit');

console.log('Test the Math module of Slogo\nIf you don\'t see any errors it works.');

// Testing some math operations
unit.test(
  // Addition
  '2 + 3',   '5',
  // Subtraction
  '5 - 2',   '3',
  // Multiplication
  '2 * 5',   '10',
  // Division
  '12 / 2',  '6',
  // Exponents
  '5 ^ 2',   '25',
  // Constants
  'PI',      '3.141592653589793',
  // Percentages
  '40%',     '0.4',
  // Modulus operator
  '5 mod 3', '2',
  // Factorial operator
  '5!', '120',
  // Sum function
  'sum 5, 2, 1', '8',
  // Difference function
  'difference 10, 7, 1', '2',
  // Product function
  'product 5, 2, 3', '30',
  // Quotient function
  'quotient 10, 2, 2', '2.5',
  // Average function
  'mean 10, 1, 4', '5'
);