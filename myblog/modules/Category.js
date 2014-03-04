var mongodb = require('./db');

function Category(){

}

/**
 * 获取类型
 *
 * @method
 * @params cb
 * @return
*/
Category.getAll = function(cb) {
	mongodb.open(function (err, db) {
		if(err){
			mongodb.close();
			return cb(err);
		}

		db.collection('category', function(err, collection){
			if(err){
				mongodb.close();
				return cb(err);
			}

			collection.find().sort({CategoryOrder: 1}).toArray(function(err, docs){
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

exports = module.exports = Category;