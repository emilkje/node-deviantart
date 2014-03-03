var da = require('./deviantart'),
	client = new da.RSSClient;

client.submissions('MoonheartThunderClan', {type: 'note'}, function(err, data){
	if(err) throw err;
	console.dir(data);
});