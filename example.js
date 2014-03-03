var da = require('./deviantart'),
	client = new da.RSSClient;

client.submissions('emilkje', {type: 'image'}, function(err, data){
	if(err) throw err;
	console.dir(data);
});