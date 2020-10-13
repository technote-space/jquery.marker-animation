import {RESET_KEYS, MARKER_DATA, ZERO_SEC, NAMESPACE, INVIEW_EVENT, REFRESH_EVENT} from './constants';

/**
 * @param {object} target target
 * @returns {object} target
 */
export const reset = target => {
  if (target.attr(MARKER_DATA)) {
    destroy(target);
    removeEvent(target);
  }
  return target;
};

/**
 * @param {object} target target
 * @returns {object} target
 */
export const destroy = target => {
  if (target[0].resetValues) {
    RESET_KEYS.forEach(key => {
      target.css(key, target[0].resetValues[key]);
    });
    delete target[0].resetValues;
  }
  target.attr(MARKER_DATA, false);
  return target;
};

/**
 * @param {object} target target
 * @param {object} options options
 * @returns {object} target
 */
export const create = (target, options) => {
  target[0].resetValues = {};
  RESET_KEYS.forEach(key => target[0].resetValues[key] = target.css(key));

  if (!isStatic(options)) {
    target.data('inview', false).on(INVIEW_EVENT, (event, isInView) => {
      if (isInView) {
        onInView(target, options);
      } else {
        offInView(target, options);
      }
    });
  }
  target.css(getCss(options)).attr(MARKER_DATA, true);
  return target;
};

/**
 * @param {object} options options
 * @returns {boolean} is static?
 */
export const isStatic = options => options.stripe || (ZERO_SEC === options.delay && ZERO_SEC === options.duration);

/**
 * @param {object} options options
 * @returns {object} css
 */
export const getCss = options => options.cssFilter(options.stripe ? getStripeCss(options) : getMarkerCss(options));

/**
 * @param {object} options options
 * @returns {string} direction
 */
const getDirection = options => options.rtl ? 'right' : 'left';

/**
 * @param {object} options options
 * @returns {string} percentage
 */
const getStartPercentage = options => options.rtl ? '0' : '-100%';

/**
 * @param {object} options options
 * @returns {string} percentage
 */
const getGoalPercentage  = options => options.rtl ? '100%' : '0';

/**
 * @param {object} options options
 * @returns {object} css
 */
const getCommonCss = options => Object.assign({
  'display': 'inline',
  'background-position': `${getDirection(options)} ${getGoalPercentage(options)} center`,
  'padding-bottom': options.padding_bottom,
}, options.font_weight ? {
  'font-weight': options.font_weight,
} : {});

/**
 * @param {object} options options
 * @returns {object} css
 */
const getMarkerCss = options => Object.assign({}, getCommonCss(options), {
  'background-size': `200% ${options.thickness}`,
  'background-repeat': 'repeat-x',
  'background-image': `linear-gradient(to right, rgba(255,255,255,0) 50%, ${options.color} 50%)`,
}, isStatic(options) ? {
  'background-position': `${getDirection(options)} ${getStartPercentage(options)} center`,
} : {});

/**
 * @param {object} options options
 * @returns {object} css
 */
const getStripeCss = options => Object.assign({}, getCommonCss(options), {
  'background-size': `100% ${options.thickness}`,
  'background-repeat': 'no-repeat',
  // eslint-disable-next-line no-magic-numbers
  'background-image': `repeating-linear-gradient(-45deg, ${options.color}, ${options.color} ${options.stripe_thickness}px, transparent ${options.stripe_thickness}px, transparent ${options.stripe_thickness * 2}px)`,
});

/**
 * @param {object} target target
 * @param {object} options options
 * @returns {object} target
 */
export const refresh = (target, options) => {
  destroy(target);
  stop(target);
  return create(target, options);
};

/**
 * @param {object} target target
 * @returns {object} target
 */
export const removeEvent = target => {
  target.off(`.${NAMESPACE}`);
  return target;
};

/**
 * @param {object} target target
 * @returns {object} target
 */
export const stop = target => {
  target.off(INVIEW_EVENT);
  return target;
};

/**
 * @param {object} target target
 * @param {object} options options
 * @returns {object} target
 */
export const onInView = (target, options) => {
  target.stop(true, true).css({
    transition: `background-position ${options.duration} ${options.function} ${options.delay}`,
    'background-position': `${getDirection(options)} ${getStartPercentage(options)} center`,
  });
  if (!options.repeat) {
    stop(target);
  }
  return target;
};

/**
 * @param {object} target target
 * @param {object} options options
 * @returns {object} target
 */
export const offInView = (target, options) => {
  if (options.repeat) {
    target.trigger(REFRESH_EVENT);
  }
  return target;
};
