var mongoose = require('mongoose');
    schema = mongoose.Schema;

var messagesSchema = new schema({
  author:    { type: String },
  text:     { type: String },
  date:  { type: String }
});

module.exports = mongoose.model('MessaSchema', messagesSchema);
