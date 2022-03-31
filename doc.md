# 看我是如何利用github每天给自己采集精彩文章

## 前言
一直都有这个想法，只是没有去做，最近闲下来实现了一把，这样也省下了我每天不少的时间到处找文章看，岂不是美哉，开放出来也希望大家共同维护，也可以留下你的邮件我把你加进去你也可以每天收到推送的文章

## 项目解构
```
|-package.json
|-tsconfig.json
|-README.md
|-src
  |- main.ts ## 获取采集后的数据做邮件发送以及html渲染输出
  |- render.ts ## 把邮件代码生成html
  |- email.ts ## 邮件配置以及邮件发送的处理
  |- collection ## 这里放的是采集的一些文章
    |- cnode.ts
    |- segmentfault.ts
    |- cloudTencent.ts
```
项目地址 https://github.com/tcly861204/node-collection-blog

## 简单熟悉一下项目使用到的前端库
+ 第一： nodemailer库的认识
node发送邮件的话主要就是靠这个库

```
const nodemailer = require('nodemailer')

```

+ 第二： request库的认识
这个库主要是服务端发送请求用的，把请求回来的接口拿到做一下代码的解析, 在这个项目里面只需要知道这一点就够了，详细的用法可以百度
```
const request = require('request')
request.get('https://www.baidu.com/', (error, response, body) => {
  if (!err && response.statusCode == 200) { 
    console.log(body)
  }
})
```
+ 第三： cheerio
这个库的话就是node版本的jQuery，实在和
```
const cheerio = require('cheerio'),
$ = cheerio.load('<h2 class = "title">Hello world</h2>');
$('h2.title').text('Hello there!');
$('h2').addClass('welcome');
$.html();
```