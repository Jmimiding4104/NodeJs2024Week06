//將連結的部分獨立
const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('資料庫連接成功'))
  .catch((error) => console.log(error))