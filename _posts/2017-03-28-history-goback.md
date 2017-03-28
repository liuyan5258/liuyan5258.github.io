---
layout: post
title:  "window.history"
date:   2017-03-28 16:09:10
categories: 移动开发
excerpt: 移动开发
---

* content
{:toc}  

### 概述  

浏览器窗口有一个history对象，用来保存浏览历史。  

最常用的属性：`length`  

```javascript
history.length;
```

history是不可遍历的.  

最常用的方法:
1. back()：移动到上一个访问页面，等同于浏览器的后退键。
2. forward()：移动到下一个访问页面，等同于浏览器的前进。
3. go()：接受整数作为参数，移动到该整数指定的页面，比如`go(1)`相当于 forward()，`go(-1)`相当于 back()，`go(0)`相当于刷新当前页面

*不要使用history.back()来实现登陆后返回的功能*  

### history.pushState() & history.replaceState()

这两个方法都是h5为history新增的功能，用来在浏览历史中添加和修改记录。

`history.pushState()`方法接受三个参数，依次为：  
`state`：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，可以填null。  
`title`：新页面的标签，但是所有浏览器目前都忽略这个值，因此这里可以填null。  
`url`：新的网址，必须与当前页面处在同一个域，浏览器的地址栏将显示这个网址。  

*注意：*
`pushState()不会触发页面刷新，如果设置了一个非同域的网址，则会报错。`

history.replaceState()的参数与history.pushState()的一模一样，用于修改浏览器历史中当前页面的值。

### state
history.state属性保存当前页面的state对象，是使用pushState()或replaceState()方法的第一个参数设置的对应页面专属的一个对象值。

```
history.pushState({page, 1}, 'title 1', '?page=1')
history.state
// page: 1
```
### popstate事件
每当同一个文件的浏览历史（即 history 对象）出现变化时，就会触发 popstate 事件。需要注意的是，仅仅调用 pushState 方法或 replaceState 方法 ，并不会触发该事件（只是设置好这个 state 属性），只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用 back、forward、go 方法时才会触发。  
另外，该事件只针对同一个窗口中的浏览页面

该事件只针对同一个窗口中的历史记录，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。


```
// 返回推荐
{
  const historyLength = window.history.length
  if (historyLength === 1 && utils.isAndroid && utils.isWeixin) {
    const url = window.location.href
    if (search.f !== 'today-news') {
      window.history.replaceState({ page: 'newslist' }, null, `//c.m.163.com/nc/qa/3g/today-news.html`)
    }
    window.history.pushState({ page: 'now' }, null, url)
  }
  window.onpopstate = () => {
    if (history.state && history.state.page === 'newslist') {
      window.location.reload()
    }
  }
}

```
