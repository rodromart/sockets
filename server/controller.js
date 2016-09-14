var mongoose = require('mongoose');
  require('../models/messages.js');

var model = mongoose.model('MessaSchema');

exports.addMessage = function (data, callback) {
  console.log('addMessage');
  console.log(data);

  var message = new model({
    author:    data.author,
    text:     data.text,
    date:     Date()
  });

  message.save(function(err) {
    if(err)console.log(err);
  });
};

exports.findAllMessages = function(callback){
    console.log('findAllMessages');
    model.find(function (err, data) {
                  if (err) return handleError(err);
                  callback(data);
});
}
