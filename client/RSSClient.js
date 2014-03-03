var request 	= require('request'),
	_ 			= require('lodash'),
	xml2js  	= require('xml2js'),
	processors 	= require('xml2js/lib/processors'),
	Emitter 	= require('events').EventEmitter,
	Submission 	= require('../data/submission.js');

module.exports = function(){

	var xmlParser = new xml2js.Parser({
		explicitRoot: false,
		normalizeTags: true,
		explicitArray: false,
		tagNameProcessors: [processors.stripPrefix]
	});

	var parse = xmlParser.parseString;
	
	var exports = new Emitter;

	exports.query = function(q, cb){
		request.get('http://backend.deviantart.com/rss.xml?type=deviation&q=' + q + '+sort%3Atime+meta%3Aall', function(req, res){
			parse(res.body.toString(), function(err, data){
				cb(err, data.channel);
			});
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

			//Filter the data items
			var items = _.filter(data.item, function(item){

				//Apply medium / submission type filter
				if(options.hasOwnProperty('type')) {
					if(options.type === 'image') {
						return item.hasOwnProperty('content') && item.content['$'].medium === 'image';
					}
					if(options.type === 'note')
						return item.hasOwnProperty('text');
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