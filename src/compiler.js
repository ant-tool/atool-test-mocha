import fs from 'fs';
const babel = require('babel-core');

const noop = () => null;

const jsCompiler = ext => {
  const origJs = require.extensions[ext];
  return (module, filename) => {
    if (filename.indexOf('node_modules/') >= 0) {
      return (origJs || require.extensions[ext])(module, filename);
    }

    const content = fs.readFileSync(filename, 'utf-8');
    const code = babel.transform(content, {
      presets: ['es2015', 'react', 'stage-0'],
      ast: false,
    }).code;

    return module._compile(code, filename);
  }
}

require.extensions['.js'] = jsCompiler('.js');
require.extensions['.jsx'] = jsCompiler('.jsx');

require.extensions['.css'] = noop;
require.extensions['.less'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.sass'] = noop;

require.extensions['.html'] = noop;
