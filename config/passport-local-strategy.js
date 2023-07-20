const passport = require('passport');
 const LocalStrategy = require('passport-local').Strategy; //for local authentication..


 const User = require('../models/user');
const user = require('../models/user');
 // authentication using passport.js
 passport.use(new LocalStrategy({
             usernameField: 'email',
             passwordField: 'password',
             passReqToCallback: false
            },
    function(email,password,done){
           // find the user and establish their identity
           //verifying now with the both email:emails
            User.findOne({email:email},function(err,user){
                    
                   if(err){
                          console.log("Error in finding User--> Passport");
                          return done(err);

                   }
                   if(!user || user.password!= password){
                       console.log("invalid credentials");
                       // null means no error but false means no user
                       return done(null, false);
                   }

                   return done(null,user);
            });
    }
            
            
));

//signin done

//foe cookiepart down
//null means no error
// serialize user function vs deserialize
//serializing is done to know which key have to be put in cookies
passport.serializeUser(function(user,done){
    //storing the signed in user in encrypted form
       done(null,user.id);
});


//deserializing  the user from key in cookies
passport.deserializeUser(function(id,done){
      User.findById(id, function(err,user){
          if(err){
            console.log("Error in finding User--> Passport");
                          return done(err);
          }

          return done(null,user);
      });
});
//check if user is authenticated or not
//we use a middleware here req,res,next
passport.checkAuthentication= function(req,res,next){
      //checking user is singed in or not if authenticated send them back to controller else return to sign in page
      if(req.isAuthenticated()){
            return next();
      }

      return res.redirect('/users/signin');
      
}

passport.setAuthenticatedUser= function(req,res,next){
       if(req.isAuthenticated()){
        //req.user contains the current signed in user info from cookies ans can be sent to the ejs template
             res.locals.user= req.user;
       }
          next();
}

module.exports = passport;