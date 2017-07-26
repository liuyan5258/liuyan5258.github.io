---
layout: post
title: 常用的javascript方法
categories: Javascript
tags: Javascript
author: LY
---

* content
{:toc}  

整理工作中常用的一些javascript方法：

1. jsonp
2. localParam
3. round
4. requestAnimFrame
5. object.assign polyfill
6. closest
7. getCookie
8. importJs
9. ajax
10. formatTime
11. isOwnEmpty
12. isWifi  













### jsonp
```js
function jsonp(a, b, c) {
  /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
  let d = document.createElement('script')
  d.src = a
  d.charset = c || 'utf-8'
  d.onload = () => {
    d.onload = d.onerror = null
    d.parentNode.removeChild(d)
    b && b(!0)
  }
  d.onerror = () => {
    d.onload = d.onerror = null
    d.parentNode.removeChild(d)
    b && b(!1)
  }
  document.head.appendChild(d)
}

```

### localParam
```js
function localParam(s = window.location.search, hash = window.location.hash) {
  function fn(str, reg) {
    if (str) {
      let data = {}
      str.replace(reg, ($0, $1, $2, $3) => {
        data[$1] = $3
      })
      return data
    }
    return ''
  }
  return {
    search: fn(s, new RegExp('([^?=&]+)(=([^&]*))?', 'g')) || {},
    hash: fn(hash, new RegExp('([^#=&]+)(=([^&]*))?', 'g')) || {}
  }
}
```

### round
```js
function round(num) {
  return num > 10000 ? `${Math.round((num / 9999) * Math.pow(10, 1)) / Math.pow(10, 1)}万` : num
}
```

### requestAnimFrame
```js
window.requestAnimFrame = (() => {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()
```

### object.assign polyfill
```js
const assign = Object.assign || function (...args) {
  if (args[0] === null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  const target = Object(args[0])
  for (let index = 1; index < args.length; index++) {
    let source = args[index]
    if (source != null) {
      /* eslint-disable no-restricted-syntax */
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
      /* eslint-enable no-restricted-syntax */
    }
  }
  return target
}

export { assign as default }
```

### closest
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
```

### formatHtml
```js
const htmlEntitiesMap = {
  '&hellip;': '...',
  '&quot;': '\"',
  '&lt;': '\<',
  '&gt;': '\>',
  '&acute;': '\´',
  '&copy;': '\©',
  '&nbsp;': '\ ',
  '&prime;': '\″',
  '&lsquo;': '\“',
  '&rsquo;': '\”',
  '&darr;': '\↓'
}

export default function formatHtml(str) {
  return str.replace(/((!?&hellip;)|(!?&quot;)|(!?&lt;)|(!?&gt;)|(!?&acute;)|(!?&copy;)|(!?&nbsp;)|(!?&prime;)|(!?&lsquo;)|(!?&rsquo;)|(!?&darr;))/g, (match, p) => {
    return htmlEntitiesMap[p]
  })
}
```

### getCookie
```js
function getCookie(sKey) {
  return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
}
```

### importJs
```js
function importJs(url, callback) {
  const script = document.createElement('script')
  script.src = url
  script.charset = 'utf-8'
  script.onload = () => {
    script.onload = script.onerror = null
    script.parentNode.removeChild(script)
    typeof callback === 'function' && callback(true)
  }
  script.onerror = () => {
    script.onload = script.onerror = null
    script.parentNode.removeChild(script)
    typeof callback === 'function' && callback(false)
  }
  document.head.appendChild(script)
}
```

### ajax
```js
function ajax(option) {
  var data, dataType, key, method, request
  if (!option.url) {
    throw new Error('Need for url')
  }
  dataType = option.dataType || 'text'
  method = option.method || 'GET'
  data = ''
  if (!!option.data && typeof option.data !== 'string') {
    for (key in option.data) {
      data += key + "=" + option.data[key] + "&"
    }
    data = data.slice(0, data.length - 1)
  } else {
    data = option.data
  }
  request = new XMLHttpRequest()
  request.open(method, option.url, true)
  if (method.toUpperCase() === 'POST') {
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded charset=UTF-8')
  }
  request.onload = function() {
    var result
    if (request.status >= 200 && request.status < 400) {
      if (dataType.toUpperCase() === 'JSON') {
        result = JSON.parse(request.responseText)
      }
      if (typeof option.success === "function") {
        option.success(result)
      }
    } else {
      if (typeof option.error === "function") {
        option.error()
      }
    }
  }
  request.send(data)
}
```

### formatTime
```js
formatTime(time) {
  let date = null
  if (typeof time === 'number') {
    date = time
  } else {
    date = time.replace(/-/g, '/')
  }
  const t = new Date(date)
  const now = Date.now()
  const distance = {
    day: Math.floor((now - t.getTime()) / (1000 * 60 * 60 * 24)),
    hour: Math.floor((now - t.getTime()) / (1000 * 60 * 60)),
    minute: Math.floor((now - t.getTime()) / (1000 * 60))
  }
  if (distance.day > 0) {
    if (distance.day === 1) {
      return '1天前'
    }
    const tt = t.getMonth() + 1
    const dd = t.getDate()
    return `${t.getFullYear()}-${tt < 10 ? '0' + tt : tt}-${dd < 10 ? '0' + dd : dd}`
  }
  if (distance.hour > 0) {
    return distance.hour + '小时前'
  }
  return (distance.minute || 1) + '分钟前'
}
```

### isOwnEmpty
```js
function isOwnEmpty(obj) {
  if (Object.prototype.toString.call(obj) === '[object Array]' && obj.length === 0) {
    return true
  }
  if (Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length === 0) {
    return true
  }
  if (obj === '' || obj === undefined) {
    return true
  }
  return false
}
```

### isWifi
```js
function isWifi() {
  const ua = window.navigator.userAgent
  // x5浏览器会在ua中增加 wifi信息
  if (ua.match(/NetType/i) && !ua.match(/NetType\/WIFI/i)) {
    return false
  }
  return true
}
```