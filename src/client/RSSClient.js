import request 		from 'request'
import _ 					from 'lodash'
import xml2js  		from 'xml2js'
import processors from 'xml2js/lib/processors'
import {EventEmitter as Emitter} 	from 'events'
import Submission from './data/submission'
import URIParser 	from './util/URIParser'
import query 			from './util/query'
import request_api from './util/request_api'
import submissions from './util/submissions'

export class RSSClient extends Emitter {

	constructor(username) {
		var emitter = super()
		this.username = username || false

		this.query = (q, optionsOrCb, cb) => {
			var options = {}
			if(typeof optionsOrCb === "object")
				options = optionsOrCb
			if(typeof optionsOrCb === "function")
				cb = optionsOrCb

			query(q, options, cb);
		}

		this.submissions = (optionsOrCb, cb) => {
			submissions(this.username, optionsOrCb, cb)
		}

		this.images = (optionsOrCb, cb) => {

			var options = {}
			if(typeof optionsOrCb === "object")
				options = optionsOrCb
			if(typeof optionsOrCb === "function")
				cb = optionsOrCb

			options.type = 'image'

			submissions(this.username, options, cb)
		}
	}

}
