'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _clientRSSClient = require('../client/RSSClient');

var _clientRSSClient2 = _interopRequireDefault(_clientRSSClient);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var user = process.argv[2] || 'emilkje';
var client = new _clientRSSClient2['default'](user);

var mkdirSync = function mkdirSync(path) {
	try {
		_fs2['default'].mkdirSync(path);
	} catch (e) {
		if (e.code != 'EEXIST') throw e;
	}
};

client.images(function (err, images) {
	if (err) {
		console.dir(err);
	}

	images.forEach(function (image) {
		mkdirSync('images');
		image.stream().pipe(_fs2['default'].createWriteStream('./images/' + image.title + '_by_' + image.copyright.text + '.jpg'));
	});

	console.log('saved ' + user + 's photos in images/');
});