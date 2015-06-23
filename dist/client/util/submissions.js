"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = submissions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _query = require("./query");

var _query2 = _interopRequireDefault(_query);

function submissions(username, optionsOrCb, cb) {

	var options = {};

	if (typeof optionsOrCb === "object") options = optionsOrCb;
	if (typeof optionsOrCb === "function") cb = optionsOrCb;

	if (options.hasOwnProperty("username")) username = options.username;

	if (!username) {
		if (cb) cb(new Error("No username specified, either pass as an option or instanciate client with username"), false);
		return;
	}

	(0, _query2["default"])("by%3A" + username, optionsOrCb, cb);
}

module.exports = exports["default"];