
function RssUriParser(options) {

	var base = "http://backend.deviantart.com/rss.xml";

	var url = base;

	//Add type
	var type = options.querytype || 'deviation';
	url += '?type='+type;

	//prepare query
	var query = "&q=";

	options.sort = options.sort || {
		type: 'popular',
		max_age: '24h'
	};

	if(options.sort.type === "popular") {
		query += "boost%3Apopular+"
	}

	//Add actual query to the q var
	query += options.q;


	//Apply max age if sort type is "popular"
	if(options.sort.type === "popular") {
		options.sort.max_age = options.sort.max_age || '24h';
		query += "+max_age%3A" + options.sort.max_age;
	}

	if(options.sort.type === "new")
		query += "+sort%3Atime";

	var meta = options.meta || 'all';
	query += "+meta%3A" + meta;

	//add query
	url += query;

	return url;
}

module.exports = {

	RssUri: RssUriParser
}