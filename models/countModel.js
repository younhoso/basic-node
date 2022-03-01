const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { autoIncrement } = require('mongoose-plugin-autoinc');

//생성될 필드명을 정한다.
const countSchema = new Schema({
	count: Number,
	name: String
});

countSchema.plugin(autoIncrement, { model : "identitycounters", field : "id" , startAt : 1 } );
module.exports = mongoose.model('identitycounters' , countSchema);