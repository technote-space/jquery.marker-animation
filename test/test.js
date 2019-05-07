const assert = require( 'assert' );
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

global[ 'window' ] = window;
global[ 'document' ] = window.document;
global[ 'navigator' ] = {
	userAgent: 'node.js',
};
const props = Object.getOwnPropertyNames( window )
					.filter( prop => typeof global[ prop ] === 'undefined' )
					.reduce( ( result, prop ) => ( {
						...result,
						[ prop ]: Object.getOwnPropertyDescriptor( window, prop ),
					} ), {} );
Object.defineProperties( global, props );

const $ = require( 'jquery' );
require( '../jquery.marker-animation.min' );

describe( 'option test', function() {
	it( 'change options', function() {
		const $target = $( '#marker-animation1' );
		$target.markerAnimation( {
			'color': 'red',
			'thickness': '0.3em',
			'duration': '10s',
			'font_weight': null,
			'repeat': true,
			'stripe': true,
			'stripe_thickness': 'test',
			'test': true,
		} );
		const param = $target[ 0 ].markerAnimationObj;
		assert.strictEqual( param.op.color, 'red' );
		assert.strictEqual( param.op.thickness, '0.3em' );
		assert.strictEqual( param.op.duration, '10s' );
		assert.strictEqual( param.op.font_weight, null );
		assert.strictEqual( param.op.repeat, true );
		assert.strictEqual( param.op.stripe, true );
		// eslint-disable-next-line no-magic-numbers
		assert.strictEqual( param.op.stripe_thickness, 2 );
		$target.markerAnimation( 'destroy' );
	} );
	it( 'override options', function() {
		const $target = $( '#marker-animation2' )
		.data( 'ma_color', 'blue' )
		.data( 'ma_thickness', '0.5em' )
		.data( 'ma_duration', '20.5s' )
		.data( 'ma_font_weight', 'normal' )
		.data( 'ma_repeat', false )
		.data( 'ma_stripe', false );
		$target.markerAnimation( {
			'color': 'red',
			'thickness': '0.3em',
			'duration': '10s',
			'font_weight': null,
			'repeat': true,
			'stripe': true,
			'stripe_thickness': 10,
			'test': true,
		} );
		const param = $target[ 0 ].markerAnimationObj;
		assert.strictEqual( param.op.color, 'blue' );
		assert.strictEqual( param.op.thickness, '0.5em' );
		assert.strictEqual( param.op.duration, '20.5s' );
		assert.strictEqual( param.op.font_weight, 'normal' );
		assert.strictEqual( param.op.repeat, false );
		assert.strictEqual( param.op.stripe, false );
		// eslint-disable-next-line no-magic-numbers
		assert.strictEqual( param.op.stripe_thickness, 10 );
		$target.markerAnimation( 'destroy' );
	} );
	it( 'time option', function() {
		const $target = $( '#marker-animation3' );
		$target.markerAnimation( {
			'delay': ' 0s0',
			'duration': '-0ms ',
			'test': true,
		} );
		const param = $target[ 0 ].markerAnimationObj;
		assert.strictEqual( param.op.delay, '0s' );
		assert.strictEqual( param.op.duration, '0s' );
		$target.markerAnimation( 'destroy' );
	} );
	it( 'time option2', function() {
		const $target = $( '#marker-animation4' );
		$target.markerAnimation( {
			'delay': ' .0s ',
			'duration': '-0.0ms',
			'test': true,
		} );
		const param = $target[ 0 ].markerAnimationObj;
		assert.strictEqual( param.op.delay, '0s' );
		assert.strictEqual( param.op.duration, '0s' );
		$target.markerAnimation( 'destroy' );
	} );
} );

describe( 'destroy test', function() {
	it( 'reset options', function() {
		const css = {
			'padding-bottom': '1px',
			'font-weight': '100',
		};
		const $target = $( '#marker-animation3' ).css( css );
		Object.keys( css ).forEach( function( key ) {
			assert.strictEqual( $target.css( key ), css[ key ] );
		} );
		$target.markerAnimation( { 'test': true } );
		Object.keys( css ).forEach( function( key ) {
			assert.notStrictEqual( $target.css( key ), css[ key ] );
		} );
		$target.markerAnimation( 'destroy' );
		Object.keys( css ).forEach( function( key ) {
			assert.strictEqual( $target.css( key ), css[ key ] );
		} );
	} );
} );

describe( 'filter css', function() {
	it( 'css', function() {
		const filter = {
			'font-weight': 100,
			'color': 'blue',
		};
		const $target = $( '#marker-animation4' );
		$target.markerAnimation( {
			'cssFilter': function( css ) {
				Object.keys( filter ).forEach( function( key ) {
					css[ key ] = filter[ key ];
				} );
				return css;
			},
		} );
		Object.keys( filter ).forEach( function( key ) {
			assert.strictEqual( $target.css( key ), filter[ key ] + '' );
		} );
		$target.markerAnimation( 'destroy' );
	} );
} );