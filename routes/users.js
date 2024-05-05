var express = require('express');
var router = express.Router();
const UserControllers = require('../controllers/users');
const handleErrorAsync = require('../service/handleErrorAsync');
const isAuthenticator = require('../service/isAuthenticator');

/* GET users listing. */
router.post('/sign_up', handleErrorAsync(UserControllers.sign_up));
router.post('/sign_in', handleErrorAsync(UserControllers.sign_in));
router.post('/updatePassword',isAuthenticator, handleErrorAsync(UserControllers.updatePassword));
router.get('/profile',isAuthenticator, handleErrorAsync(UserControllers.getProfile));
router.patch('/profile',isAuthenticator, handleErrorAsync(UserControllers.editProfile));

module.exports = router;
