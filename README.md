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

    _Node.js_ - Build Platform
      Jison - Parser Gernerator
        Slogo - Our Grammar

### Math constants and functions
The [Mozilla Developer Center documentation](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math)
for Javascript's Math object is worth looking up because we retain many of
Javascript's math constants and functions.

In regards to math the syntax of Slogo differs from Javascript in a
number of ways.  Namely one design consideration is that math functions are
first class citizens in Slogo.  The idea is that we're here to do math primarily
and develop code secondarily.

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

### Bitwise operators
We have four bitwise operators in Slogo.  Bitwise operators allow for the
comparison of boolean values.

_Note: If you're familiar with how bitwise operations work in other languages
feel free to skip to the next section._

#### And operator

    true and true   # true
    true and false  # false
    false and false # false
    false and true  # false

#### Or operator

    true or true   # true
    true or false  # true
    false or false # false
    false or true  # true

#### Xor operator (exclusive or)
    true xor true   # false
    true xor false  # true
    false xor false # false
    false xor true  # true

#### Not operator
    true not true   # true
    true not false  # false
    false not false # false
    false not true  # true
 
 
 
 
 
 
 
