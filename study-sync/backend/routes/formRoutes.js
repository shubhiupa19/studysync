const express = require('express');
const router = require('express').Router();
const {createForm, getForms, getFormById, updateForm, deleteForm} = require('../controllers/formController');

router.post('/create', createForm);

router.get('/get', getForms);

router.get('/get/:id', getFormById);

router.put('/update/:id', updateForm);

router.delete('/delete/:id', deleteForm);

module.exports = router;