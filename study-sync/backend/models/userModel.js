const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']

    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },

});

const User = mongoose.model('User', userSchema);
module.exports = User;