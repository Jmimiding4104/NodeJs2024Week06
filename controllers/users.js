const errHandle = require('../service/errHandle');
const successHandle = require('../service/succesHandle');
const appError = require('../service/appError');
const generateJWT = require('../service/generateJWT');
const decodeJWT = require('../service/decodeJWT');
//const isAuthenticator = require('../service/isAuthenticator');

const User = require('../models/userSchema');

const validator = require('validator');
const bcrypt = require('bcrypt');

const users = {
  async getUsers({ req, res }) {
    const user = await User.find();
    successHandle(res, user);
  },
  async createUser(req, res) {
    try {
      const { body } = req;
      if (body.name !== undefined) {
        const newUser = await User.create(
          {
            name: body.name,
            image: body.image
          }
        );
        successHandle(res, newUser);
      } else {
        errHandle(res)
      }
    } catch (err) {
      errHandle(res)
    }
  },
  async sign_up(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;
    const isEmail = await User.findOne({ email });

    if (!name?.trim() || !email?.trim() || !password?.trim() || !confirmPassword?.trim()) {
      appError({ httpStatus: 400, errMessage: "欄位皆為必填", next });
      return;
    }
    if (password.length < 8) {
      appError({ httpStatus: 400, errMessage: "密碼需8碼以上!!", next });
      return;
    }
    if (isEmail) {
      appError({ httpStatus: 400, errMessage: "此信箱已註冊!!", next });
      return;
    }
    if (password !== confirmPassword) {
      appError({ httpStatus: 400, errMessage: "輸入密碼與確認密碼不一致", next });
      return;
    }
    if (!validator.isEmail(email)) {
      appError({ httpStatus: 400, errMessage: "請正確輸入信箱格式", next });
      return;
    }


    const newUser = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 15)
    })
    successHandle(res, '帳號註冊成功!!', 201);
  },
  async sign_in(req, res, next) {
    const { email, password } = req.body;
    if (!email?.trim() || !password?.trim()) {
      appError({ httpStatus: 400, errMessage: "請輸入帳號與密碼", next });
      return;
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      appError({ httpStatus: 400, errMessage: "帳號密碼錯誤，請重試~", next });
      return;
    }
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      appError({ httpStatus: 400, errMessage: "帳號密碼錯誤，請重試~", next });
      return;
    }
    const data = await User.findOne({ email });
    const token = generateJWT(data);
    decodeJWT(token)
      .then((response) => {
        successHandle(res, { 'token': token, 'exp': response.exp });
      })
      .catch((err) => {
        appError({ httpStatus: 500, errMessage: "未知錯誤~請聯絡管理者~", next });
      })
  },
  async updatePassword(req, res, next) {

    const _id = req.user;
    const isUser = await User.findOne({ _id }).select('+password');
    if (!isUser) {
      appError({ httpStatus: 400, errMessage: "找不到使用者，請重試或聯絡管理員~", next });
      return;
    }
    const { name, password } = isUser;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    if (newPassword.length < 8) {
      appError({ httpStatus: 400, errMessage: "密碼需8碼以上!!", next });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      appError({ httpStatus: 400, errMessage: "輸入密碼與確認密碼不一致", next });
      return;
    }
    bcrypt.compare(oldPassword, password)
      .then(async (response) => {
        if (!response) {
          appError({ httpStatus: 400, errMessage: "系統錯誤~請重試~", next });
          return;
        }
        const updatePasswordData = await bcrypt.hash(newPassword, 15)
        const editPost = await User.findByIdAndUpdate(_id, { password: updatePasswordData })
        successHandle(res, '更改密碼成功!!');
        return;
      })
      .catch(() => {
        appError({ httpStatus: 400, errMessage: "系統錯誤~請重試~", next });
        return;
      })
  },
  async getProfile(req, res, next) {
    const _id = req.user;
    const profile = await User.find({_id});
    if(!profile){
      appError({ httpStatus: 400, errMessage: "系統錯誤~請重試~", next });
    }
    successHandle(res, profile);
  },
  async editProfile(req, res, next) {
    const { body } = req;
    const id = req.user;
    const UserToEdit = await User.findById(id);
    if (!UserToEdit) {
      appError({ httpStatus: 400, errMessage: "ID 錯誤，請確認", next });
      return;
    }
    if (!validator.isEmail(body.email)) {
      appError({ httpStatus: 400, errMessage: "請正確輸入信箱格式", next });
      return;
    }
    if (body.name !== undefined || body.email !== undefined) {
      const editContent = {
        name: body.name,
        email: body.email,
        image: body.image
      };
      //更新後最新的 DATA
      const editUser = await User.findByIdAndUpdate(id, editContent, { new: true });
      successHandle(res, editUser);
    } else {
      appError({ httpStatus: 400, errMessage: "content 為必填或錯誤", next })
    }
  }
}

module.exports = users;