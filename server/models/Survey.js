const mongoose = require('mongoose');
const { Schema } = mongoose; 
const recipientSchema = require('./Recipient'); 

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String, 
  recipients: [recipientSchema], //an array of strings 
  //subdocument schema 
  yes: {type: Number, default: 0},
  no: {type: Number, default: 0},
  //reference to a particular use, sets up to relationship or reference
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
              //reference belongs to User collection
  dateSent: Date,
  lastResponded: Date
}); 

mongoose.model('surveys', surveySchema)
//name of model, name of model schema 