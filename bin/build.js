// Import ESBuild
const { buildSync, CommonOptions } = require('esbuild'); // eslint-disable-line

/** @type {CommonOptions} */
const defaultSettings = {
  bundle: true,
  minify: true,
  sourcemap: false,
  target: 'es6',
};

// Files building
buildSync({
  ...defaultSettings,
  entryPoints: ['src/marketo/marketo.ts'],
  outfile: 'dist/marketo.js',
});

buildSync({
  ...defaultSettings,
  entryPoints: ['src/mailchimp/mailchimp.ts'],
  outfile: 'dist/mailchimp.js',
});
