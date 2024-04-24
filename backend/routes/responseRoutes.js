    const express = require('express');
    const router = express.Router();
    const { createResponse, getResponsesbyForm, getResponseByID, updateResponse, deleteResponse} = require('../controllers/responsesController');

    router.post('/create', createResponse);

    router.get('/get/:formId', getResponsesbyForm);

    router.get('/get/:id', getResponseByID);

    router.put('/update/:id', updateResponse);

    router.delete('/delete/:id', deleteResponse);

    module.exports = router;