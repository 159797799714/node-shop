const mongoose = require('mongoose');

// 定表结构
const schema = new mongoose.Schema({
    goodsid: String,
    buyerid: String,
    sellerid: String,
    count: Number
});

// 向外输出可操作数据库的模型对象
module.exports =  mongoose.model('order', schema);