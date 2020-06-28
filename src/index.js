require('jquery-inview');
import $ from 'jquery';
import {setup} from './setup';

$.fn.markerAnimation = function(...args) {
  return this.each(function() {
    setup($(this), args);
  });
};
