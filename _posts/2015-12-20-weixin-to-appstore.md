---
layout: post
title:  "从微信内置浏览器打开appStore下载客户端"
date:   2015-12-20 15:44:54
categories: 移动开发
excerpt: 移动开发。
---

* content
{:toc}

## 从微信内置浏览器打开appStore下载客户端

原理：

![原理](https://github.com/liuyan5258/liuyan5258.github.io/blob/master/static/images/img-01.png?raw=true)  

在中间页面的时候需要判断是在微信内置的浏览器打开还是在safari里面打开。

    <div class="m-container">
      <a class="load-ios" target="_blank" href="http://3g.163.com/links/4633" onclick="goToSafari()"></a>
      <a href="http://file.ws.126.net/3g/client/limei6_news_1214.apk" class="load-andriod"></a>
    </div>
    <script>
      function goToSafari() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          alert("请用safari打开");
        }else{
          window.location = "https://itunes.apple.com/cn/app/wang-yi-xin-wen/id425349261?mt=8"
        }
      }
    </script>

http://3g.163.com/links/4633这个中间页面是已经做了处理的，可以直接跳转的appstore