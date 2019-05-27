const { JSDOM } = require( 'jsdom' );
const jsdom = new JSDOM( `<!doctype html><html lang="en"><body>
<div>
    <span id="marker-animation1">test1</span>
    <span id="marker-animation2">test2</span>
    <span id="marker-animation3">test3</span>
    <span id="marker-animation4">test4</span>
</div>
</body></html>` );
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.navigator = {
	userAgent: 'node.js',
};
