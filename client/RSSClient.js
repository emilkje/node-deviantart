var request 	= require('request'),
	Q 			= require('q'),
	_ 			= require('lodash'),
	xml2js  	= require('xml2js'),
	processors 	= require('xml2js/lib/processors'),
	Emitter 	= require('events').EventEmitter,
	Submission 	= require('./data/submission.js');

module.exports = function(username){

	var xmlParser = new xml2js.Parser({
		explicitRoot: false,
		normalizeTags: true,
		explicitArray: false,
		tagNameProcessors: [processors.stripPrefix]
	});

	var parse = xmlParser.parseString;
	
	var exports = new Emitter;

	exports.username = username || false;

	var query = function(query, cb){
		var url = 'http://backend.deviantart.com/rss.xml?type=deviation&q=' + query + '+sort%3Atime+meta%3Aall';

		request.get(url, function(req, res){
			parse(res.body.toString(), function(err, data){
				exports.emit('query', {query: query, url: url, response: data.channel});
				cb(err, data.channel);
			});
		});
	};

	var submissions = function(username, optionsOrCb, cb) {
		
		options = {};
		if(typeof optionsOrCb === "object")
			options = optionsOrCb;
		if(typeof optionsOrCb === "function")
			cb = optionsOrCb;

		query('by%3A'+username, function(err, data) {
			if(err) {
				cb(err, false);
				return;
			}

			var filters = require('./filter/submission');

			items = _.filter(data.item, function(item){

				//Apply type / submission medium filter
				if(options.hasOwnProperty('type')) {
					if(options.type === 'image') {
						return filters.image(item);
					}
					if(options.type === 'note')
						return filters.note(item);
				}

				return true;
			});

			var submissions = [];
			items.forEach(function(raw_item){
				var submission = new Submission(raw_item);
				submissions.push(submission);
			});

			cb(false, submissions);
		});
	};

	exports.submissions = function(optionsOrCb, cb) {
		
		var options = {};
		if(typeof optionsOrCb === "object")
			options = optionsOrCb;
		if(typeof optionsOrCb === "function")
			cb = optionsOrCb;

		submissions(this.username, options, function(err, data) {
			if(err) {
				cb(err, false);
				return;
			}

			cb(false, data);
		});
	}

	exports.images = function(optionsOrCb, cb){
		
		var options = {};
		if(typeof optionsOrCb === "object")
			options = optionsOrCb;
		if(typeof optionsOrCb === "function")
			cb = optionsOrCb;

		options.type = 'image';

		this.submissions(options, function(err, data){
			if(err) {
				if(cb)
					cb(err, false);
				return;
			}

			if(cb)
				cb(false, data);
		});
	};

	return exports;
};