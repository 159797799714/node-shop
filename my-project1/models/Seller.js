const mongoose = require('mongoose');

// 定表结构
const schema = new mongoose.Schema({
    sellername: String,
    password: String,
    logo: String,//图片存放的路径
    banner: String
});

// 向外输出可操作数据库的模型对象
module.exports =  mongoose.model('seller', schema);
