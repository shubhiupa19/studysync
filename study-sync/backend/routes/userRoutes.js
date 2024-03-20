const express = require('express');
const router = require('express').Router();
const {registerUser, loginUser, updateUser, deleteUser} = require('../controllers/userController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.put('/update', updateUser);

router.delete('/delete', deleteUser);

module.exports = router;