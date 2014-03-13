
var parser = require('../client/util/URIParser'),
		assert = require("assert");

describe('URIParser', function(){

  describe('#RssUri()', function(){


  	it('should correctly set correct query string', function() {
  		assert.equal("http://backend.deviantart.com/rss.xml?type=deviation&q=boost%3Apopular+in%3Afanart+max_age%3A24h+meta%3Aall", 
        parser.RssUri({ q: 'in%3Afanart' }));
  		
  		assert.equal("http://backend.deviantart.com/rss.xml?type=deviation&q=boost%3Apopular+in%3Atraditional+max_age%3A24h+meta%3Aall", 
        parser.RssUri({ q: 'in%3Atraditional' }));
  	});

  	it('should default to popular 24h if no sort options is specified', function(){
  		assert.equal("http://backend.deviantart.com/rss.xml?type=deviation&q=boost%3Apopular+in%3Atraditional+max_age%3A24h+meta%3Aall", 
        parser.RssUri({q: 'in%3Atraditional'}));
  	})
    
    it('should support and parse popular with max age correctly', function(){

    	assert.equal("http://backend.deviantart.com/rss.xml?type=deviation&q=boost%3Apopular+in%3Atraditional+max_age%3A24h+meta%3Aall", 
        parser.RssUri({ q: 'in%3Atraditional', sort: {type: 'popular', max_age: '24h'} }));
      
    });

    it('should support default to 24h max age if no max_age is set and type is "popular"', function(){

      assert.equal("http://backend.deviantart.com/rss.xml?type=deviation&q=boost%3Apopular+in%3Atraditional+max_age%3A24h+meta%3Aall", 
        parser.RssUri({ q: 'in%3Atraditional', sort: {type: 'popular'} }));
      
    })

    it('should update max_age if specified', function(){
    	options.sort = {type: 'popular', max_age: "72h"};
    	assert.equal("http://backend.deviantart.com/rss.xml?type=deviation&q=boost%3Apopular+in%3Atraditional+max_age%3A72h+meta%3Aall", 
        parser.RssUri({ q: 'in%3Atraditional', sort: {type: 'popular', max_age: '72h'} }));
    })

    it('should not include popular filter if sort type is set to "new"', function(){
    	assert.equal("http://backend.deviantart.com/rss.xml?type=deviation&q=cats+sort%3Atime+meta%3Aall", 
        parser.RssUri({ q: 'cats', sort: {type: 'new'} }));
    })
    	
  });

});