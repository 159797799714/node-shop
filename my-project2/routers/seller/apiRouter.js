const express = require('express');
const multiparty = require('multiparty');
const seller = require('../../handleDB/handleSeller');
const bodyParser = require('body-parser');
const Cookies = require('cookies');
const goods = require('../../handleDB/handleGoods');

const router = new express.Router();

// 处理注册的请求
router.post('/regiester', (req, res)=>{
    // 获得注册的参数
    let form = new multiparty.Form({
        uploadDir: './static/images'
    });
    form.parse(req, (error, fields, files)=>{
        let name = fields.name.length>0 ? fields.name[0] : '';
        let password = fields.password.length>0 ? fields.password[0] : '';
        let rePassword = fields.rePassword.length>0 ? fields.rePassword[0] : '';

        let logoPath = files.logo.length>0 ? ('/'+files.logo[0].path) : '';
        let bannerPath = files.banner.length>0 ? ('/'+files.banner[0].path) : '';

        // 判断是否为空
        if(!name || !password || !rePassword || !logoPath || !bannerPath){
            res.json({
                status: 1,
                message: '输入不能为空'
            })
            return;
        }

        // 判断密码是否一致
        if(password !== rePassword){
            res.json({
                status: 2,
                message: '两次输入的密码不一致'
            })
            return;
        }

        // 判断商家是否注册过
        seller.canRegiester(name)
        .then(()=>{
            // 注册，保存商家信息
            seller.saveSellerInfo({
                sellername: name,
                password: password,
                logo: logoPath,//图片存放的路径
                banner: bannerPath
            }).then(()=>{
                res.json({
                    status: 0,
                    message: '注册成功'
                })
            })

        })
        .catch(()=>{
            res.json({
                status: 3,
                message: '该商家已存在'
            })
        })

    })
    // 响应客户端
})


router.use(bodyParser.urlencoded({extended: false}));

// 处理登录的请求
router.post('/login', (req, res)=>{
    // 取得请求的参数
    let sellername = req.body.sellername;
    let password = req.body.password;

    // 判断
    if(!sellername || !password){
        res.json({
            status: 1,
            message: '输入不能为空'
        })
        return;
    }

    // 查询数据库，商家是否存在，密码是否正确
    seller.findSeller(sellername, password)
    .then((result)=>{
        // 登录成功
        //保存登录的状态
        let cookies = new Cookies(req, res);
        cookies.set('SELLERID', result._id);

        res.json({
            status: 0,
            message: '登录成功'
        })

    })
    .catch(()=>{
        //登录失败
        res.json({
            status: 2,
            message: '登录失败，用户名或密码错误'
        })
    })
})



// 处理新增商品
router.post('/add/goods', (req, res)=>{
    // 获得请求参数
    let form = new multiparty.Form({
        uploadDir: 'static/images'
    });
    form.parse(req, (error, fields, files)=>{
        // console.log(fields);
        // console.log(files);
        let name = fields.name.length>0 ? fields.name[0] : '';
        let description = fields.des.length>0 ? fields.des[0] : '';
        let price = fields.price.length>0 ? fields.price[0] : '';

        let images = files.images.map(item=>{
            return '/'+item.path;
        })

        let sellerid = new Cookies(req, res).get('SELLERID');

        // 保存商品
        goods.saveGoods({
            goodsname: name,
            images: images,
            price: price,
            description: description,
            sellerid: sellerid
        }).then(()=>{
            res.json({
                status: 0,
                message: '保存成功'
            })
        }).catch(()=>{
            res.json({
                status: 1,
                message: '保存失败'
            })
        })

    })


    // 判断


    // 新增商品
})




module.exports = router;