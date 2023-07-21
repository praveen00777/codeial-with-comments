const Post = require('../models/post');


module.exports.home = function(req, res){
    //   console.log(req.cookies);
    //   res.cookie('user_id',25);
    // Post.find({},function(err,posts){
    //     return res.render('home', {
    //         title: "codeial||Home",
    //         posts: posts
    //     });
        
        
    // });
    // return res.render('home', {
    //     title: "Home"
    // });
    //downone is a query where we are finding all posts and populating user of that post
    Post.find({}).populate('user')
        .populate({
            //refering to comments array in post models
               path: 'comments',
               populate: {
                     path: 'user'
               }
        })
        .exec(function(err,posts){
        return res.render('home', {
            title: "codeial||Home",
            posts: posts
        });
        
        
    })
}

// module.exports.actionName = function(req, res){}