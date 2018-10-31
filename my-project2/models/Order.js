const mongoose = require('mongoose');

// 定表结构
const schema = new mongoose.Schema({
    goodsid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'goods'
    },
    buyerid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'buyer'
    },
    sellerid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'seller'
    },
    count: Number
});

// 向外输出可操作数据库的模型对象
const Order =  mongoose.model('order', schema);
module.exports = Order;


// 关联多张表格的查询
// Order.find().populate(['goodsid', 'buyerid', 'sellerid'])

