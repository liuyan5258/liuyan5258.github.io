---
layout: post
title: http中有趣的referer
categories: Http
tags: Http 前端安全性
author: LY
---

* content
{:toc} 

### 什么是referer头

> referer请求头让服务器能够拿到请求资源的来源。比如我在www.weibo.com里面点击一个www.baidu.com的链接，那么在www.baidu.com的页面的header信息里就会有Referer=www.weibo.com。  
  referer可以用于分析用户的兴趣爱好、收集日志、优化缓存等等。也可以让服务器发现过时的和错误的链接并及时维护。

referer有很多合法的用例，例如找到你网站上的死链、追踪错误或找到用户是通过哪些搜索条件找到你的网站的。

可以用来提高网站的安全性，检查referer头是一个阻止跨站请求伪造的办法。










### 获取页面的referrer

```js
console.log(document.referrer)
```

### 为一个单独的链接移除referer

html5添加了一堆有用的新值在rel属性上，其中有一个值是`noreferrer`，这个属性在主流浏览器中基本上支持。

```html
<a href="//baidu.com" target="_blank" rel="noreferrer">跳转</a>
```

对于一些旧的浏览器可以用一些小技巧来降级处理，具体做法是用 JavaScript 打开一个新的标签页，然后在其中输出一个 refresh 标签来加载实际你想要在这个标签页中加载的 url

```js
var newWindow = window.open( "", "_blank" );
newWindow.document.write(
    "<META HTTP-EQUIV="refresh" content="0; url=" + url + "">"
);
```

### 为整个网页的每个链接移除referer

html规范引入了一个新的规范：

```html
<meta name="referrer">
```

### 在什么情况下会丢失referrer

> 1.修改location来进行页面导航，会导致在ie下丢失referrer  
  2.鼠标拖拽打开新窗口会丢失referrer  
  3.HTTPS跳转到http的网站是，浏览器不会发送referrer

### 相关文章

[关于控制 Referer 你想要知道的一切（和更多的）](https://75team.com/post/everything-you-could-ever-want-to-know-and-more-about-controlling-the-referer-header-fastmail-blog.html)  
[javascript操作referer](//www.cnblogs.com/rubylouvre/p/3541411.html)



