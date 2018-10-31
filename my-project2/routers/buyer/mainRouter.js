const express = require('express');
const goods = require('../../handleDB/handleGoods');
const seller = require('../../handleDB/handleSeller');

const router = new express.Router();


// 首页	/
router.get('/', (req, res)=>{
    // 查询前4个商品
    let p1 = goods.findGoods(0, 4);
    // 查询前8个商家
    let p2 = seller.findSellers(0, 8);

    Promise.all([p1, p2]).then((result)=>{
        //得到两个的查询结果
        let goodslist = result[0];
        let shoplist = result[1];
        //渲染页面
        res.render('buyer/home', {
            goodslist: goodslist,
            shoplist: shoplist
        });
    })

});




// 店铺列表	/shop/list
router.get('/shop/list', (req, res)=>{
    res.render('buyer/shopList');
});

// 订单页面	/order
router.get('/order', (req, res)=>{
    res.render('buyer/order');
});

// 商品列表	/goods/list
router.get('/goods/list', (req, res)=>{
    res.render('buyer/goodsList');
});

module.exports = router;


/*
// 同时执行多个异步操作
let p1 = new Promise((resolve, reject)=>{
    //异步操作
    resolve('hello');
    
})

let p2 = new Promise((resolve, reject)=>{
    //异步操作
    // resolve('world');
    reject();
})

Promise.all([p1, p2]).then((result)=>{
    //打印两次异步操作的结果
    console.log(result);
})
.catch(()=>{
    console.log('失败');
})
*/
