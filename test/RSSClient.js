var da = require('../deviantart.js');

describe('RSSClient', function(){

  var client = new da.RSSClient();

  describe('#submissions()', function(){
    
    it('should retrieve array without error', function(done){
      client.submissions("emilkje", function(err, data){
        if (err) throw err;
        if(data instanceof Array === false)
                throw new Error('Results is not an array');
        done();
      });
    });

    it('should retrieve only images if option is specified', function(done){
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
        this.timeout(3000);

    	client.submissions('MoonheartThunderClan', {type: 'note'}, function(err, data){
    		
    		if(err) throw err;
    		
    		data.forEach(function(i){
    			if(i.hasOwnProperty('text') === false)
    				throw new Error('No content attribute found');
    		});

    		done();
    	});
    });

	
	it('should return empty array if results are not found', function(done) {
		client.submissions('emilkje', {type: 'note'}, function(err, data){
			if(err) throw err;
			if(data.length > 0)
				throw new Error('Length of result is: ' + data.length);

			done();
		});
	});

	it('should return items with a set of defined attributes', function(done) {
		client.submissions('emilkje', function(err, data){
			if(err) throw err;
			data.forEach(function(item){
				if(!item.hasOwnProperty('title')) throw new Error('Item should have a title');
				if(!item.hasOwnProperty('perma')) throw new Error('Item should have a permalink');
				if(!item.hasOwnProperty('credit')) throw new Error('Item should have a credit object');
				if(!item.hasOwnProperty('pubdate')) throw new Error('Item should have a publication date');
				if(!item.hasOwnProperty('keywords')) throw new Error('Item should have a keywords array');
				if(!item.hasOwnProperty('rating')) throw new Error('Item should have a rating');
				if(!item.hasOwnProperty('category')) throw new Error('Item should have a category');
				if(!item.hasOwnProperty('copyright')) throw new Error('Item should have a copyright');
				if(!item.hasOwnProperty('description')) throw new Error('Item should have a description');
			});
			done();
		});
	});

  })

  describe('#images()', function(){

	var client = new da.RSSClient('emilkje');
    
    it('should retrieve only images', function(done){
      client.images(function(err, images){
        if (err) throw err;
        if(images instanceof Array === false)
            throw new Error('Results is not an array');

		images.forEach(function(image){
			if(!image.hasOwnProperty('content'))
				throw new Error('Result contains items which could not be identified as an image');
		});
        done();
      });
    });

  });
})
