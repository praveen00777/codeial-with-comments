const express = require('express');
const router = express.Router();

const postscontroller = require('../controllers/post_controller');
const passport = require('passport');
// now acess the info from posts controller

router.post('/create',passport.checkAuthentication, postscontroller.create);

module.exports = router;
//now we need to call the router from index.js


