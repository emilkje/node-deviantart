'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = {

	image: function image(item) {
		return item.hasOwnProperty('content') && item.content['$'].medium === 'image';
	},

	note: function note(item) {
		return item.hasOwnProperty('text');
	}

};
module.exports = exports['default'];