const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateJWT(data) {
  console.log(data.id)
  const token = jwt.sign({id: data.id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });

  return token;
}

module.exports = generateJWT;