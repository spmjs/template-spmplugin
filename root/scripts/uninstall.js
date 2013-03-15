#!/usr/bin/env node

try {
  require('spm').plugin.uninstall('{%= short_name %}');
} catch(e) {}
