const assert = require('assert');
const {JSDOM} = require('jsdom');
const jsdom = new JSDOM(`<!doctype html><html><body>
<div>
    <span id="marker-animation1">test1</span>
    <span id="marker-animation2">test2</span>
    <span id="marker-animation3">test3</span>
    <span id="marker-animation4">test4</span>
</div>
</body></html>`);
const {window} = jsdom;

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};
const props = Object.getOwnPropertyNames(window)
    .filter(prop => typeof global[prop] === 'undefined')
    .reduce((result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(window, prop),
    }), {});
Object.defineProperties(global, props);

const $ = require("jquery");
require('../jquery.marker-animation.min');


describe('option test', function () {
    'use strict';
    it('change options', function () {
        const $target = $('#marker-animation1');
        $target.markerAnimation({
            'color': 'red',
            'thickness': '0.3em',
            'duration': '10s',
            'font_weight': null,
            'repeat': true,
            'test': true
        });
        const param = $target.get(0).markerAnimationObj;
        assert.equal(param.op.color, 'red');
        assert.equal(param.op.thickness, '0.3em');
        assert.equal(param.op.duration, '10s');
        assert.equal(param.op.font_weight, null);
        assert.equal(param.op.repeat, true);
        $target.markerAnimation('destroy');
    });
    it('override options', function () {
        const $target = $('#marker-animation2')
            .data('ma_color', 'blue')
            .data('ma_thickness', '0.5em')
            .data('ma_duration', '20s')
            .data('ma_font_weight', 'normal')
            .data('ma_repeat', false);
        $target.markerAnimation({
            'color': 'red',
            'thickness': '0.3em',
            'duration': '10s',
            'font_weight': null,
            'repeat': true,
            'test': true
        });
        const param = $target.get(0).markerAnimationObj;
        assert.equal(param.op.color, 'blue');
        assert.equal(param.op.thickness, '0.5em');
        assert.equal(param.op.duration, '20s');
        assert.equal(param.op.font_weight, 'normal');
        assert.equal(param.op.repeat, false);
        $target.markerAnimation('destroy');
    });
});

describe('destroy test', function () {
    'use strict';
    it('reset options', function () {
        const css = {
            'padding-bottom': '1px',
            'font-weight': '100'
        };
        const $target = $('#marker-animation3').css(css);
        Object.keys(css).forEach(function (key) {
            assert.equal($target.css(key), css[key]);
        });
        $target.markerAnimation({'test': true});
        Object.keys(css).forEach(function (key) {
            assert.notEqual($target.css(key), css[key]);
        });
        $target.markerAnimation('destroy');
        Object.keys(css).forEach(function (key) {
            assert.equal($target.css(key), css[key]);
        });
    });
});
