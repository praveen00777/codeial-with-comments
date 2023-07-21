const Post = require('../models/post');

// it just shows post for now afterwards add the authentication
module.exports.create = function(req,res){
        
                  Post.create({
                      content: req.body.content,
                      user: req.user._id
                  },function(err){
                       if(err){
                           console.log("error in posting",err);
                           return;
                       }

                       return res.redirect('back');
                  }
                  );
}