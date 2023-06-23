const express = require('express');
const router = express.Router();
const { storeReturnTo } = require('../middleware');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users')

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.loginForm)
    .post(storeReturnTo,passport.authenticate('local',{failureFlash:true,failureRedirect:'/login',failureMessage: true,keepSessionInfo: true}), users.login);

router.route('/logout')
    .get(users.logout)

module.exports = router;