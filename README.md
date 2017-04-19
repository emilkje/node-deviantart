
deviantART API wrapper in Node.js ![Build status](https://api.travis-ci.org/emilkje/node-deviantart.svg?branch=master)
=================================

Work in progress.

Install
-------

`npm install node-deviantart` or `yarn add node-deviantart`


Example
-------

```javascript
import { Client } from 'node-deviantart';
const client = new Client();

client.submissions({username: 'emilkje', type: 'image'}, (err, data) => {
	if(err) throw err;
	console.dir(data);
});
```

You can also attach you username directly to the client
```javascript
import { Client } from 'node-deviantart';
const client = new Client('emilkje'),

client.submissions({type: 'image'}, (err, data) => {
	if(err) throw err;
	console.dir(data);
});
```

Image data is accessible through the stream helper method on the submissions
```javascript
import { Client } from 'node-deviantart';
import { createWriteStream } from 'fs';
const client = new Client('emilkje'),

// same as submissions({type: 'image'})
client.images((err, data) => {
	if(err) throw err;
	data.forEach(image => {
		image.stream.pipe(createWriteStream(`./images/${image.title}.jpg`));
	});
});
```

Testing
-------

run `make test` or `npm run test`


TODO:
-----

* Improve RSSClient to handle single submissions (data streams etc.)
* Add sta.sh client for uploads and asset management
* Mock HTTP-requests in test cases (currently throws timeout on large responses)
* Move options from submission() to query()
* More documentation