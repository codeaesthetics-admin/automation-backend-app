const express = require('express')
let AuthController = require('../controllers/authentication/authentication');
const router = express.Router()


router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.post('/login-google', AuthController.loginWithGoogle)
router.post('/login-facebook', AuthController.loginWithFacebook)
module.exports = router