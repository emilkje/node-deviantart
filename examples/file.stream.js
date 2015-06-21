var user = process.argv[2] || 'emilkje',
da = require('../'),
client = new da.RSSClient(user),
fs = require('fs');

var mkdirSync = function (path) {
	try {
		fs.mkdirSync(path);
	} catch(e) {
		if ( e.code != 'EEXIST' ) throw e;
	}
}

client.images(function(err, images){
	if(err) {
		console.dir(err);
	}

	images.forEach(function(image){
		mkdirSync('images');
		image.stream().pipe(fs.createWriteStream(__dirname+'/images/'+image.title+"_by_"+image.copyright.text+'.jpg'));
	});

	console.log('saved ' + user + 's photos in images/');
});
