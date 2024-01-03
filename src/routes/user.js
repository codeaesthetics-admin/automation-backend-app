const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users/user');
const { userAuth } = require('../middleware/auth');


router.get('/connected-accounts', userAuth, UserController.checkConnectedAdAccounts);
module.exports = router