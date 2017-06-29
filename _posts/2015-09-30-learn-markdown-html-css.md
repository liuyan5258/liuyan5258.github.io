---
layout: post
title: Markdown格式预览
categories: Tool
tags:  Tool Markdown
author: LY
---

* content
{:toc}

Markdown格式预览





# 标题1

## 标题2

### 标题3

#### 标题4

##### 标题5

###### 标题6



这是一个段落这是一个段落这是一个段落这是一个段落这是一个段落这是一个段落这是一个段落这是一个段落这是一个段落  




> 这是一个块



![这是一张图片](http://os8ri8oj4.bkt.clouddn.com/default-cover.jpg)


[这是一个链接](https://liuyan5258.github.io)


这是一个无序列表如下：

- 这个列表1
- 这个列表2
- 这个列表3


这是一个有序列表如下：

1. 这个列表1
2. 这个列表2
3. 这个列表3


这是一段js代码：

```js
/**
 * 获取剩余时间
 * @param  {Number} endTime    截止时间
 * @param  {Number} deviceTime 设备时间
 * @param  {Number} serverTime 服务端时间
 * @return {Object}            剩余时间对象
 */
let getRemainTime = (endTime, deviceTime, serverTime) => {
    let t = endTime - Date.parse(new Date()) - serverTime + deviceTime
    let seconds = Math.floor((t / 1000) % 60)
    let minutes = Math.floor((t / 1000 / 60) % 60)
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24)
    let days = Math.floor(t / (1000 * 60 * 60 * 24))
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}
```


```
-- 这是一段没有指明类型的伪代码或命令行
for i from n−1 downto 1 do
     j ← random integer such that 0 ≤ j ≤ i
     exchange a[j] and a[i]
```

这是一段终端命令行代码：

```shell
zip -r images.zip images
```  

这是一段scss代码：

```scss
// 解决1px像素的问题
@mixin border($bdv,$w,$s,$c){
  #{$bdv}: $w $s $c;
  @at-root [data-dpr="2"] &{
    #{$bdv}: $w/2 $s $c;
  }
  @at-root [data-dpr="3"] &{
    #{$bdv}: $w/2.8 $s $c;
  }
}
```

这是一段css代码：

```css
.ui-title {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
```


<del>我要删除这段文字</del>


`this is code block`


下面是一个表格：

| 随机数取值范围 | 随机数 |        原始数据 | 结果          |
|:---------------|:-------|----------------:|:--------------|
|                |        | 1 2 3 4 5 6 7 8 |               |
| 1-8            | 6      |   1 2 3 4 5 7 8 | 6             |
| 1-7            | 2      |     1 7 3 4 5 8 | 2 6           |
| 1–6            | 6      |       1 7 3 4 5 | 8 2 6         |
| 1–5            | 1      |         5 7 3 4 | 1 8 2 6       |
| 1–4            | 3      |           5 7 4 | 3 1 8 2 6     |
| 1–3            | 3      |             5 7 | 4 3 1 8 2 6   |
| 1–2            | 1      |               7 | 5 4 3 1 8 2 6 |


引用外部插件：

<iframe height='317' scrolling='no' src='//codepen.io/haoyang/embed/jrvrQq/?height=317&theme-id=dark&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/haoyang/pen/jrvrQq/'>Fisher–Yates shuffle</a> by Chuan shi (<a href='http://codepen.io/haoyang'>@haoyang</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>


支持emoji😊😊表情😁


![](https://babeljs.io/images/logo.svg)

* 这段文字缩进


在终端显示也可以这样写：

```
> learn-es6@1.0.0 build c:\gitWorkSpace\learn-es6
> babel src -d lib
```


这是一段json代码：

```json
{
  "name": "learn-es6",
  "version": "1.0.0",
  "devDependencies": {
    "babel-cli": "^6.10.1"
  }
}
```

这是一段diff代码：

```diff
{
  "name": "learn-es6",
  "version": "1.0.0",
+   "scripts": {
+     "build": "babel src -d lib"
+   },
  "devDependencies": {
    "babel-cli": "^6.10.1"
  }
}
```
