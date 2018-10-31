const mongoose = require('mongoose');

// 定表结构
const schema = new mongoose.Schema({
    studentid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'student'//这个id值，关联哪一个表格，用这个id去关联的表格就能查询到数据
    },
    score: Number

});



// 向外输出可操作数据库的模型对象
module.exports =  mongoose.model('score', schema);

