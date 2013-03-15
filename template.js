 'use strict';

exports.description = 'Create spm plugin.';

exports.notes = '';

exports.warnOn = '*';

exports.template = function(grunt, init, done) {

  init.process({type: 'spm'}, [
    // Prompt for these values.
    init.prompt('name', function(value, props, done) {
      var name = 'spm-' + value;
      done(null, name);
    });
    init.prompt('version', '1.0.0'),
    init.prompt('description', 'The best spm plugin ever.'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'MIT')
  ], function(err, props) {
    var files = init.filesToCopy(props);
    props.keywords = ['spmplugin'];
    props.short_name = props.name.replace(/^spm[\-_]?/, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file, used by npm and grunt.
    props.scripts = {
      'postinstall': 'scripts/post-install.js',
      'uninstall': 'scripts/uninstall.js'
    };
    init.writePackageJSON('package.json', props);
    // All done!
    done();
  });
};
