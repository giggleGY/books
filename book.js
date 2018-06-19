var request = require('request');
var http = require('http');
var fs = require('fs');
var url=require('url')
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
//设置跨域访问



app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


/*
var server = http.createServer(function (req,res) {

    /!*request('https://api.douban.com/v2/book/1220562', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the baidu homepage.
            res.write(body);
            res.end();
        }
    })*!/

    res.write('body');
    res.end();
});
*/

app.get('/get_book_list.html',function (req,res) {

    /*var url = decodeURI(req.query.name)
    console.log(url);*/

    /*请求参数有中文转码后再用服务端发送请求*/
    var url = encodeURI(req.query.name)
    console.log(url);
    /*send:就是end但是多了响应头的设置*/
    // if(req.query.id==)
    request('http://xs.0359you.com/index/index/get_book_list.html?book_name='+url, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            console.log(req.query.name);
            console.log(body);
            res.send(body)
        }
    })
})

app.get('/get_chapter_list.html',function (req,res) {

    /*var url = decodeURI(req.query.name)
    console.log(url);*/

    /*请求参数有中文转码后再用服务端发送请求*/
    var url = encodeURI(req.query.name)
    console.log(url);
    /*send:就是end但是多了响应头的设置*/
    // if(req.query.id==)
    request('http://xs.0359you.com/index/index/get_chapter_list.html?bid='+url, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            console.log(req.query.name);
            console.log(body);
            res.send(body)
        }
    })
})


/*设置url的编码的格式的解析的的方式*/
app.use(bodyparser.urlencoded({ extended: false }))

/*app.post('/',function (req,res) {

    /!*console.log(req.body.id);
    request({
        url: 'https://api.douban.com/v2/book/'+req.body.id,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify()
    }, function(error,response,body) {

        if (!error && response.statusCode == 200) {

            /!*获取提交的参数，我们需要借助body-parser*!/
            console.log(body);
            res.send(body);
        }
    });*!/

    console.log(req.body.id);
    request.post({url:'http://xs.0359you.com/index/index/'+req.body.book_name, form:{}}, function(error,response,body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(body)
        }
    })
})*/





app.listen(3000);