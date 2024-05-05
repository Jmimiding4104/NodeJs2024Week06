const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '姓名為必填']
    },
    password: {
      type: String,
      select: false,
      required: [true, '密碼為必填']
    },
    email: {
      type: String,
      unique: true,
      required: [true, '信箱為必填']
    },
    image: {
      type: String,
      default: 0
    }
  }, { versionKey: false }
);
const User = mongoose.model('users', userSchema);

module.exports = User;