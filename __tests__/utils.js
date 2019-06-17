/* eslint-disable no-magic-numbers */
import { PREFIX, ZERO_SEC } from '../src/constants';
import { SETTINGS_DEFAULTS } from '../src/defaults';
import { parseTime, parseStripeThickness, getTargetOptions, toSnakeCase, toCamelCase, normalizeArgsKeys, getTargetData } from '../src/utils';

describe( 'parseTime', () => {
	it( 'should parse time', () => {
		expect( parseTime( '0.6s' ) ).toBe( '0.6s' );
		expect( parseTime( '-.6s' ) ).toBe( '-.6s' );
		expect( parseTime( '600ms' ) ).toBe( '600ms' );
	} );

	it( 'should return default', () => {
		expect( parseTime( '' ) ).toBe( ZERO_SEC );
		expect( parseTime( 'abc' ) ).toBe( ZERO_SEC );
		expect( parseTime( '10' ) ).toBe( ZERO_SEC );
	} );
} );

describe( 'parseStripeThickness', () => {
	it( 'should parse stripe thickness', () => {
		expect( parseStripeThickness( 10 ) ).toBe( 10 );
		expect( parseStripeThickness( '10' ) ).toBe( 10 );
		expect( parseStripeThickness( '10em' ) ).toBe( 10 );
	} );

	it( 'should return default', () => {
		expect( parseStripeThickness( '' ) ).toBe( SETTINGS_DEFAULTS.stripeThickness );
		expect( parseStripeThickness( 'abc' ) ).toBe( SETTINGS_DEFAULTS.stripeThickness );
		expect( parseStripeThickness( 'em10' ) ).toBe( SETTINGS_DEFAULTS.stripeThickness );
	} );
} );

describe( 'getTargetOptions', () => {
	const target = data => ( {
		data: jest.fn( key => {
			const _key = key.replace( new RegExp( '^' + PREFIX ), '' );
			return _key in data ? data[ _key ] : undefined;
		} ),
	} );

	it( 'should get target options', () => {
		const options = getTargetOptions( target( {
			// eslint-disable-next-line camelcase
			padding_bottom: '100em',
			stripeThickness: 1000,
			delay: 10,
			duration: '.5ms',
		} ), [ {} ] );
		expect( options ).hasOwnProperty( 'paddingBottom' );
		expect( options ).hasOwnProperty( 'stripeThickness' );
		expect( options ).hasOwnProperty( 'delay' );
		expect( options ).hasOwnProperty( 'duration' );
		expect( options.paddingBottom ).toBe( '100em' );
		expect( options.stripeThickness ).toBe( 1000 );
		expect( options.delay ).toBe( ZERO_SEC );
		expect( options.duration ).toBe( '.5ms' );
	} );

	it( 'should get target options', () => {
		const options = getTargetOptions( target( {
			stripeThickness: '',
			delay: '0.0ms',
		} ), [ { color: 'red' } ] );
		expect( options ).hasOwnProperty( 'stripeThickness' );
		expect( options ).hasOwnProperty( 'delay' );
		expect( options.stripeThickness ).toBe( SETTINGS_DEFAULTS.stripeThickness );
		expect( options.delay ).toBe( ZERO_SEC );
		expect( options.color ).toBe( 'red' );
	} );

	it( 'should get target options', () => {
		const options = getTargetOptions( target( {} ), [] );
		expect( options ).hasOwnProperty( 'fontWeight' );
		expect( options ).hasOwnProperty( 'cssFilter' );
		expect( options.fontWeight ).toBe( SETTINGS_DEFAULTS.fontWeight );
		expect( typeof options.cssFilter ).toBe( 'function' );
		expect( options.cssFilter( 'a' ) ).toBe( 'a' );
	} );
} );

describe( 'toSnakeCase', () => {
	it( 'should convert to snake case', () => {
		expect( toSnakeCase( 'camelCase' ) ).toBe( 'camel_case' );
		expect( toSnakeCase( 'test' ) ).toBe( 'test' );
	} );
} );

describe( 'toCamelCase', () => {
	it( 'should convert to camel case', () => {
		expect( toCamelCase( 'snake_case' ) ).toBe( 'snakeCase' );
		expect( toCamelCase( 'kebab-case' ) ).toBe( 'kebabCase' );
		expect( toCamelCase( 'test' ) ).toBe( 'test' );
	} );
} );

describe( 'normalizeArgsKeys', () => {
	it( 'should normalize args keys', () => {
		// eslint-disable-next-line camelcase
		expect( normalizeArgsKeys( { snake_case: 1 } ) ).hasOwnProperty( 'snakeCase' );
		expect( normalizeArgsKeys( { camelCase: 1 } ) ).hasOwnProperty( 'camelCase' );
		expect( normalizeArgsKeys( { test: 1 } ) ).hasOwnProperty( 'test' );
	} );
} );

describe( 'getTargetData', () => {
	it( 'should get target data', () => {
		// eslint-disable-next-line camelcase
		const data = { test_key1: 1, testKey2: 2 };
		const keys = { testKey1: 'test_key1', testKey2: 'testKey2' };
		const target = {
			data: jest.fn( key => {
				const _key = key.replace( new RegExp( '^' + PREFIX ), '' );
				return _key in data ? data[ _key ] : undefined;
			} ),
		};

		Object.keys( keys ).forEach( key => expect( getTargetData( target, key ) ).toBe( data[ keys[ key ] ] ) );
	} );
} );
