const Response = require('../models/responsesModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Forms = require('../models/formsModel');


//creates a response object containing the form, respondent, and array of all responses
exports.createResponse = asyncHandler(async (req, res) => {
    console.log("Creating response");
    const { form, respondent, anonymousRespondent, response_array } = req.body;

    //check that all form fields are filled out
    if (!form || (!respondent && !anonymousRespondent) || !response_array) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const responseData = {
        form,
        response_array
    };

    if(respondent)
    {
        responseData.respondent = respondent;
    }
    else if (anonymousRespondent)
    {
        responseData.anonymousRespondent = anonymousRespondent;
    }

    const response = await Response.create(responseData);

    if (response) {
        console.log(response);
        res.status(201).json({
            _id: response._id,
            form: response.form,
            respondent: response.respondent || response.anonymousRespondent,
            response_array: response.response_array
            
        });
    } else {
        res.status(400);
        throw new Error('Invalid response data');
    }


});

//gets all responses associated with a form
exports.getResponsesbyForm = asyncHandler(async (req, res) => {

    // gets the associated form ID from the frontend
    const formId = new mongoose.Types.ObjectId(req.params.formId);
 
    // finds all responses associated with the form by searching the database for responses with the form ID

    // the populate method is used to get the details of the respondent such as their name and email
    const responses = await Response.find({ form: formId }).populate({path: 'respondent', select: 'firstName lastName email'});

    // finds the form in the form database by searching for the form ID
    const form = await Forms.findById(formId);


    // returns 404 if no responses or form of that nature are found
    if (!form || !responses) {
        res.status(404);
        throw new Error('Responses not found');
    }

     // gets the questions associated with the form
     const questionTitles = form.questions.map(question => question.questionText);

     

     // collecting user data by mapping through the responses
     const userData = responses.map(response => {

        // creating a response by question dictionary to store the response for each question
        const responseByQuestion = {};

        //define an untitled variable in case a question doens't have a title:
        defaultTitle = "Untitled Question";

        // mapping through the response array to find each question
        form.questions.forEach(question => {
            const questionTitle = question.questionText || defaultTitle;
            //for each question, find the response in the response array
            const answer = response.response_array.find(r => r.question.equals(question._id));
            //store the response in the responseByQuestion dictionary
            responseByQuestion[questionTitle] = answer ? answer.response : '';
        });

        console.log(`Responses for user ${response.respondent._id}:`, responseByQuestion);

        return {
            userId: response.respondent && response.respondent._id ? response.respondent._id.toString() : 'Anonymous',
            firstName: response.respondent ? response.respondent.firstName : '',
            lastName: response.respondent ? response.respondent.lastName : '',
            email: response.respondent ? response.respondent.email : '',
            responses: responseByQuestion,
        }
     });
    
    
    if(responses)
    {
        res.status(200).json({
            responses,
            form: {
                title: form.title,
                description: form.description,
            },
            questionTitles,
            userData

        });
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