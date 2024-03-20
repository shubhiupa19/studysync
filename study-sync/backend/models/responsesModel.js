const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  respondent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  response_array: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    response: { 
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
  }],
});

const Response = mongoose.model('Response', responseSchema);
module.exports = Response;
