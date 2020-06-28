import {DESTROY_EVENT, REFRESH_EVENT} from './constants';
import {reset, create, destroy, removeEvent, refresh} from './functions';
import {getTargetOptions} from './utils';

/**
 * @param {object} target target
 * @param {Array} args args
 * @returns {object} target
 */
export const setup = (target, args) => {
  if (args.length && typeof args[0] === 'string') {
    if ('destroy' === args[0]) {
      triggerDestroy(target);
      return target;
    }
    if ('refresh' === args[0]) {
      triggerRefresh(target);
      return target;
    }
  }

  reset(target);

  const options = getTargetOptions(target, args);
  create(target, options);
  setupEvents(target, options);
  return target;
};

/**
 * @param {object} target target
 * @returns {*} triggered
 */
const triggerDestroy = target => target.trigger(DESTROY_EVENT);

/**
 * @param {object} target target
 * @returns {*} triggered
 */
const triggerRefresh = target => target.trigger(REFRESH_EVENT);

/**
 * @param {object} target target
 * @param {object} options options
 */
const setupEvents = (target, options) => {
  target.on(DESTROY_EVENT, () => {
    destroy(target);
    removeEvent(target);
  }).on(REFRESH_EVENT, () => {
    refresh(target, options);
  });
};
