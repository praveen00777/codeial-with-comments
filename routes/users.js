const express = require('express');
const router = express.Router();
const passport= require('passport');

const usersController = require('../controllers/users_controller');
//making user to view profile only when singedin
router.get('/profile',passport.checkAuthentication ,usersController.profile);

router.get('/signin', usersController.signin);

router.get('/signup', usersController.signup);

router.post('/create',usersController.create);
// router for sigin but w.r.t to passport so use middleware
router.post('/create-session',passport.authenticate(
          'local',
          {failureRedirect:'/users/sigin'}
),
usersController.createSession);
router.get('/signout', usersController.destroySession);
module.exports = router;