const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');


//Register a new user function
exports.registerUser = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    console.log(req.body);
    
    //just checks that all fields are filled out
    if (!email || !password || !firstName || !lastName) {
        res.status(400);
        throw new Error('Please add all fields');
      }

    //checks if user exists 

    const userExists =  await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('User already exists');

    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create ({
        email, 
        password: hashedPassword, 
        firstName, 
        lastName
    });

  

    if(user){
        res.status(201).json({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');

    }


});

//Login a user function
exports.loginUser = asyncHandler(async (req, res) => { 

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const userExists = await User.findOne({ email });

    if (!userExists) {
        res.status(400);
        throw new Error('User not found. Please register or try again');
    }
    else { 
        const match = await bcrypt.compare(password, userExists.password);
        if (match) {
            res.status(200);
            res.json({
                _id: userExists._id,
                email: userExists.email,
                firstName: userExists.firstName,
                lastName: userExists.lastName,
            });
        }
        else {
            res.status(400);
            throw new Error('Invalid email or password');      
        }

    }

});


//Update a user function
exports.updateUser = asyncHandler(async (req, res) => { 
    const user = await User.findById(req.user._id);

    if(user)
    {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
        });
    }
    else
    {
        res.status(404);
        throw new Error('User not found');
    }
});

//Delete a user function
exports.deleteUser = asyncHandler(async (req, res) => { 
    const user = await User.findById(req.user._id);

    if (user) 
    {
        await user.remove();
        res.json({ message: 'User removed' });
    }
    else 
    {
        res.status(404);
        throw new Error('User not found');
    }
});

    