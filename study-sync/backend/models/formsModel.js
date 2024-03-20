const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['text', 'multiple-choice', 'time-interval', 'date-interval', 'other']
    },
   options: [String],
});

const formsSchema = new mongoose.Schema({
    creator_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: String,
    questions: [questionSchema]
});

const Forms = mongoose.model('Forms', formsSchema);
module.exports = Forms;