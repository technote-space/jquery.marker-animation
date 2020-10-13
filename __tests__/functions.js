/* eslint-disable no-magic-numbers */
import {reset, create, isStatic, getCss, refresh} from '../src/functions';
import {INVIEW_EVENT, RESET_KEYS, ZERO_SEC} from '../src/constants';

const cssValue = Object.assign(...RESET_KEYS.map((key, index) => ({[key]: index})));

describe('reset', () => {
  it('should not reset', () => {
    const attr = jest.fn(() => false);
    const target = {
      attr: attr,
    };
    reset(target);

    expect(attr).toBeCalled();
  });

  it('should reset', () => {
    const attr = jest.fn((key, value) => {
      expect(value === undefined || value === false).toBeTruthy();
      return true;
    });
    const off = jest.fn();
    const target = {
      attr: attr,
      off: off,
      0: {
        resetValues: false,
      },
    };
    reset(target);

    expect(attr).toBeCalledTimes(2);
    expect(off).toBeCalled();
  });

  it('should reset', () => {
    const css = jest.fn((key, value) => {
      expect(cssValue).toHaveProperty(key);
      expect(value).toBe(cssValue[key]);
    });
    const target = {
      attr: () => true,
      off: () => true,
      css: css,
      0: {
        resetValues: cssValue,
      },
    };
    reset(target);

    RESET_KEYS.forEach(key => {
      expect(target[0]).not.toHaveProperty(key);
    });
    expect(css).toBeCalled();
  });
});

describe('create', () => {
  const test = (options, check) => {
    const off = jest.fn();
    const trigger = jest.fn();
    const on = jest.fn((event, callback) => {
      expect(event).toBe(INVIEW_EVENT);
      callback({}, true);
      callback({}, false);
    });
    const data = jest.fn(() => ({
      on: on,
    }));
    const stopCss = jest.fn();
    const stop = jest.fn(() => ({
      css: stopCss,
    }));
    const css = () => ({
      attr: () => {
      },
    });

    create({
      0: {},
      css: css,
      data: data,
      stop: stop,
      off: off,
      trigger: trigger,
    }, options);

    expect(data).toBeCalled();
    expect(on).toBeCalled();
    expect(stop).toBeCalled();
    expect(stopCss).toBeCalled();

    check(off, trigger);
  };

  it('should create', () => {
    test({
      stripe: false,
      repeat: false,
      cssFilter: () => ({}),
    }, (off, trigger) => {
      expect(off).toBeCalled();
      expect(trigger).not.toBeCalled();
    });
  });

  it('should create', () => {
    test({
      stripe: false,
      repeat: true,
      cssFilter: () => ({}),
    }, (off, trigger) => {
      expect(off).not.toBeCalled();
      expect(trigger).toBeCalled();
    });
  });
});

describe('isStatic', () => {
  it('should true', () => {
    expect(isStatic({stripe: true})).toBeTruthy();
    expect(isStatic({stripe: false, delay: ZERO_SEC, duration: ZERO_SEC})).toBeTruthy();
  });

  it('should false', () => {
    expect(isStatic({})).toBeFalsy();
    expect(isStatic({stripe: false, delay: ZERO_SEC, duration: '.6s'})).toBeFalsy();
  });
});

describe('getCss', () => {
  it('should get marker css', () => {
    const css = getCss({
      stripe: false,
      'padding_bottom': 'a',
      'font_weight': 'b',
      thickness: 'c',
      color: 'd',
      cssFilter: css => css,
    });
    expect(css).toHaveProperty('display');
    expect(css).toHaveProperty('background-position');
    expect(css).toHaveProperty('padding-bottom');
    expect(css).toHaveProperty('font-weight');
    expect(css).toHaveProperty('background-size');
    expect(css).toHaveProperty('background-repeat');
    expect(css).toHaveProperty('background-image');
    expect(css['display']).toBe('inline');
    expect(css['background-position']).toBe('left 0 center');
    expect(css['padding-bottom']).toBe('a');
    expect(css['font-weight']).toBe('b');
    expect(css['background-size']).toBe('200% c');
    expect(css['background-repeat']).toBe('repeat-x');
    expect(css['background-image']).toBe('linear-gradient(to right, rgba(255,255,255,0) 50%, d 50%)');
  });

  it('should get marker css', () => {
    const css = getCss({
      stripe: false,
      delay: ZERO_SEC,
      duration: ZERO_SEC,
      'padding_bottom': 'a',
      cssFilter: css => css,
      rtl: true,
    });
    expect(css).toHaveProperty('background-position');
    expect(css['background-position']).toBe('right 0 center');
  });

  it('should get stripe css', () => {
    const cssFilter = jest.fn(css => {
      Object.keys(css).forEach(key => css[key] += '-test');
      return css;
    });
    const css = getCss({
      stripe: true,
      'padding_bottom': 'a',
      thickness: 'b',
      color: 'c',
      'stripe_thickness': 3,
      cssFilter: cssFilter,
    });

    expect(css).toHaveProperty('display');
    expect(css).toHaveProperty('background-position');
    expect(css).toHaveProperty('padding-bottom');
    expect(css).toHaveProperty('background-size');
    expect(css).toHaveProperty('background-repeat');
    expect(css).toHaveProperty('background-image');
    expect(css['display']).toBe('inline-test');
    expect(css['background-position']).toBe('left 0 center-test');
    expect(css['padding-bottom']).toBe('a-test');
    expect(css['background-size']).toBe('100% b-test');
    expect(css['background-repeat']).toBe('no-repeat-test');
    expect(css['background-image']).toBe('repeating-linear-gradient(-45deg, c, c 3px, transparent 3px, transparent 6px)-test');
    expect(cssFilter).toBeCalled();
  });
});

describe('refresh', () => {
  it('should refresh', () => {
    const off = jest.fn();
    const attr = jest.fn();
    const css = jest.fn(key => {
      if (typeof key === 'object') {
        return {attr: attr};
      }
      return cssValue[key];
    });
    const target = {
      off: off,
      css: css,
      attr: () => false,
      0: {},
    };
    refresh(target, {
      stripe: true,
      cssFilter: css => css,
    });

    expect(off).toBeCalled();
    expect(attr).toBeCalled();
    expect(target[0]).toHaveProperty('resetValues');
    RESET_KEYS.forEach((key, index) => {
      expect(target[0].resetValues[key]).toBe(index);
    });
  });
});
