const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        //check if token is in header and starts with Bearer, as JWT are sent in this format
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    )
    {
        try {
            //getting token from header
            token = req.headers.authorization.split(' ')[1];

            //verifying token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //get user from token using database and id
            req.user = await User.findById(decoded.id).select('-password');

            //call next middleware
            next();

        } catch (error) {
            //print out the error
            console.log(error);
            res.status(401);
            throw new Error('User not authorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('User not authorized, no token');
    }


});