module.exports = function(data) {

	var e = {};

	e.title = data.title[0];
	
	e.link = data.link; 
	
	e.perma = data.guid._;
	
	e.pubdate = data.pubdate;
	
	e.keywords = data.keywords.split(' ');
	
	e.rating = data.rating;
	
	e.category = {id: data.category._, label: data.category['$'].label};
	
	e.credit = {
		username: data.credit[0]._,
		avatar: data.credit[1]._,
		role: data.credit[0]['$'].role
	};
	
	e.copyright = {
		text: data.copyright._,
		url: data.copyright['$'].url
	};
	
	e.license = data.license;
	
	e.description = {
		content: data.description[0]._.trim(),
		type: data.description[0]['$'].type
	};

	e.thumbnail = data.hasOwnProperty('thumbnail') === false ? null : {
		small: {
			url: data.thumbnail[0]['$'].url,
			height: data.thumbnail[0]['$'].height,
			width: data.thumbnail[0]['$'].width
		},
		medium: {
			url: data.thumbnail[2]['$'].url,
			height: data.thumbnail[2]['$'].height,
			width: data.thumbnail[2]['$'].width
		},
		large: {
			url: data.thumbnail[1]['$'].url,
			height: data.thumbnail[1]['$'].height,
			width: data.thumbnail[1]['$'].width
		}
	};

	e.content = data.hasOwnProperty('content') ? data.content['$'] : null;
	e.text = data.hasOwnProperty('text') ? data.text._ : null;

	return e;
}