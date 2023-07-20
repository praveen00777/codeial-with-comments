const User = require('../models/user');


module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

// renders the sign up page
module.exports.signup = function(req,res){
      //making availability when signed out only
       if(req.isAuthenticated()){
            return res.redirect('/users/profile');
       }    

        return res.render('user_sign_up',{
               title: "codeial || Sign up"
        })
}


// renders the sign in page
module.exports.signin = function(req,res){
            //making availability when signed out only
            if(req.isAuthenticated()){
                return res.redirect('/users/profile');
           }    
    

    return res.render('user_sign_in',{
           title: "codeial || Sign in"
    })
}

// get the signup data

// module.exports.create = function(req, res){
//     if (req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }

//     user.findOne({email: req.body.email}, function(err, user){
//         if(err){console.log('error in finding user in signing up'); return}

//         if (!user){
//             User.create(req.body, function(err, user){
//                 if(err){console.log('error in creating user while signing up'); return}

//                 return res.redirect('/users/sign-in');
//             })
//         }else{
//             return res.redirect('back');
//         }

//     });
// }

module.exports.create = async function(req, res){
    //TODO
    if (req.body.password != req.body.confirm_password) {
        return res.redirect("back");
      }
      let user = await User.findOne({ email: req.body.email });
      //console.log(user);
      if (!user) {
        //console.log(user);
        await User.create(req.body);
        //console.log(a);
        return res.redirect("/users/signin");
      }
      return res.redirect("back");

}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    // TODO later
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    //for looging out of the session
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}