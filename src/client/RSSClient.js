var request 	= require('request'),
	_ 			= require('lodash'),
	xml2js  	= require('xml2js'),
	processors 	= require('xml2js/lib/processors'),
	Emitter 	= require('events').EventEmitter,
	Submission 	= require('./data/submission'),
	URIParser = require('./util/URIParser');

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

	var request_api = function(query, optionsOrCb, cb){

		options = {};
		if(typeof optionsOrCb === "object")
			options = optionsOrCb;
		if(typeof optionsOrCb === "function")
			cb = optionsOrCb;

		options.q = query;
		

		var RssResource = URIParser.RssUri(options);
		
		var request_options = {
			url: RssResource,
			headers: {
				'User-Agent': 'deviantART node.js wrapper by emilkje'
			}
		}
		 
		request.get(request_options, function(err, res){
			if(err) {
				cb(err, false);
				return;
			}

			parse(res.body.toString(), function(err, data){
				exports.emit('query', {query: query, url: request_options.url, response: data.channel});
				cb(err, data.channel);
			});
		});
	};

	var query = function(q, optionsOrCb, cb) {
		
		options = {};
		if(typeof optionsOrCb === "object")
			options = optionsOrCb;
		if(typeof optionsOrCb === "function")
			cb = optionsOrCb;

		request_api(q, options, function(err, data) {
			if(err) {
				cb(err, false);
				return;
			}

			var filters = require('./util/submission_filter');

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

	exports.query = function(q, optionsOrCb, cb) {
		var options = {};
		if(typeof optionsOrCb === "object")
			options = optionsOrCb;
		if(typeof optionsOrCb === "function")
			cb = optionsOrCb;

		query(q, options, function(err, data){
			if(err) {
				if(cb)
					cb(err, false);
				return;
			}

			if(cb)
				cb(false, data);
		});
	}

	exports.submissions = function(optionsOrCb, cb) {
		
		var username = this.username || false;
		
		var options = {};
		if(typeof optionsOrCb === "object")
			options = optionsOrCb;
		if(typeof optionsOrCb === "function")
			cb = optionsOrCb;

		if(options.hasOwnProperty("username"))
			username = options.username;

		if(!username) {
			if(cb)
				cb(new Error("No username specified, either pass as an option or instanciate client with username"), false);
			return;
		}

		this.query('by%3A'+this.username, optionsOrCb, cb);
	}

	exports.images = function(optionsOrCb, cb){
		
		var options = {};
		if(typeof optionsOrCb === "object")
			options = optionsOrCb;
		if(typeof optionsOrCb === "function")
			cb = optionsOrCb;

		options.type = 'image';

		this.submissions(options, cb);
	};

	return exports;
};