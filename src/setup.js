const jsdom = require('jsdom').jsdom;
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

const sinon = require('sinon');
global.sinon = sinon;

const chai = require('chai');
chai.use(require('sinon-chai'));

global.expect = chai.expect;
// https://github.com/chaijs/chai/issues/107
global.should = undefined;
global.should = chai.should();
