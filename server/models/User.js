const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleID: String,
  credits: {type: Number, default: 0}
});


 ///name of collection,  // name of schema 
mongoose.model('users', userSchema); 