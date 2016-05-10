import fs from 'fs';
const babel = require('babel-core');
const origJs = require.extensions['.js'];

require.extensions['.js'] = (module, filename) => {
  if (filename.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.js'])(module, filename);
  }

  const content = fs.readFileSync(filename, 'utf-8');

  const code = babel.transform(content, {
    presets: ['es2015', 'react', 'stage-0'],
    ast: false,
  }).code;

  return module._compile(code, filename);
};
