---
layout: post
title: 图片懒加载
categories: Javascript
tags: Javascript
author: LY
---

* content
{:toc}  

```html
<figure class="img js-img u-img-placeholder" data-echo="${imgsrc}"></figure>
```








```js
const lazyLoader = () => {
  const CLIENT_HEIGHT = document.documentElement.clientHeight
  let imgs
  function init() {
    document.removeEventListener('scroll', load, false)
    document.addEventListener('scroll', load, {
      passive: true
    })
    const currentTop = document.body.scrollTop
    imgs = [].slice.call(document.querySelectorAll('[data-echo]:not(.img-error):not(.img-loading)')).map((item) => {
      return {
        el: item,
        top: item.getBoundingClientRect().top + currentTop
      }
    }).sort((a, b) => a.top - b.top)
    load()
  }
  function load() {
    const currentTop = document.body.scrollTop
    let index = 0
    for (let i = 0; i < imgs.length; i++) {
      const el = imgs[i].el
      if (imgs[i].top >= currentTop + (CLIENT_HEIGHT * 0.9)) {
        index = i
        break
      } else if (el.dataset.echo) {
        insertImg(el)
      }
    }
    imgs = imgs.slice(index)

    if (imgs.length === 0) {
      document.removeEventListener('scroll', load, false)
    }
  }

  function cssSupports(property) {
    if (!window.CSS || !window.CSS.supports) {
      return false
    }
    return CSS.supports(property)
  }

  function createImg({ src, alt }, onload = () => {}, onerror = () => {}) {
    const img = new Image()
    img.style.opacity = 0
    const prop = cssSupports('transition') ? 'transition' : 'webkitTransition'
    img.style[prop] = 'opacity .2s ease-in-out'
    img.src = src
    img.alt = alt || ''
    img.onload = () => {
      // setTimeout(onload, 0)
      onload()
      img.style.opacity = 1
      setTimeout(() => {
        img.style.cssText = ''
      }, 200)
    }
    img.onerror = () => {
      onerror && onerror(img)
    }
    return img
  }
  function insertImg(el, onload = () => {}, onerror = () => {}) {
    /* eslint-disable no-param-reassign */
    const dataset = el.dataset
    const img = createImg({ src: dataset.echo, alt: dataset.alt }, () => {
      el.classList.add('img-loaded')
      el.classList.remove('u-img-placeholder')
      el.classList.remove('img-error')
      el.classList.remove('img-loading')
      el.dataset.echo = ''
      onload()
    }, (img) => {
      el.classList.add('img-error')
      el.classList.remove('img-loading')
      el.removeChild(img)
      if (el.dataset.retry) {
        el.dataset.text = '点击加载'
        el.addEventListener('click', retryHandler, false)
      }
      onerror()
    })
    if (!el.classList.contains('img-loading')) {
      el.classList.add('img-loading')
      el.insertBefore(img, el.firstChild)
    }
    /* eslint-enable no-param-reassign */
  }

  function retryHandler(event) {
    event.preventDefault()
    event.stopImmediatePropagation()
    const target = event.target
    target.dataset.text = '加载中'
    insertImg(target, () => {
      target.dataset.text = ''
      target.dataset.retry = ''
    }, () => {
      target.dataset.text = '点击加载'
    }) 
    target.removeEventListener('click', retryHandler, false)
  }

  function refresh() {
    init()
  }
  return {
    init,
    refresh
  }
}

export default lazyLoader()
```










