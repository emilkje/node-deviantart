'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _clientRSSClient = require('./client/RSSClient');

if (process.env.NODE_ENV == "dev") require('longjohn');

exports.Client = _clientRSSClient.RSSClient;