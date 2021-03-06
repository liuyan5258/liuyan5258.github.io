---
layout: post
title: 为什么要使用https代替http
categories: 安全性
tags: Https 安全性
author: LY
---

* content
{:toc}  

### 什么是https

> 简单地讲， HTTPS 是加过密的 HTTP。这样，由于网路上传输的数据是加密的，在浏览网页时，除了你自己可以看到你在看什么网页，第三方是无法得知你在干什么的。













### http存在的安全隐患

1. http明文传输不仅会泄露数据，也很容易被人注入数据

  比如某运营商的套餐售卖信息并不是原网页的内容，而是网页数据经过运营商服务时被强行注入的数据。这个情况，业内叫`流量劫持`。

2. http不仅内容不是加密的，协议本身也不是加密的，于是协议指令本身也可能被修改

3. HTTP 传输的 Web 网页中对于系统设备的授权是统一的

  比如你去访问一个视频聊天网站，需要访问你手机上的摄像头，你同意了。但是万万没想到，这个页面在通过某个网络节点的时候，被黑客注入了一段代码，在这个时候，注入的脚本在浏览器看来，已经是原网页的一部分，自然就有了对镜头的访问权限。我天，一大波xx门事件即将泄露。

### https的优点

1. 保护数据隐私
2. 信息安全

  但当网站使用HTTPS协议，SSL证书须认证服务器的真实身份，有效区分钓鱼网站和官方网站。用户可通过浏览器向用户展示网站的认证信息，让用户轻松识别网站的真实身份，防止钓鱼网站仿冒。

3. 保证新闻的真实性

  当您使用HTTP在网站上阅读新闻时，文章内容可能很容易被第三方使用MiTM向量修改。

  使用HTTPS在网站上阅读新闻，可确保读取的文章不会被不需要的实体拦截。

### 如何升级https

  [HTTPS 升级指南](//www.ruanyifeng.com/blog/2016/08/migrate-from-http-to-https.html)

  另外，http的下一个版本http/2已经可以自带加密，只是这个协议本身推广还需要一段时间，于是网页传输加密还是以https为主。