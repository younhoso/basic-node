const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { autoIncrement } = require('mongoose-plugin-autoinc');

//생성될 필드명을 정한다.
const reviewSchema = new Schema({
	title: String,
	desc: String
});

reviewSchema.plugin( autoIncrement, { model : "todoapp", field : "id" , startAt : 1 } );
module.exports = mongoose.model('todoapp' , reviewSchema);