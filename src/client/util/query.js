import request_api from './request_api'
import filters from './submission_filter'
import _ from 'lodash'
import Submission from '../data/submission'

export default function query(q, optionsOrCb, cb) {

	let options = {};
	if(typeof optionsOrCb === "object")
		options = optionsOrCb;
	if(typeof optionsOrCb === "function")
		cb = optionsOrCb;

	request_api(q, options, function(err, data) {
		if(err) {
			cb(err, false);
			return;
		}

		let items = _.filter(data.item, function(item){

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
