var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var CompanySchema = new Schema({
	CompName: {
		type: String
	}, CompDesc: {
		type: String
	}, Email: {
		type: String
	}, User_Id: {
		type: ObjectId
	}
}, {
	versionKey: false,
	toObject: {
		virtuals: true
	}, toJSON: {
		virtuals: true
	}
});

CompanySchema.virtual('PostTime').get(function(){
	return this._id.getTimestamp();
});

mongoose.model('Company', CompanySchema);
