'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var Submission = (function () {
	function Submission(data) {
		_classCallCheck(this, Submission);

		this.title = data.title[0];

		this.link = data.link;

		this.perma = data.guid._;

		this.pubdate = data.pubdate;

		this.keywords = data.keywords.split(' ');

		this.rating = data.rating;

		this.category = { id: data.category._, label: data.category['$'].label };

		this.credit = {
			username: data.credit[0]._,
			avatar: data.credit[1]._,
			role: data.credit[0]['$'].role
		};

		this.copyright = {
			text: data.copyright._,
			url: data.copyright['$'].url
		};

		this.license = data.license;

		this.description = {
			content: data.description[0]._.trim(),
			type: data.description[0]['$'].type
		};

		this.thumbnail = data.hasOwnProperty('thumbnail') === false ? null : {
			small: {
				url: data.thumbnail[0]['$'].url,
				height: data.thumbnail[0]['$'].height,
				width: data.thumbnail[0]['$'].width
			},
			medium: {
				url: data.thumbnail[2]['$'].url,
				height: data.thumbnail[2]['$'].height,
				width: data.thumbnail[2]['$'].width
			},
			large: {
				url: data.thumbnail[1]['$'].url,
				height: data.thumbnail[1]['$'].height,
				width: data.thumbnail[1]['$'].width
			}
		};

		this.content = data.hasOwnProperty('content') ? data.content['$'] : null;
		this.text = data.hasOwnProperty('text') ? data.text._ : null;
	}

	_createClass(Submission, [{
		key: 'stream',
		value: function stream() {
			return (0, _request2['default'])(this.content.url);
		}
	}]);

	return Submission;
})();

exports['default'] = Submission;
module.exports = exports['default'];