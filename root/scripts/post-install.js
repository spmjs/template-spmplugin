#!/usr/bin/env node

try {
  var spm = require('spm');
  spm.plugin.install({
    name: '{%= short_name %}',
    binary: '{%= name %}',
    description: '{%= description %}'
  });
} catch(e) {
  console.log('  you need install spm to register the program');
  console.log();
  console.log('    \x1b[31m$ npm install spm@~2.0.0 -g\x1b[39m');
  console.log();
  console.log("  if you have installed spm, it maybe you haven't set a NODE_PATH environment variable");
  console.log();
}
