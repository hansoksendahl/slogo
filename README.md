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
generator](http://github.com/zaach/jison) to simplify creating WebGL powered
simulations.

Slogo sits on top of a stack that looks like this.

* [Node.js](http://nodejs.org/) - Build Platform
   * [Jison](http://zaach.github.com/jison/) - Parser Gernerator
      * [Slogo](https://github.com/hansineffect/Slogo) - Our Grammar

### Math constants and functions
The [Mozilla Developer Network documentation](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math)
for Javascript's Math object is worth looking up because we retain many of
Javascript's math constants and functions.

In regards to math the syntax of Slogo differs from Javascript in a
number of ways.  Namely one design consideration is that math functions are
first class citizens in Slogo.  The idea is that we're here to do math primarily
and develop code secondarily.

1. In Slogo every math constant and function is directly available in
  the main namespace.

    `PI # returns 3.141592653589793`

    `max 2, 5, 3 # returns 5`

2. Exponents have their own operator, the `^` operator

    `3 ^ 2 # returns 9`

3. Factorials have their own operator, the `!` operator

    `4! # returns 4 * 3 * 2 * 1`

4. The percent sign is used for percentages.

    `50% # returns 0.50`

5. The [`modulus`](http://en.wikipedia.org/wiki/Modulo_operation) operator is 
    still an operator but it has a longer name

    `3 mod 2 # returns 1`

### Bitwise operators
We have four bitwise operators in Slogo.  Bitwise operators allow for the
comparison of boolean values.

_Note: If you're familiar with how bitwise operations work in other languages
feel free to skip to the next section._

#### And operator
    true and true   # returns true
    true and false  # returns false
    false and false # returns false
    false and true  # returns false

#### Or operator
    true or true   # returns true
    true or false  # returns true
    false or false # returns false
    false or true  # returns true

#### Xor operator (exclusive or)
    true xor true   # returns false
    true xor false  # returns true
    false xor false # returns false
    false xor true  # returns true

#### Not operator
    true not true   # returns true
    true not false  # returns false
    false not false # returns false
    false not true  # returns true
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
