const esbuild = require('esbuild'); // eslint-disable-line

esbuild.buildSync({
  entryPoints: ['index.ts'],
  bundle: true,
  minify: false,
  sourcemap: false,
  target: ['es6'],
  outfile: '../../../Users/alexi/OneDrive/Espai de Treball/Finsweet/Testing/marketo.js',
});
