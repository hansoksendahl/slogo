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
    ['git', 'commit', '-a', '-m', '"built on: '+(new Date())+'"', '--no-verify'],
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
  runCommands([
    ['cd', '"'+__dirname+'"'],
    ['./ext/docco/bin/docco', './lib/*.js'],
    ['mv', './docs', '/tmp/docs'],
    ['git', 'stash'],
    // switch to the gh-pages branch
    ['git', 'checkout', 'gh-pages'],
    ['git', 'rm', '-r', './docs'],
    ['mv', '/tmp/docs', '.'],
    ['git', 'add', './docs'],
    // ensure we have SOMETHING to commit
    ['echo', '" "', '>>', 'index.html'],
    ['git', 'add', 'index.html'],
    ['git', 'commit', '-a', '-m', '"built on: '+(new Date())+'"', '--no-verify'],
    ['git', 'push'],
    ['git', 'checkout', 'master'],
    ['git', 'stash', 'apply'],
  ], 'Documentation generated!');
});

// This is basically just a work around for the fact that Chrome does not
// support cookies when viewing local files without a command line switch.
// This one bug makes it rather difficult to test portions of the app during
// development.
//
// By creating a mini-server we can host the files locally through the
// command provided here.  This allows us to host the app and then cookies work
// Yay!
//
// _Note: Access the app at localhost:8080_
desc('Test the app in a web session.');
task('web', [], function(port) {
  port = port || 8080;

  var
    sys  = require("sys"),
    http = require("http"),
    url  = require("url"),
    path = require("path"),
    fs  = require("fs");

  // Don't be frightened this is just a simple Node.js File server.  For 
  // development purposes.  It serves all files at document root.
  http.createServer(function(request, response) {
      var
        uri      = url.parse(request.url).pathname,
        filename = path.join(process.cwd(), uri);
      path.exists(filename, function(exists) {
        if(!exists) {
          response.writeHeader(404, {"Content-Type": "text/plain"});
          response.end("404 Not Found\n");
          return;
        }

        fs.readFile(filename, "binary", function(err, file) {
          if(err) {
            response.writeHeader(500, {"Content-Type": "text/plain"});
            response.end(err + "\n");
            return;
          }

          response.writeHeader(200);
          response.end(file, "binary");
        });
      });
  }).listen(port);

  sys.puts("Server running at http://localhost:"+port+"/");

  runCommands([
    ['git', 'checkout', 'gh-pages']
  ], 'Switched to "gh-pages" branch');
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