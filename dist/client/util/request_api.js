'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = request_api;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _xml2js = require('xml2js');

var _xml2js2 = _interopRequireDefault(_xml2js);

var _URIParser = require('./URIParser');

var _URIParser2 = _interopRequireDefault(_URIParser);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var xmlParser = new _xml2js2['default'].Parser({
	explicitRoot: false,
	normalizeTags: true,
	explicitArray: false,
	tagNameProcessors: [_xml2js.processors.stripPrefix]
});

function request_api(query, optionsOrCb, cb) {

	var options = {};
	if (typeof optionsOrCb === 'object') options = optionsOrCb;
	if (typeof optionsOrCb === 'function') cb = optionsOrCb;

	options.q = query;

	var RssResource = _URIParser2['default'].RssUri(options);

	var request_options = {
		url: RssResource,
		headers: {
			'User-Agent': 'deviantART node.js wrapper by emilkje'
		}
	};

	_request2['default'].get(request_options, function (err, res) {
		if (err) {
			cb(err, false);
			return;
		}

		xmlParser.parseString(res.body.toString(), function (err, data) {
			var channel = data ? data.hasOwnProperty('channel') ? data.channel : null : null;
			// this.emit('query', {query: query, url: request_options.url, response: channel});
			cb(err, channel);
		});
	});
}

;
module.exports = exports['default'];