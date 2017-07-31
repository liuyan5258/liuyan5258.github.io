---
layout: post
title: 正则表达式
categories: Javascript
tags: Javascript regularExpr
author: LY
---

* content
{:toc}  

正则表达式笔记：

1. 将中划线和下划线分隔的命名转换成大写驼峰命名







### 将中划线和下划线分隔的命名转换成大写驼峰命名
```js
var classifyRE = /(?:^|[-_])(\w)/g;
```

| ?:  | 非捕获元素之一，用圆括号将所有选择项括起来，相邻的选择项之间用竖线分隔。但用圆括号会有一个副作用，是相关的匹配会被缓存，此时可用?:放在第一个选项前来消除这种副作用 |
| ^   | 匹配输入的开始。如果多行标志被设置为true，那么也匹配换行符后紧跟的位置。例如，/^A/ 并不会匹配 "an A" 中的 'A'，但是会匹配 "An E" 中的 'A'。当 '^' 作为第一个字符出现在一个字符集合模式时，它将会有不同的含义。 |
| [xyz] | 一个字符集合。匹配方括号的中任意字符，包括转义序列。你可以使用破折号（-）来指定一个字符范围。对于点（.）和星号（*）这样的特殊符号在一个字符集中没有特殊的意义。他们不必进行转义，不过转义也是起作用的。例如，[abcd] 和[a-d]是一样的。他们都匹配"brisket"中得‘b’,也都匹配“city”中的‘c’。/[a-z.]+/ 和/[\w.]+/都匹配“test.i.ng”中得所有字符。|
| \w  | 匹配一个单字字符（字母、数字或者下划线）。等价于[A-Za-z0-9_]。例如, /\w/ 匹配 "apple," 中的 'a'，"$5.28,"中的 '5' 和 "3D." 中的 '3'。|  


> 上面的表达式匹配以第一个字符或以-或_开始的集合。  


```js
'abc-def'.match(classifyRE)    // ["a", "-d"]
'abc_def'.match(classifyRE)    // ["a", "_d"]
```

> 把匹配选项的字母转换成大写，然后去掉-或_

```js
var classify = function (str) { 
  return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); 
};
```

### 

