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

/**
 * 获取分类
 *
 * @method
 * @params cb
 * @return
*/
CategorySchema.statics.findCategoryByName = function(categoryName, cb) {
	this.findOne({CategoryName: categoryName}, null, null, function(err, docs){
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

exports = module.exports = mongoose.model('category', CategorySchema);