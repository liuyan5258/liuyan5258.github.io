---
layout: post
title: 为gitPage静态网站添加service worker离线访问功能
categories: Html5
tags: Html5 Javascript
author: LY
---

* content
{:toc}  

### 先决条件：

1.浏览器支持

[支持的浏览器](https://jakearchibald.github.io/isserviceworkerready/)  

2.https协议

在开发过程中，可以通过 localhost 使用服务工作线程，但如果要在网站上部署服务工作线程，需要在服务器上设置 HTTPS。注意，本地修改hosts，自定义域名映射到localhost的不生效。



















### https替换http

  [我们为什么要使用https](../why-use-https)

### 注册服务工作线程

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
```

检查serviceWorker是否可用，如果可用，则在页面加载之后注册/sw.js的服务工作线程。

在根目录下新建sw.js，把[这个js的内容拷贝进去](/sw.js)

### 修改不需要缓存的列表

```js
const ignoreFetch = [
  /https?:\/\/cdn.bootcss.com\//,
  /https?:\/\/www.google-analytics.com\//,
  /https?:\/\/hm.baidu..com\//,
  /https?:\/\/dn-lbstatics.qbox.me\//,
  /https?:\/\/at.alicdn.com\//
];
```

### 在chrome中做离线测试

打开 DevTools，转至 Application 面板，然后启用 Offline 复选框。

![图1](https://developers.google.com/web/fundamentals/getting-started/codelabs/offline/img/479219dc5f6ea4eb.png?hl=zh-cn)

点击复选框后，请注意 Network 面板标签旁边的警告图标（带有感叹号的黄色三角形）。这表示您处于离线状态。

现在你刷新页面，仍能完全重新加载页面，而且很快。

这说明你的离线缓存应用成功了。