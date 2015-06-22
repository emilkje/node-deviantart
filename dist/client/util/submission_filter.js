'use strict';

module.exports = {

	image: function image(item) {
		return item.hasOwnProperty('content') && item.content['$'].medium === 'image';
	},

	note: function note(item) {
		return item.hasOwnProperty('text');
	}

};