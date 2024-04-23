const Form = require('../models/formsModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

//create a new form 
exports.createForm = asyncHandler(async (req, res) => {
    const { title, description, questions} = req.body;

    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
        res.status(401);
        throw new Error('Not authorized');

    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
    }

    const creator_id = decoded.id;
    
    //just checks that all fields are filled out
    if (!title || !questions) {
        res.status(400);
        console.log("creataor_id", creator_id);
        throw new Error('Please add all fields');
      }

    const form = await Form.create ({
        creator_id,
        title, 
        description, 
        questions
    });

    if(form){
        res.status(201).json({
            _id: form._id,
            title: form.title,
            description: form.description,
            questions: form.questions,
            user_id: form.user_id,
        });
    } else {
        res.status(400);
        throw new Error('Invalid form data');

    }


});

//gets all forms
exports.getForms = asyncHandler(async (req, res) => {
   
    const forms = await Form.find({creator_id: req.user._id});
    
    res.status(200).json(forms);
});

//gets one form by ID
exports.getFormById = asyncHandler(async (req, res) => {
    const form = await Form.findById(req.params.id);
    if(form){
        res.status(200).json(form);
    } else {
        res.status(404);
        throw new Error('Form not found');
    }
});

//update form 
exports.updateForm = asyncHandler(async (req, res) => {
const form = await Form.findById(req.params.id);
console.log("req.user._id", req.user._id);
console.log("reached update form", form);
if (form && form.creator_id.equals(req.user._id)) {
    form.title = req.body.title || form.title;
    form.description = req.body.description || form.description;
    form.questions = req.body.questions || form.questions;

    const updatedForm = await form.save();
    res.status(200).json(updatedForm);
}
else {
    res.status(404);
    throw new Error('Form not found');
}
});


//delete form
exports.deleteForm = asyncHandler(async (req, res) => {
    const form = await Form.findById(req.params.id);
    if (form && form.creator_id.equals(req.user._id)) {
        await form.remove();
        res.status(200).json({message: 'Form removed'});
    }
    else {
        res.status(404);
        throw new Error('Form not found');
    }

});

//publish form
exports.publishForm = asyncHandler(async (req, res) => {
    const form = await Form.findById(req.params.id);

    if (form && form.creator_id.equals(req.user._id)) {
        form.published = true; // Set the published field to true
        await form.save();
        res.status(200).json({ message: 'Form published successfully' });
    } else {
        res.status(404);
        throw new Error('Form not found');
    }
});