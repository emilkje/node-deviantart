import request 		from 'request'
import _ 					from 'lodash'
import xml2js  		from 'xml2js'
import processors from 'xml2js/lib/processors'
import {EventEmitter as Emitter} 	from 'events'
import Submission from './data/submission'
import URIParser 	from './util/URIParser'
import query 			from './util/query'
import request_api from './util/request_api'

let submissions = (username, optionsOrCb, cb) => {

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

	query('by%3A'+username, optionsOrCb, cb);
}

export class RSSClient extends Emitter {

	constructor(username) {
		var emitter = super()
		this.username = username || false
	}

	query(q, optionsOrCb, cb) {
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

	images(optionsOrCb, cb){

		var options = {};
		if(typeof optionsOrCb === "object")
			options = optionsOrCb;
		if(typeof optionsOrCb === "function")
			cb = optionsOrCb;

		options.type = 'image';
		options.username = this.username || false
		submissions(options.username, options, cb);
	};
}
