import {PREFIX, ZERO_SEC} from './constants';
import {SETTINGS_DEFAULTS} from './defaults';

/**
 * @param {string} value value
 * @returns {string} time
 */
export const parseTime = value => !/^-?\d*\.?\d+m?s$/.test(value) || /^-?0?\.?0+m?s$/.test(value) ? ZERO_SEC : value;

/**
 * @param {string|number} value value
 * @returns {number} thickness
 */
export const parseStripeThickness = value => isNaN(parseInt(value, 10)) ? SETTINGS_DEFAULTS.stripe_thickness : parseInt(value);

/**
 * @param {object} target target
 * @param {Array} args args
 * @returns {object} options
 */
export const getTargetOptions = (target, args) => {
  const options = Object.assign({}, args.length && typeof args[0] === 'object' ? args[0] : {});
  const filters = {
    'delay': parseTime,
    'duration': parseTime,
    'stripe_thickness': parseStripeThickness,
  };
  Object.keys(SETTINGS_DEFAULTS).forEach(key => {
    const data = target.data(PREFIX + key);
    if (isScalar(data) && key in filters) {
      options[key] = filters[key](data);
    } else if (undefined !== data) {
      options[key] = data;
    }
  });
  return Object.assign({}, SETTINGS_DEFAULTS, options);
};

/**
 * @param {*} value value
 * @returns {boolean} is scalar?
 */
export const isScalar = value => {
  const type = typeof value;
  return 'string' === type || 'number' === type || 'boolean' === type;
};

/**
 * @param {string} string target string
 * @returns {string} snake case
 */
export const toSnakeCase = string => string.replace(/[\w]([A-Z])/g, matches => `${matches[0]}_${matches[1]}`).toLowerCase();

/**
 * @param {string} string target string
 * @returns {string} camel case
 */
export const toCamelCase = string => string.replace('-', '_').replace(/(_\w)/g, matches => matches[1].toUpperCase());
