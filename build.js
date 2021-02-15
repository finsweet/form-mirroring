const esbuild = require('esbuild'); // eslint-disable-line

esbuild.buildSync({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: false,
  target: ['es6'],
  outfile: '../../Users/alexi/OneDrive/Espai de Treball/Finsweet/FormMirroring/index.js',
});
