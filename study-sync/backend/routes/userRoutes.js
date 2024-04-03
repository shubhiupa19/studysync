const express = require('express');
const router = require('express').Router();
const {protect} = require('../middleware/authMiddleware');
const {registerUser, loginUser, updateUser, deleteUser} = require('../controllers/userController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.put('/update', protect, updateUser);

router.delete('/delete', protect, deleteUser);

module.exports = router;