---
layout: post
title: 工作中的一些思路技巧
categories: Javascript
tags: tips Javascript
author: LY
---

* content
{:toc}  

### 工作记录：

1. javascript利用事件委托，减少页面事件的绑定，提高页面性能
2. DOM数组结构如何像原生数组一样使用forEach
3. 命名规范
4. es6相关  













### javascript利用事件委托，减少页面事件的绑定，提高页面性能

```html
<div class="js-delegate">
  <div class="target1">
  </div>
  <div class="target2">
  </div>
  <div class="target3">
  </div>
</div>
```
```js
  function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
    let element = el
    while (element && element.removeChild) {
      if (matchesSelector.call(element, selector)) {
        return element
      }
      element = element.parentElement
    }
    return null
  }

  const delegate = document.querySelector('.js-delegate')
  delegate.addEventListener('click', (e) => {
    const target = closest(e.target, '.target1')
    if (!target) return
    // todo
  })

  delegate.addEventListener('click', (e) => {
    const target = closest(e.target, '.target2')
    if (!target) return
    // todo
  })

  delegate.addEventListener('click', (e) => {
    const target = closest(e.target, '.target3')
    if (!target) return
    // todo
  })
```

### DOM数组结构如何像原生数组一样使用forEach

```js
const DOMLIST = document.querySelectorAll('.item')
Array.prototype.forEach.call(DOMLIST, elm => {
  // todo
})
```

```js
const DOMLIST = [].slice.call(document.querySelectorAll('.item'))
DOMLIST.forEach((item) => {
  // todo
})
```

### 命名规范

1. 全局的常量用全大写，两个单词用下划线隔开
2. 

### es6相关

1. 解构赋值

```js
const pixel = '200*50'
const [width, height] = pixel ? pixel.split('*') : [0, 0]
```


