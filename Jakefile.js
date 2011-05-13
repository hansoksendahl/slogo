var sys = require('sys'),
    ps  = require('child_process');

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

// Unfortunately I have to be extremely explicit in these instructions because
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
    ['cd', '"'+__dirname+'"'],
    ['./ext/docco/bin/docco', './lib/*.js'],
    ['mv', './docs', ghPagesDir+'/docs'],
    ['cd', ghPagesDir+'/docs'],
    // ensure we have SOMETHING to commit
    ['echo', '" "', '>>', 'index.html'],
    ['git', 'add', '.'],
    ['git', 'commit', '-m', '"built on: '+(new Date())+'"']
    ['git', 'push', 'origin', 'gh-pages']
  ], 'Documentation generated!');
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