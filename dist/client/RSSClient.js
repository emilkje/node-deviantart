/* @flow */
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _events = require('events');

var _utilQuery = require('./util/query');

var _utilQuery2 = _interopRequireDefault(_utilQuery);

var _utilRequest_api = require('./util/request_api');

var _utilRequest_api2 = _interopRequireDefault(_utilRequest_api);

var _utilSubmissions = require('./util/submissions');

var _utilSubmissions2 = _interopRequireDefault(_utilSubmissions);

var RSSClient = (function (_Emitter) {
	function RSSClient(username) {
		var _this = this;

		_classCallCheck(this, RSSClient);

		var emitter = _get(Object.getPrototypeOf(RSSClient.prototype), 'constructor', this).call(this);
		this.username = username || false;

		this.query = function (q, optionsOrCb, cb) {

			var options = {};

			if (typeof optionsOrCb === 'object') options = optionsOrCb;

			if (typeof optionsOrCb === 'function') cb = optionsOrCb;

			(0, _utilQuery2['default'])(q, options, cb);
		};

		this.submissions = function (optionsOrCb, cb) {
			(0, _utilSubmissions2['default'])(_this.username, optionsOrCb, cb);
		};

		this.images = function (optionsOrCb, cb) {

			var options = {};

			if (typeof optionsOrCb === 'object') options = optionsOrCb;

			if (typeof optionsOrCb === 'function') cb = optionsOrCb;

			options.type = 'image';

			(0, _utilSubmissions2['default'])(_this.username, options, cb);
		};
	}

	_inherits(RSSClient, _Emitter);

	return RSSClient;
})(_events.EventEmitter);

exports.RSSClient = RSSClient;