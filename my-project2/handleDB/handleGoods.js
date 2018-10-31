const Goods = require('../models/Goods');

// 新增商品数据
module.exports.saveGoods = function(info){
    return new Promise((resolve, reject)=>{
        let goodsInfo = new Goods(info);
        goodsInfo.save().then(result=>{
            if(result){
                resolve();
            }else{
                reject();
            }
        })
    })
}


// 根据商家id查询商品
module.exports.findAllGoodsBySellerid = function(id){
    return new Promise((resolve, reject)=>{
        Goods.find({sellerid: id}).then(result=>{
            resolve(result);
        })
    })
}

// 根据page  count 查询商品
module.exports.findGoods = function(skip, limit){
    return new Promise((resolve, reject)=>{
        Goods.find().skip(skip).limit(limit).then(result=>{
            resolve(result);
        })
    })
}