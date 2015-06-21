
module.exports = {

	image: function(item) {
		return item.hasOwnProperty('content') && item.content['$'].medium === 'image';
	},

	note: function(item) {
		return item.hasOwnProperty('text');
	}

}