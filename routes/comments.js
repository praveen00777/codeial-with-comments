const express = require('express');
const router = express.Router();

const commentsscontroller = require('../controllers/comments_controller');
const passport = require('passport');
// now acess the info from posts controller

router.post('/create',passport.checkAuthentication, commentsscontroller.create);

module.exports = router;
//now we need to call the router from index.js