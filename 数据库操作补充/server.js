const express = require("express");
const mongoose = require('mongoose');
const Student = require('./models/Student');
const Score = require('./models/Score');


const server = express();



// 连接数据库
new Promise((resolve, reject)=>{
    mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, dbName: 'myDataBase'}, (error)=>{
        if(error){
            console.log('数据库连接失败');
        }else{
            console.log('数据库连接成功');
            resolve();
        }
    })
})
//启动服务器
.then(()=>{
    server.listen(8080, 'localhost', (error)=>{
        if(error){
            console.log('服务器启动失败');
        }else{
            console.log('服务器启动成功');
            handleDB();
        }
    })
})


function handleDB(){
    //写操作数据库的代码
    

    // 表格关联查询
    // Score.find().populate(['studentid']).then(result=>{
    //     console.log(result);
    // })


    // 排序, 1升序，-1降序
    Score.find().sort({score: 1}).then(result=>{
        // console.log(result);
    })

    Student.find().sort({age: 1}).then(result=>{
        // console.log(result);
    })


    // 排序+分页   page=1  count = 2   sort -1
    Student.find().sort({age: -1}).skip(0).limit(2).then(result=>{
        // console.log(result);
    })


/*
模糊查询:
    $regex  正则匹配
    $lt  小于
    $gt 大于
    $ne   不等于
    $lte  小于等于
    $gte  大于等于
*/


    // 模糊查询
    // let reg = new RegExp(/三/);
    // let reg = new RegExp(/^王/);
    /*
    Student.find(
        {
            username: {$regex: reg}
        }
    ).then(result=>{
        console.log(result);
    })
    */


    Student.find({
        age: {$gte: 40}
    }).then(result=>{
        console.log(result);
    })

}