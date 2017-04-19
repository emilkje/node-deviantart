
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

## Submission Schema
```json
{
  "title": "Image title",
  "link": "http://username.deviantart.com/art/image-id",
  "perma": "http://username.deviantart.com/art/image-id",
  "pubdate": "Wed, 30 Jun 2010 11:55:43 PDT",
  "keywords": [
    ""
  ],
  "rating": "nonadult",
  "category": {
    "id": "digitalart/photomanip/conceptual",
    "label": "Conceptual"
  },
  "credit": {
    "username": "username",
    "avatar": "http://a.deviantart.net/avatars/e/m/username.jpg?1",
    "role": "author"
  },
  "copyright": {
    "text": "Copyright 2010-2017 username",
    "url": "http://username.deviantart.com"
  },
  "license": "http://creativecommons.org/licenses/by-nc-nd/3.0/",
  "description": {
    "content": "Image description.",
    "type": "html"
  },
  "thumbnail": {
    "small": {
      "url": "http://txx.deviantart.net/thumbnail-of-image.jpg",
      "height": "150",
      "width": "117"
    },
    "medium": {
      "url": "http://txx.deviantart.net/thumbnail-of-image.jpg",
      "height": "200",
      "width": "156"
    },
    "large": {
      "url": "http://txx.deviantart.net/thumbnail-of-image.jpg",
      "height": "385",
      "width": "300"
    }
  },
  "content": {
    "url": "http://orig05.deviantart.net/original-image-path.jpg",
    "height": "800",
    "width": "623",
    "medium": "image"
  },
  "text": null
}
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