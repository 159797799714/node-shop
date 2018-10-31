const mongoose = require('mongoose');

// 定表结构
const schema = new mongoose.Schema({
    goodsname: String,
    images: Array,
    price: Number,
    description: String,
    sellerid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'seller'
    }
});

// 向外输出可操作数据库的模型对象
module.exports =  mongoose.model('goods', schema);