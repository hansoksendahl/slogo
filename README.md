    . .	 	
     \_\	 	
     (_ `.,--.__ 	
      \  (__.'  `.
       `~~~~~~~~~~' ~~ ~~ ~~ ~~ ~~ Slogo	 	

Slogo is a multi-agent programmable modeling environment for WebGL.

It simplifies much of the tasks involved with developing online simulations.

Slogo sits on top of a stack that looks like this.

### Math constants and functions
The ([MDN Documentation](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math))
for Javascript's Math object is worth looking up because we retain many
of Javascript's math constants and functions.

In regards to math the syntax of Slogo differs from Javascript in a
number of ways:

1. In Slogo every math constant and function is directly available in
  the main namespace.

  `PI == 3.141592653589793`

  `max 2, 5, 3 == 5`

2. Exponents have their own operator, the `^` operator

  `3 ^ 2 == 9`

3. Factorials have their own operator, the `!` operator

  `4! == 4 * 3 * 2 * 1`

4. The percent sign is used for percentages.

  `50% == 0.50`

5. The modulus operator is still an operator but it has a longer name

  `3 mod 2 == 1`