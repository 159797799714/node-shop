const express = require('express');
const Cookies = require('cookies');
const seller = require('../../handleDB/handleSeller');
const goods = require('../../handleDB/handleGoods');

const router = new express.Router();

// 注册页面
router.get('/regiester', (req, res)=>{
    res.render('seller/regiester');
})


// 登录页面
router.get('/login', (req, res)=>{
    res.render('seller/login');
})


//判断商家是否登录了，只有登录了，才能访问以下页面
router.use((req, res, next)=>{
    // 取得商家id
    let cooies = new Cookies(req, res);
    let id = cooies.get('SELLERID');
    // 判断
    if(id){
        // 查询数据库是否存在该商家
        seller.findSellerById(id)
        .then(()=>{
            // 登录了，可以访问
            req.sellerid = id;
            next();
        })
        .catch(()=>{
            //id是伪造的，查不到商家
            res.redirect('/seller/login');
        })

    }else{
        //没有id，没有登录
        res.redirect('/seller/login');
    }

    

})


// 商品管理
router.get('/goods/list', (req, res)=>{
    //获得商家id
    let sellerid = req.sellerid;

    // 根据id查询商品列表
    goods.findAllGoodsBySellerid(sellerid)
    .then((result)=>{
        // 渲染页面
        res.render('seller/goodsList', {
            data: result
        });
    })

});

// 新增商品
router.get('/add/goods', (req, res)=>{
    res.render('seller/addGoods');
});
// 修改商品
router.get('/modify/goods', (req, res)=>{
    //获得商品id
    // 查询商品信息
    // 渲染页面
    res.render('seller/modifyGoods');
});
// 删除商品
router.get('/delete/goods', (req, res)=>{
    //获得商品id
    // 操作数据库，根据id删除商品
    // 响应客户端
    res.redirect('/seller/goods/list');
})

// 订单列表
router.get('/order', (req, res)=>{
    res.render('seller/order');
});
// 个人中心
router.get('/info', (req, res)=>{
    res.render('seller/sellerCenter');
});
// 退出
router.get('/logout', (req, res)=>{
    let cookies = new Cookies(req, res);
    cookies.set('SELLERID', null);
    // 跳转到登录
    res.redirect('/seller/login');
});





module.exports = router;