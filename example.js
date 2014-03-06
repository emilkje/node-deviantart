var da = require('./deviantart'),
	client = new da.RSSClient
	fs = require('fs');

client.submissions('emilkje', {type: 'image'}, function(err, data){
	if(err) throw err;
	data[1].stream().pipe(fs.createWriteStream('image.jpg'));
	data[1].stream().on('data', function(chunk){
		console.log('got %s bytes of data', chunk.length);
	});
	console.log(data[0].credit);
});
