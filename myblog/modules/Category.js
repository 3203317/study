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
		type: String,
		required: true
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

CategorySchema.pre('save', function(next, done){
	next();
});

CategorySchema.post('save', function(doc){
	console.log(doc)
});

/**
 * 获取分类
 *
 * @method
 * @params cb
 * @return
*/
CategorySchema.statics.findCategoryByName = function(categoryName, cb) {
	this.findOne({CategoryName: categoryName}, null, null, function(err, doc){
		if(err){
			cb(err);
		}else{
			if(null === doc){
				cb('Not found');
			}else{
				cb(null, doc);
			}
		}
	});
};

/**
 * 添加新分类
 *
 * @method
 * @params cb
 * @return
*/
CategorySchema.statics.saveNew = function(category, cb) {
	CategoryModel.create(category, function(err, doc){
		if(err){
			cb(err)
		}else{
			cb(null, doc);
		}
	});
};

var CategoryModel = mongoose.model('category', CategorySchema);

exports = module.exports = CategoryModel;