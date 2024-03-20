const Response = require('../models/responsesModel');
const asyncHandler = require('express-async-handler');


//creates a response object containing the form, respondent, and array of all responses
exports.createResponse = asyncHandler(async (req, res) => {
    const { form, respondent, response_array } = req.body;

    //check that all form fields are filled out
    if (!form || !respondent || !response_array) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const response = await Response.create({
        form,
        respondent,
        response_array
    });

    if (response) {
        res.status(201).json({
            _id: response._id,
            form: response.form,
            respondent: response.respondent,
            response_array: response.response_array
        });
    } else {
        res.status(400);
        throw new Error('Invalid response data');
    }


});

//gets all responses associated with a form
exports.getResponsesbyForm = asyncHandler(async (req, res) => {
    const responses = await Response.find({ form: req.params.formId }).populate('respondent').populate('response_array.question');
    
    if(responses)
    {
        res.status(200).json(responses);
    }
    else
    {
        res.status(404);
        throw new Error('Responses not found');
    }
    
});

//gets a single response by ID
exports.getResponseByID = asyncHandler(async (req, res) => {
    const response = await Response.findById(req.params.id).populate('respondent').populate('response_array.question');
    if (response)
    {
        res.status(200).json(response);
    }
    else 
    {
        res.status(404);
        throw new Error('Response not found');
    }
});

exports.updateResponse = asyncHandler(async (req, res) => {

    const response = await Response.findById(req.params.id);
    if (response && response.respondent.equals(req.user._id)) {
        response.response_array = req.body.response_array || response.response_array;
        const updatedResponse = await response.save();
        res.status(200).json(updatedResponse);
    } 
    else {
        res.status(404);
        throw new Error('Response not found');
    }
});

exports.deleteResponse = asyncHandler(async (req, res) => {
    const response = await Response.findById(req.params.id);
    if (response && response.respondent.equals(req.user._id)) {
        await response.remove();
        res.status(200).json({ message: 'Response removed' });
    } 
    else {
        res.status(404);
        throw new Error('Response not found');
    }

});