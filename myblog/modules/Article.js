var mongodb = require('./db');

function Article(){

}

Article.findArticles = function(pagination, cb) {	
	mongodb.open(function (err, db) {
		if(err){
			mongodb.close();
			return cb(err);
		}

		db.collection('article', function(err, collection){
			if(err){
				mongodb.close();
				return cb(err);
			}

			collection.find().sort({CategoryOrder: 1}).limit(20).toArray(function(err, docs){
				mongodb.close();
				if(err){
					cb(err);
				}else{
					cb(null, docs);
				}
			});
		})
	});
};

exports = module.exports = Article;