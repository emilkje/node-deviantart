'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = query;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _request_api = require('./request_api');

var _request_api2 = _interopRequireDefault(_request_api);

var _submission_filter = require('./submission_filter');

var _submission_filter2 = _interopRequireDefault(_submission_filter);

var _dataSubmission = require('../data/submission');

var _dataSubmission2 = _interopRequireDefault(_dataSubmission);

function query(q, optionsOrCb, cb) {

	var options = {};
	if (typeof optionsOrCb === 'object') options = optionsOrCb;
	if (typeof optionsOrCb === 'function') cb = optionsOrCb;

	(0, _request_api2['default'])(q, options, function (err, data) {
		if (err) {
			cb(err, false);
			return;
		}

		var items = _lodash2['default'].filter(data.item, function (item) {

			//Apply type / submission medium filter
			if (options.hasOwnProperty('type')) {
				if (options.type === 'image') {
					return _submission_filter2['default'].image(item);
				}
				if (options.type === 'note') return _submission_filter2['default'].note(item);
			}

			return true;
		});

		var submissions = [];
		items.forEach(function (raw_item) {
			var submission = new _dataSubmission2['default'](raw_item);
			submissions.push(submission);
		});

		cb(false, submissions);
	});
}

;
module.exports = exports['default'];