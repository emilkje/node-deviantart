import query from './query'

export default function submissions (username, optionsOrCb, cb) {

	let options = {}

	if(typeof optionsOrCb === "object")
		options = optionsOrCb
	if(typeof optionsOrCb === "function")
		cb = optionsOrCb

	if(options.hasOwnProperty("username"))
		username = options.username

	if(!username) {
		if(cb)
			cb(new Error("No username specified, either pass as an option or instanciate client with username"), false)
		return;
	}

	query('by%3A'+username, optionsOrCb, cb)
}
