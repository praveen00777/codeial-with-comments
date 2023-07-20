const mongoose = require('mongoose');
const user = require('./user');

const postSchema = new mongoose.Schema({
               content:{
                   type:String,
                   required: true
                   //for storing of data required is necessary
               },
               user: {
                //this user has to be bought from database
                    type: mongoose.Schema.Types.ObjectId,
                    //refering to user schema
                    ref: 'user',
               }
            },
               
               {
                
                timestamps: true
               }
);

const Post= mongoose.model('Post',postSchema);

module.exports= Post;