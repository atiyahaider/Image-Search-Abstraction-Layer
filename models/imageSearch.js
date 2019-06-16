const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema for the db
let imageSearchSchema = new Schema({
  searchVal:   {type: String, required: true},
  searchedOn:  {type: Date, required: true}
})

//Model for the schema
let ImageSearch = mongoose.model('ImageSearch', imageSearchSchema);

// make this available to the users in the Node application
module.exports = ImageSearch;