
deviantART API wrapper in Node.js
=================================

Work in progress.

Install
-------

	npm install git://github.com/emilkje/node-deviantart.git


Example
-------

	var deviantart = require('deviantart'),
	client = new deviantart.RSSClient;

	client.submissions('emilkje', {type: 'image'}, function(err, data){
		if(err) throw err;
		console.dir(data);
	});


Testing
-------

	make test


TODO:
-----

* Improve RSSClient to handle single submissions (data streams etc.)
* Add sta.sh client for uploads and asset management
* Mock HTTP-requests in test cases (currently throws timesout on large requests)
* Move options from submission() to query()
* More
