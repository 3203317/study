var db = require('./mongodb');


var mongoose = db.mongoose,
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var TagSchema = new Schema({
	Id: {
		type: String,
		unique: true,
		index: true
	},
	TagName: {
		type: String,
		required: true
	},
	TagCount: {
		type: Number
	}
}, {
	versionKey: false
});

// TagSchema.virtual('Articles').get(function(){
// 	Article.findAll(function(err, docs){
		
// 	});
// 	return [];
// });

TagSchema.pre('save', function(next, done){
	next();
});

TagSchema.post('save', function(){
});

var tags;

TagSchema.statics.findTags = function(cb) {
	if(tags){
		cb(null, tags);
	}else{
		this.find(null, null, {sort: {TagName: 1}}, function(err, docs){
			if(err){
				cb(err);
			}else{
				tags = docs;
				cb(null, tags);
			}
		});
	}
};

var TagModel = mongoose.model('tag', TagSchema);

exports = module.exports = TagModel;