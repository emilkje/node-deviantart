var RSSClient = require('./client/RSSClient');

if(process.env.NODE_ENV == "dev")
	require('longjohn');

module.exports.RSSClient = RSSClient;
