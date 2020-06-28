/* eslint-disable no-magic-numbers */
import {PREFIX, ZERO_SEC} from '../src/constants';
import {SETTINGS_DEFAULTS} from '../src/defaults';
import {parseTime, parseStripeThickness, getTargetOptions, toSnakeCase, toCamelCase} from '../src/utils';

describe('parseTime', () => {
  it('should parse time', () => {
    expect(parseTime('0.6s')).toBe('0.6s');
    expect(parseTime('-.6s')).toBe('-.6s');
    expect(parseTime('600ms')).toBe('600ms');
  });

  it('should return default', () => {
    expect(parseTime('')).toBe(ZERO_SEC);
    expect(parseTime('abc')).toBe(ZERO_SEC);
    expect(parseTime('10')).toBe(ZERO_SEC);
  });
});

describe('parseStripeThickness', () => {
  it('should parse stripe thickness', () => {
    expect(parseStripeThickness(10)).toBe(10);
    expect(parseStripeThickness('10')).toBe(10);
    expect(parseStripeThickness('10em')).toBe(10);
  });

  it('should return default', () => {
    expect(parseStripeThickness('')).toBe(SETTINGS_DEFAULTS.stripe_thickness);
    expect(parseStripeThickness('abc')).toBe(SETTINGS_DEFAULTS.stripe_thickness);
    expect(parseStripeThickness('em10')).toBe(SETTINGS_DEFAULTS.stripe_thickness);
  });
});

describe('getTargetOptions', () => {
  const target = data => ({
    data: jest.fn(key => {
      const _key = key.replace(new RegExp('^' + PREFIX), '');
      return _key in data ? data[_key] : undefined;
    }),
  });

  it('should get target options', () => {
    const options = getTargetOptions(target({
      'padding_bottom': '100em',
      'stripe_thickness': 1000,
      delay: 10,
      duration: '.5ms',
    }), []);
    expect(options).toHaveProperty('padding_bottom');
    expect(options).toHaveProperty('stripe_thickness');
    expect(options).toHaveProperty('delay');
    expect(options).toHaveProperty('duration');
    expect(options.padding_bottom).toBe('100em');
    expect(options.stripe_thickness).toBe(1000);
    expect(options.delay).toBe(ZERO_SEC);
    expect(options.duration).toBe('.5ms');
  });

  it('should get target options', () => {
    const options = getTargetOptions(target({
      'stripe_thickness': '',
      delay: '0.0ms',
    }), [{color: 'red'}]);
    expect(options).toHaveProperty('stripe_thickness');
    expect(options).toHaveProperty('delay');
    expect(options).toHaveProperty('font_weight');
    expect(options).toHaveProperty('cssFilter');
    expect(options.stripe_thickness).toBe(SETTINGS_DEFAULTS.stripe_thickness);
    expect(options.delay).toBe(ZERO_SEC);
    expect(options.color).toBe('red');
    expect(options.font_weight).toBe(SETTINGS_DEFAULTS.font_weight);
    expect(typeof options.cssFilter).toBe('function');
    expect(options.cssFilter('a')).toBe('a');
  });
});

describe('toSnakeCase', () => {
  it('should convert to snake case', () => {
    expect(toSnakeCase('camelCase')).toBe('camel_case');
    expect(toSnakeCase('test')).toBe('test');
  });
});

describe('toCamelCase', () => {
  it('should convert to camel case', () => {
    expect(toCamelCase('snake_case')).toBe('snakeCase');
    expect(toCamelCase('kebab-case')).toBe('kebabCase');
    expect(toCamelCase('test')).toBe('test');
  });
});
