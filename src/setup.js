const jsdom = require('jsdom').jsdom;
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

function propagateToGlobal() {
  for (const key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;
    global[key] = window[key];
  }
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  };
}
propagateToGlobal();

const sinon = require('sinon');
global.sinon = sinon;

const chai = require('chai');
chai.use(require('sinon-chai'));

global.expect = chai.expect;
// https://github.com/chaijs/chai/issues/107
global.should = undefined;
global.should = chai.should();
