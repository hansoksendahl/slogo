var unit = require('./unit');
var fs = require('fs');

var path = fs.realpathSync();

var test = fs.readFileSync(path+'/tests/misc.sl', 'utf-8')

var parsed = unit.parse(test);

console.log(parsed);

console.log(eval(parsed));