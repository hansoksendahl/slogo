var sys = require('sys'),
    ps  = require('child_process'),
    fs  = require('fs');

// desc('This is the default task.');
// task('default', [], function () {
//   sys.puts('This is the default task.');
//   sys.puts(sys.inspect(arguments));
// });

desc('Updates submodules in the ./ext directory');
task('update', [], function() {
  runCommands([
    ['cd', '"'+__dirname+'"'],
    ['git', 'submodule', 'init'],
    ['git', 'submodule', 'update']
  ], 'Updated!');
});

desc('Commits any changes to Github');
task('deploy', [], function () {
  runCommands([
    ['cd', '"'+__dirname+'"'],
    ['echo', '" "', '>>', 'README.md'],
    ['git', 'add', '.'],
    ['git', 'commit', '-m', '"built on: '+(new Date())+'"'],
    ['git', 'push', 'origin', 'master']
  ], 'Deployed!');
});

desc('Generates a parser and saves it to the build directory');
task('build', [], function() {
  var
    d       = new Date(),
    grammar = require('./lib/grammar');
    name    = './builds/build-'+([d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()].join('-'))+'.js'
  fs.writeFile(name, grammar.generate(), function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Built!');
    }
  });
});
//   I have to be extremely explicit in these instructions because
// permissions are screwed up in my development directory (Thanks a lot
// Virtualbox!)
//
// They command should work on any system which has the dependencies [Node,
// Jake, Docco].
//
// _Note: I'm using a hacked repo of Docco which calls the pygments web API._
desc('Generating source-code documentaion');
task('docs', [], function() {
  var ghPagesDir = '../gh-pages'
  runCommands([
    // generate the main documentation
    ['cd', '"'+__dirname+'"'],
    ['./ext/docco/bin/docco', './lib/*.js'],
    ['cd', ghPagesDir],
    ['git', 'rm', '-r', 'docs', '--ignore-unmatch', '--quiet'],
    ['mv', __dirname+'/docs', '.'],

    ['git', 'add', 'docs'],
    ['git', 'commit', '-m', '"built on: '+(new Date())+'"'],
    ['git', 'push', 'origin', 'gh-pages']
  ], 'Docs Pushed')
});

function buildCommandString(commands) {
  return commands.map(function(command) {
    return command.join(" ");
  }).join(" && ");
};

function runCommands(commands, success) {
  ps.exec(buildCommandString(commands), [], function(err) {
    var message = err || success;
    sys.log(message);
  })
}
