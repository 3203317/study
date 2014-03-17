var db = require('./mongodb');



function uuid(b) {
	var s = [];
	var hexDigits = '0123456789abcdef';
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = '4';  // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = b ? '-' : '';

	var uuid = s.join('');
	return uuid;
}

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

CategorySchema.post('save', function(){
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
			return;
		}

		if(doc){
			cb(null, doc);
		}else{
			cb('Not found');
		}
	});
};

var categorys;

CategorySchema.statics.findCategorys = function(cb) {
	if(categorys){
		cb(null, categorys);
		return;
	}

	this.find(null, null, {sort: {CategoryOrder: 1}}, function(err, docs){
		if(err){
			cb(err);
			return;
		}
		categorys = docs;
		cb(null, categorys);
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
	category.Id = uuid(false);
	CategoryModel.create(category, function(err, doc){
		if(err){
			cb(err)
			return;
		}
		cb(null, doc);
	});
};

var CategoryModel = mongoose.model('category', CategorySchema);

exports = module.exports = CategoryModel;