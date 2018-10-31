const Seller = require('../models/Seller');

// 根据商家名字判断是否注册
module.exports.canRegiester = function(name){
    return new Promise((resolve, reject)=>{
        Seller.findOne({sellername: name}).then(result=>{
            if(result){
                //注册过
                reject();
            }else{
                //没有注册过
                resolve();
            }
        })
    })
}


//保存商家信息，注册账号
module.exports.saveSellerInfo = function(info){
    return new Promise((resolve, reject)=>{
        let sellerInfo = new Seller(info);
        sellerInfo.save().then((result)=>{
            resolve();
        })
    })
}

// 查询商家,判断是否登录成功
module.exports.findSeller = function(name, psd){
    return new Promise((resolve, reject)=>{
        Seller.findOne({sellername: name, password: psd}).then(result=>{
            if(result){
                //登录了
                resolve(result);
            }else{
                //没有登录
                reject();
            }
        })
    })
}

// 根据id查找商家
module.exports.findSellerById = function(id){
    return new Promise((resolve, reject)=>{
        Seller.findOne({_id: id}).then(result=>{
            if(result){
                resolve();
            }else{
                reject();
            }
        })
    })
}

// 查询商家的分页数据
module.exports.findSellers = function(skip, limit){
    return new Promise((resolve, reject)=>{
        Seller.find().skip(skip).limit(limit).then(result=>{
            resolve(result);
        })
    })
}