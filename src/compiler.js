require('babel-register')({
  presets: [
    require.resolve('babel-preset-es2015'),
    require.resolve('babel-preset-react'),
    require.resolve('babel-preset-stage-0'),
  ],
  plugins: [
    require.resolve('babel-plugin-add-module-exports'),
  ],
});

const noop = () => null;
['.css', '.less', '.scss', '.sass', '.html'].forEach(ext => {
  require.extensions[ext] = noop;
});
