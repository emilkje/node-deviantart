var RSSClient = require('./client/RSSClient');

if(process.env.NODE_ENV !== "production")
	require('longjohn');

module.exports.RSSClient = RSSClient;