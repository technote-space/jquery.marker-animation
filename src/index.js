require('jquery-inview');
import $ from 'jquery';
import { setup } from './setup';

$.fn.markerAnimation = (...args) => {
	return this.each(() => setup($(this), args));
};
