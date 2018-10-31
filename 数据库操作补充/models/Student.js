const mongoose = require('mongoose');

// 定表结构
const schema = new mongoose.Schema({
    username: String,
    age: Number,
    // sex: String
    sex: {
        // type: String,
        type: mongoose.SchemaTypes.String,
        default: '男'
    }
});



// 向外输出可操作数据库的模型对象
module.exports =  mongoose.model('student', schema);

