var db = require('./mongodb');



var mongoose = db.mongoose,
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var LinkSchema = new Schema({
	Id: {
		type: String,
		unique: true,
		index: true
	},
	LinkName: {
		type: String,
		required: true
	},
	LinkUrl: {
		type: String
	},
	LinkImage: {
		type: String
	},
	LinkOrder: {
		type: Number
	},
	IsShow: {
		type: Number
	},
	LinkType: {
		type: Number
	}
}, {
	versionKey: false
});

LinkSchema.statics.findLinks = function(linkType, cb) {
	var option = {
		sort: {LinkOrder: 0}
	};

	this.find({LinkType: linkType}, null, option, function(err, docs){
		if(err){
			cb(err);
			return;
		}
		cb(null, docs);
	});
};

var LinkModel = mongoose.model('link', LinkSchema);

exports = module.exports = LinkModel;