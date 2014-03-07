var db = require('./mongodb');

var mongoose = db.mongoose,
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var CategorySchema = new Schema({
	Id: {
		type: String,
		unique: true,
		index: true
	},
	CategoryName: {
		type: String
	},
	CategoryOrder: {
		type: Number
	},
	CategoryIntro: {
		type: String
	},
	CategoryCount: {
		type: Number
	}
}, {
	versionKey: false
});

mongoose.model('category', CategorySchema);

var Category = mongoose.model('category');

/**
 * 获取分类
 *
 * @method
 * @params cb
 * @return
*/
Category.findCategoryByName = function(categoryName, cb) {
	Category.findOne({CategoryName: categoryName}, null, null, function(err, docs){
		if(err){
			cb(err);
		}else{
			if(null === docs){
				cb('null');
			}else{
				cb(null, docs);
			}
		}
	});
};

exports = module.exports = Category;