// server core
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    compress = require('compression')
   
const app = express()
const server = require('http').createServer(app)

const loginRouter = require('./routes/login.js')

// GZIP压缩
app.use(compress())
    // 设置响应头
app.use(function(req, res, next) {
        res.header('X-Powered-By', 'Express')
        res.header('Access-Control-Allow-Origin', '*')
        next()
    })
    // 首页
app.use('/', express.static(path.join(__dirname, '../static/dist/')))
    //静态资源
app.use('/static', express.static(path.join(__dirname, '../static/src')))
    // for parsing application/json
app.use(bodyParser.json())
    // for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
        extended: true
    }))


try {
    // api路由
    app.use('/login', loginRouter)
} catch (err) {
    console.log('router出错了:' + err)
}

app.use(function(err, req, res, next) {
    console.error('mainjs:' + err)
    res.body = {
        code: 500,
        message: '服务器打酱油去了~',
        data: err.stack
    }
    res.status(500).json(res.body)
});
console.log('> Starting server...')
server.listen(3000, '127.0.0.1', function() {
    let port = server.address().port
    console.log('server started at port: %s', port)
    
})