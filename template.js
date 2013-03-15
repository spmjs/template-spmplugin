'use strict';

var fs = require('fs');

exports.description = 'Create spm plugin.';

exports.notes = '';

exports.warnOn = '*';

exports.template = function(grunt, init, done) {

  init.process({type: 'spm'}, [
    // Prompt for these values.
    init.prompt('name', function(value, props, done) {
      var name = 'spm-' + value;
      done(null, name);
    }),
    init.prompt('version', '1.0.0'),
    init.prompt('description', 'The best spm plugin ever.'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'MIT')
  ], function(err, props) {
    props.short_name = props.name.replace(/^spm[\-_]?/, '');
    props.keywords = ['spmplugin'];
    props.bin = {};
    props.bin[props.name] = 'bin/' + props.name;

    var files = init.filesToCopy(props);
    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', props, function(pkg, props) {
      pkg.scripts = pkg.scripts || {};
      pkg.scripts.postinstall = 'scripts/postinstall.js',
      pkg.scripts.uninstall = 'scripts/uninstall.js'
      return pkg;
    });
    var mode = parseInt('0777', 8);
    fs.chmodSync('scripts/postinstall.js', mode);
    fs.chmodSync('scripts/uninstall.js', mode);
    fs.chmodSync('bin/' + props.name, mode);
    // All done!
    done();
  });
};
