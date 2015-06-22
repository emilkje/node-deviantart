'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _xml2js = require('xml2js');

var _xml2js2 = _interopRequireDefault(_xml2js);

var _xml2jsLibProcessors = require('xml2js/lib/processors');

var _xml2jsLibProcessors2 = _interopRequireDefault(_xml2jsLibProcessors);

var _events = require('events');

var _dataSubmission = require('./data/submission');

var _dataSubmission2 = _interopRequireDefault(_dataSubmission);

var _utilURIParser = require('./util/URIParser');

var _utilURIParser2 = _interopRequireDefault(_utilURIParser);

var _utilQuery = require('./util/query');

var _utilQuery2 = _interopRequireDefault(_utilQuery);

var _utilRequest_api = require('./util/request_api');

var _utilRequest_api2 = _interopRequireDefault(_utilRequest_api);

var submissions = function submissions(username, optionsOrCb, cb) {

	var options = {};
	if (typeof optionsOrCb === 'object') options = optionsOrCb;
	if (typeof optionsOrCb === 'function') cb = optionsOrCb;

	if (options.hasOwnProperty('username')) username = options.username;

	if (!username) {
		if (cb) cb(new Error('No username specified, either pass as an option or instanciate client with username'), false);
		return;
	}

	(0, _utilQuery2['default'])('by%3A' + username, optionsOrCb, cb);
};

var RSSClient = (function (_Emitter) {
	function RSSClient(username) {
		_classCallCheck(this, RSSClient);

		var emitter = _get(Object.getPrototypeOf(RSSClient.prototype), 'constructor', this).call(this);
		this.username = username || false;
	}

	_inherits(RSSClient, _Emitter);

	_createClass(RSSClient, [{
		key: 'query',
		value: function query(q, optionsOrCb, cb) {
			var options = {};
			if (typeof optionsOrCb === 'object') options = optionsOrCb;
			if (typeof optionsOrCb === 'function') cb = optionsOrCb;

			(0, _utilQuery2['default'])(q, options, function (err, data) {
				if (err) {
					if (cb) cb(err, false);
					return;
				}

				if (cb) cb(false, data);
			});
		}
	}, {
		key: 'images',
		value: function images(optionsOrCb, cb) {

			var options = {};
			if (typeof optionsOrCb === 'object') options = optionsOrCb;
			if (typeof optionsOrCb === 'function') cb = optionsOrCb;

			options.type = 'image';
			options.username = this.username || false;
			submissions(options.username, options, cb);
		}
	}]);

	return RSSClient;
})(_events.EventEmitter);

exports.RSSClient = RSSClient;