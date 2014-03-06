var request 	= require('request'),
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

	exports.query = function(q, cb){
		request.get('http://backend.deviantart.com/rss.xml?type=deviation&q=' + q + '+sort%3Atime+meta%3Aall', function(req, res){
			parse(res.body.toString(), function(err, data){
				cb(err, data.channel);
			});
		});
	};

	exports.images = function(unameOrCb, cb){
		
		var username = this.username;
		
		if(typeof unameOrCb === "function") {
			cb = unameOrCb;
		} else {
			username = unameOrCb;
		}

		this.submissions(username, {type: 'image'}, function(err, data){
			if(err) {
				cb(err, false);
				return;
			}

			cb(false, data);
		});
	};

	exports.submissions = function(username, objectOrcb, cb) {
		
		options = {};
		if(typeof objectOrcb === "object")
			options = objectOrcb;
		if(typeof objectOrcb === "function")
			cb = objectOrcb;

		this.query('by%3A'+username, function(err, data) {
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
	}

	return exports;
};