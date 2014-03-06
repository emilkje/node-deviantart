var request = require('request');

module.exports = function Submission(data) {

	this.title = data.title[0];
	
	this.link = data.link; 
	
	this.perma = data.guid._;
	
	this.pubdate = data.pubdate;
	
	this.keywords = data.keywords.split(' ');
	
	this.rating = data.rating;
	
	this.category = {id: data.category._, label: data.category['$'].label};
	
	this.credit = {
		username: data.credit[0]._,
		avatar: data.credit[1]._,
		role: data.credit[0]['$'].role
	};
	
	this.copyright = {
		text: data.copyright._,
		url: data.copyright['$'].url
	};
	
	this.license = data.license;
	
	this.description = {
		content: data.description[0]._.trim(),
		type: data.description[0]['$'].type
	};

	this.thumbnail = data.hasOwnProperty('thumbnail') === false ? null : {
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

	this.content = data.hasOwnProperty('content') ? data.content['$'] : null;
	this.text = data.hasOwnProperty('text') ? data.text._ : null;
}

module.exports.prototype.stream = function(){
	return request(this.content.url);
};