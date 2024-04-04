const express = require('express');
const router = require('express').Router();
const {protect} = require('../middleware/authMiddleware');
const {createForm, getForms, getFormById, updateForm, deleteForm, publishForm} = require('../controllers/formController');

router.post('/create', createForm);

router.get('/get', protect, getForms);

router.get('/get/:id', getFormById);

router.put('/update/:id', protect, updateForm);

router.put('/publish/:id', protect, publishForm);

router.delete('/delete/:id', deleteForm);

module.exports = router;