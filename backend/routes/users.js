const express = require('express');
const { registerUser, getUsers } = require('../controllers/userController');
const { loginUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);

module.exports = router;
