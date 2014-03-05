var da = require('../deviantart.js');

describe('RSSClient', function(){


  describe('#submissions()', function(){
    
    it('should retrieve array without error', function(done){
	  var client = new da.RSSClient();
      client.submissions("emilkje", function(err, data){
        if (err) throw err;
        done();
      });
    });

    it('should retrieve only images if option is specified', function(done){
    	var client = new da.RSSClient();
    	client.submissions('emilkje', {type: 'image'}, function(err, data){
    		
    		if(err) throw err;
    		
    		data.forEach(function(i){
    			if(i.hasOwnProperty('content') === false)
    				throw new Error('No content attribute found');
    			if(i.content.medium !== 'image')
    				throw new Error('Content medium is not "image"');
    		});

    		done();
    	});
    });

    it('should retrieve only notes if option is specified', function(done){
    	var client = new da.RSSClient();
    	client.submissions('MoonheartThunderClan', {type: 'note'}, function(err, data){
    		
    		if(err) throw err;
    		
    		data.forEach(function(i){
    			if(i.hasOwnProperty('text') === false)
    				throw new Error('No content attribute found');
    		});

    		done();
    	});
    });

	it('should return array', function(done) {
		var client = new da.RSSClient();
		client.submissions('emilkje', {type: 'note'}, function(err, data){
			if(err) throw err;
			if(data instanceof Array === false)
				throw new Error('Results is not an array');

			done();
		});
	});

	it('should return empty array if results are not found', function(done) {
		var client = new da.RSSClient();
		client.submissions('emilkje', {type: 'note'}, function(err, data){
			if(err) throw err;
			if(data.length > 0)
				throw new Error('Length of result is: ' + data.length);

			done();
		});
	});
  })
})
