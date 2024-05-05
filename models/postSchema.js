const mongoose = require('mongoose');
const User = require('./userSchema');

const postSchema = new mongoose.Schema(
    {
      content: {
        type: String,
        required: [true, 'Content 未填寫']
      },
      image: {
        type:String,
        default:""
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        //select: false
      },
      user: {
          type: mongoose.Schema.ObjectId,
          ref: 'users',
          required: [true, '請登入使用者']
      },
      likes: {
          type:Number,
          default:0
        },
      
      comments: {
        type: Number,
        default:0
      }
    }, { versionKey: false }
);
const Post = mongoose.model('posts', postSchema);

module.exports = Post;