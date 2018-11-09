var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var mongoose = require('mongoose')
var md5 = require('blueimp-md5')
var Schema = mongoose.Schema

var app = express()

app.use('/public', express.static(path.join(__dirname, './public/')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')))
app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

mongoose.connect('mongodb://localhost/itcast', { useMongoClient: true })
    /*用户登录信息*/
var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avater: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: 0
    },
    birthday: {
        type: Date
    },
    status: {
        /*0 正常状态 1 不可以评论，禁言 2 不可以登录*/
        type: Number,
        enum: [0, 1, 2],
        default: 0
    }

})

var User = mongoose.model('User', userSchema)
    /*话题数据====*/
var topicSchema = new Schema({
    model: {
        /*0分享 1问答 2招聘 3客户端测试*/
        type: Number,
        enum: [0, 1, 2, 3],
        default: 0
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Tom'
    },
    author_avatar: {
        type: String,
        default: '/public/img/avatar2.png'
    },
    browse_num: {
        type: Number,
        default: 1
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    }

})

var Topic = mongoose.model('Topic', topicSchema)

/*初始化数据=========*/
new Topic({
    model: '1',
    title: 'node 执行文件后无响应',
    content: '最近在看node in aciton 照着书来当用到标准库模组就会无响应，使用npm install 把标准库模组安装到目录下也是一样。不使用标准库的模组的文件就可以 正常执行，搜了一圈并没有看到类似问题，菜鸟初提问欢迎批评',
    author: 'StoneCX',
    author_avatar: '/public/img/author01.jpg'
}).save()
new Topic({
    model: '1',
    title: 'mongodb的ObjectId做相等判断很耗时间，有没有更快的方法？',
    content: '我有个统计分析的业务，需要进行百万次级别的判断两个ObjectId是否相等的操作，发现特别耗时。我开始用project._id.toString()==incomesi].projectid.toString()这种方法判断，一百万次判断要耗时13秒左右，后来改成project._id.equalsincomes[i].projectid这种方法，耗时也没有明显提升，依然是12~13秒，最后试了JSON.stringify(project._id)==JSON.stringify(incomesi].projectid这种方法，耗时更多，要16秒多。不知道有没有更快的判断方法',
    author: 'ytcgk',
    author_avatar: '/public/img/author02.png'
}).save()
new Topic({
    model: '1',
    title: 'node.js的入门（萌新）',
    content: '近期在学习node.js，由于自己是初学者，看了《Node.js开发指南》和 《Node.js开发实战》上的一些基础的东西，《深入浅出Node.js》看起来是很吃力，最近试着用Express开发自己的一个 个人博客系统，刚刚开始，就感觉很吃力，最近就在想该怎么来学习，希望曾经和我有相同问题的朋友解答下我的疑惑，学习路线很迷茫啊。。。',
    author: 'remembergf',
    author_avatar: '/public/img/author03.jpg'
}).save()
new Topic({
    model: '1',
    title: '阿里云服务器之间数据共享',
    content: '现在我在一个服务器上，产生了一段数据，需要共享给其他阿里云服务器来使用（服务器个数若干个），有什么比较好的方法嘛？？数据共享的实时性要求在秒级，同时数据产生的频率比较高（大概5分钟一次），请问各位大神有什么参考的例子或者思路嘛？？感谢！！！',
    author: 'quanpf2481',
    author_avatar: '/public/img/author04.png'
}).save()
new Topic({
    model: '1',
    title: '最近发现百度删除了好多网页',
    content: '不知道你们发现没，搜一个关键词，尤其以2011年以前的网页及其少，我后来发现可能是以前的数据在后面几页，结果我翻到最后也最多到2010年，那些被删的数据不知道去哪里了，百度应该备份了，但是他们为什么不显示呢',
    author: 'a69694510',
    author_avatar: '/public/img/author05.jpg'
}).save()
new Topic({
    model: '1',
    title: 'node js 爬取手机app的数据问题',
    content: '请问下各位大神，node js里面有没有可以爬取手机app的模块，或者有没有好的思路或者参考？？谢谢！！！',
    author: 'quanpf2481',
    author_avatar: '/public/img/author06.png'
}).save()
new Topic({
    model: '1',
    title: '请问vscode怎么配置不让它格式化注释？',
    content: 'vscode上有个配置是保存就格式化代码，但如果有一段代码被注释掉了，它连注释也会格式化，请问怎么配置让它不去格式化注释呢？',
    author: 'tomoya92',
    author_avatar: '/public/img/author07.jpg'
}).save()
new Topic({
    model: '1',
    title: '如果没有接触过koa，建议直接学习egg.js吗？',
    content: 'nodejs接触一年左右，一直在用express，想问下大家，如果没有接触过koa，建议直接学习egg.js吗？会不会很吃力，突然对egg.js有兴趣！',
    author: 'chinahsj',
    author_avatar: '/public/img/author08.png'
}).save()
new Topic({
    model: '1',
    title: '七牛云 要求必须配置备案后的域名 才能继续使用，大家如何应对？ 本论坛也是七牛云吧',
    content: '如题，我的网站采用 七牛云 存储 实现图片托管，近期七牛云更改业务规范，要求必须 使用备案域名 更新 存储配置 ，否则停止为新上传的图片提供cdn服务大家如何应对？ 申请备案好特么麻烦',
    author: 'pangguoming',
    author_avatar: '/public/img/author09.jpg'
}).save()
new Topic({
    model: '1',
    title: 'vim or emacs 能聊下各位大佬都用的什么？',
    content: '最近一直在纠结于 vim 和 emacs，突然想到来cnode问下各位大佬用的都是啥？vim or emacs 你们会选哪个呢？',
    author: 'yuanzhhh',
    author_avatar: '/public/img/author10.jpg'
}).save()
app.get('/', function(req, res) {
    Topic.find(function(err, topic) {
        if (err) {
            res.status(500).send('server error')
        }
        res.render('index.html', {
            user: req.session.user,
            topic: topic
        })
    })

})
app.get('/register', function(req, res) {
    res.render('register.html')
})
app.post('/register', function(req, res) {
    var body = req.body
        /*body.password = md5(md5(body.password))*/
    User.findOne({
        $or: [{
            email: body.email
        }, {
            nickname: body.nickname
        }]
    }, function(err, data) {
        if (err) {
            res.status(500).json({
                err_code: 500,
                message: 'server error'
            })
        }
        if (data) {
            res.status(200).json({
                err_code: 1,
                message: 'email or nickname is exist'
            })
        }

        new User(body).save(function(err, user) {
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'server error'
                })
            }
            req.session.user = user
            res.status(200).json({
                err_code: 0,
                message: 'success'
            })
        })
    })
})
app.get('/login', function(req, res) {
    res.render('login.html')
})
app.post('/login', function(req, res) {
    var body = req.body
        /*body.password = md5(md5(body.password))*/
    User.findOne({
        email: body.email,
        password: body.password
    }, function(err, user) {
        if (err) {
            res.status(500).json({
                err_code: 500,
                message: 'server error'
            })
        }
        if (!user) {
            res.status(200).json({
                err_code: 1,
                message: 'email or password is invalid'
            })
        }
        req.session.user = user
        res.status(200).json({
            err_code: 0,
            message: 'success'
        })
    })
})
app.get('/quit', function(req, res) {
    req.session.user = null
    res.redirect('/login')

})
app.get('/profile', function(req, res) {
    res.render('profile.html', { user: req.session.user })
})
app.post('/profile', function(req, res) {
    var body = req.body
    User.update({ email: body.email }, function(err, ret) {
        if (err) {
            res.status(500).json({
                err_code: 500,
                message: 'Server error'
            })
        }
        for (var key in body) {
            req.session.user[key] = body[key]
        }
        res.status(200).json({
            err_code: 1,
            message: 'ok'
        })
    })
})
app.get('/admin', function(req, res) {
    res.render('admin.html', { user: req.session.user })
})
app.post('/admin', function(req, res) {
    var body = req.body
    User.update({ email: req.session.user.eamil }, function(err, ret) {
        if (err) {
            res.status(500).json({
                err_code: 500,
                message: 'Server error'
            })
        }
        req.session.user.password = body.newPassword
        res.status(200).json({
            err_code: 1,
            message: 'ok'
        })
    })
})
app.get('/new', function(req, res) {
    res.render('new.html', { user: req.session.user })
})
app.post('/new', function(req, res) {
    var body = req.body
    new Topic(body).save(function(err, ret) {
        if (err) {
            res.status(500).json({
                err_code: 500,
                message: 'Server error'
            })
        }
        res.status(200).json({
            err_code: 1,
            message: 'post success'
        })
    })
})
app.get('/edit', function(req, res) {
    /*res.render('edit.html', { user: req.session.user })*/
    var title = req.query.title
    Topic.findOne({ title: title }, function(err, topic) {
        if (err) {
            res.status(500).send('server error')
        }
        console.log({ topic: topic })
        res.render('edit.html', {
            user: req.session.user,
            topic: topic
        })
    })

})
app.listen(3000, function() {
        console.log('running...')
    })
    /*
    /settings/profile 基本信息
    /settings/admin 账户设置
    /topics/new 发起（发起后再首页就可以看见了）
    /topic/话题标题   点击话题标题
    */
