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
               },
               //include the array of comment ids in post schema to make the fetching very easy
               comments:[
                         {
                            type: mongoose.Schema.Types.ObjectId,
                            //refering to comments  schema
                            ref: 'Comment',
                         }
               ]
            },
               
               {
                
                timestamps: true
               }
);

const Post= mongoose.model('Post',postSchema);

module.exports= Post;