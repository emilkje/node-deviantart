var da = require('../'),
		client = new da.RSSClient("emilkje"),
		fs = require('fs');

client.images(function(err, images){
	if(err) {
		console.dir(err);
	}

	images[0].stream().pipe(fs.createWriteStream('image.jpg'));
	console.log("saved image.jpg");
});