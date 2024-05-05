const User = require('../models/userSchema.js');
const decodeJWT = require('./decodeJWT.js');
const appError = require('./appError.js');

async function isAuthenticator(req, res, next) {
  if (!req.headers.authorization?.startsWith('Bearer')) {
    appError({ httpStatus: 500, errMessage: "驗證錯誤，請確認~", next });
    return;
  }
  const token = req.headers.authorization.split(' ')[1];
  const data = await decodeJWT(token);
  const user = await User.findOne({ _id: data.id }).select('+password');
  if (!user) {
    appError({ httpStatus: 400, errMessage: "驗證身分錯誤，重試或聯絡管理員~", next });
    return;
  }
  req.user = data.id;
  next();
}

module.exports = isAuthenticator;