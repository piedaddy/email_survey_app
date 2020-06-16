//create model mongoose class

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const {Schema} = mongoose; //same thing as above! it says that mongoose has a property called schema and to set it to new variable 

const userSchema = new Schema({
  googleID: String,
  credits: {type: Number, default: 0}
});


 ///name of collection,  // name of schema 
mongoose.model('users', userSchema); //two arguments like this mean that we are trying to load something into mongoose
//creates model class