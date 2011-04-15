    . .                            sSSs   s
     \_\                           S      S
     (_ `.,--.__                   sSSs   S   sSSs   sSSs   sSSs
      \  (__.'  `.                    S   S   S  S   S  S   S  S
       `~~~~~~~~~~' ~~~~~~~~~~~~~~~sSSs~~~s~~~sSSs~~~sSSS~~~sSSs~~~ ~ ~ .
                                                        S
                                                     sSSs

**Slogo** is a multi-agent programmable modeling environment for WebGL.

It simplifies the process of developing scientific simulations online. Slogo is
a formal grammar which leverages Javascript, WebGL and the [Jison parser
generator](http://github.com/zaach/jison) to produce a formal grammar which
produces WebGL graphics.

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

5. The [`modulus`](http://en.wikipedia.org/wiki/Modulo_operation) operator is 
    still an operator but it has a longer name

    `3 mod 2 == 1`