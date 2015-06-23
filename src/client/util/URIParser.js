
export default function UriParser(options) {

	let url = "http://backend.deviantart.com/rss.xml"

	//Add type
	let type = options.querytype || 'deviation'
	url += '?type='+type

	//prepare query
	let query = "&q="

	options.sort = options.sort || {
		type: 'popular',
		max_age: '24h'
	}

	if(options.sort.type === "popular") {
		query += "boost%3Apopular+"
	}

	//Add actual query to the q
	query += options.q


	//Apply max age if sort type is "popular"
	if(options.sort.type === "popular") {
		options.sort.max_age = options.sort.max_age || '24h'
		query += "+max_age%3A" + options.sort.max_age
	}

	if(options.sort.type === "new")
		query += "+sort%3Atime"

	let meta = options.meta || 'all';
	query += "+meta%3A" + meta

	//add query
	url += query

	return url
}
