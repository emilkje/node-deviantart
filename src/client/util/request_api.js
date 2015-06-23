import xml2js, {processors} from 'xml2js'
import URIParser 						from './URIParser'
import request 							from 'request'

let xmlParser = new xml2js.Parser({
	explicitRoot: false,
	normalizeTags: true,
	explicitArray: false,
	tagNameProcessors: [processors.stripPrefix]
})

export default function request_api (query, optionsOrCb, cb){

	let options = {}

	if(typeof optionsOrCb === "object")
		options = optionsOrCb
	if(typeof optionsOrCb === "function")
		cb = optionsOrCb

	options.q = query


	let RssResource = URIParser(options)

	let request_options = {
		url: RssResource,
		headers: {
			'User-Agent': 'deviantART node.js wrapper by emilkje'
		}
	}

	request.get(request_options, (err, res) => {
		if(err) {
			cb(err, false)
			return
		}

		xmlParser.parseString(res.body.toString(), (err, data) => {
			let channel = (data ? (data.hasOwnProperty('channel') ? data.channel : null) : null)
			cb(err, channel, {query: query, url: request_options.url, response: channel})
		})
	})
}
