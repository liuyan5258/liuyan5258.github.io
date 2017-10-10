---
layout: post
title: Object.defineProperty()模拟vuejs的双向数据绑定
categories: Vuejs
tags: Vuejs
author: LY
---

* content
{:toc} 

vue.js在原理上不支持双向绑定，v-model只是通过监听dom事件实现的语法糖。
像vuejs这种MVVM框架都是通过Object.defineProperty()来实现数据的双向绑定的。
[文章](https://github.com/DMQ/mvvm)









下面我们用Object.defineProperty()来模拟vuejs的数据双向绑定。

html代码：
```html
<!--其中使用了两个指令，x-value 和 x-text-->
<form autocomplete="off">
  <span>姓名：</span><input type="text" x-value="name"/>
  <p x-text="name"></p>
  <span>年龄：</span><input type="number" x-value="age"/>
  <p x-text="age"></p>
  <span>学校：</span><input type="text" x-value="school"/>
  <p x-text="school"></p> 
</form>
```

js代码：
```js
// 基本数据对象
let data = {
  _name: '',
  _age: 24,
  _school: '',
}

/*
* model --> view 的绑定
* 基本思想：使用defineProperty()的getter和setter
* 当model发生改变时，在setter函数中触发更新DOM的函数
*/
const defineGetAndSet = (obj, prop) => {
  Object.defineProperty(obj, prop, {
    get: () => {
      return obj[`_${prop}`]
    },
    set: (newValue) => {
      obj[`_${prop}`] = newValue
      // 触发DOM更新
      render(prop, newValue)
    }
  })
}

// 针对不同指令，进行不同DOM的更新操作
const directives = {
  'x-value': function(newValue) {
    this.setAttribute('value', newValue)
  },
  'x-text': function(newValue) {
    this.innerHTML = newValue
  }
}

// 依据新数据，来触发dom更新
const els = [document.querySelectorAll('[x-value]'), document.querySelectorAll('[x-text]')]

const render = (prop, newValue) => {
  els.forEach((item) => {
    for (let i = 0, len1 = item.length; i < len1; i ++) {
      let attrs = item[i].attributes;
      for (let j = 0, len2 = attrs.length; j < len2; j ++) {
        if (attrs[j].nodeName.indexOf('x-') !== -1 && attrs[j].nodeValue === prop) {
          directives[attrs[j].nodeName].call(item[i], newValue);
        }
      }
    }
  })
}

// 定义三个访问器属性
defineGetAndSet(data, 'name')
defineGetAndSet(data, 'age')
defineGetAndSet(data, 'school')

// 初始化属性
data.name = 'liuyan'
data.age = 24
data.school = 'jxnd'

/*
* view --> model的绑定
* 基本思想：监听表单的keyup、change等事件
* 在事件处理函数中将值传给model
*/
const updateData = (event) => {
  if (event.target.hasAttribute('x-value')) {
    const prop = event.target.getAttribute('x-value')
    data[prop] = event.target.value
  }
}

// 添加事件监听
document.addEventListener('keyup', updateData)
document.addEventListener('change', updateData)
```

#### 改进

可以利用发布订阅的设计模式思想，当访问器属性中的stter监听到数据变化时，就通过发布者将新的数据发布出去，而DOM作为订阅者，就可以直接作出相应的改变。

[js设计模式－发布订阅](//movii.github.io/blog/2016/06/25/JavaScript-%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B8%8E%E5%BC%80%E5%8F%91%E5%AE%9E%E8%B7%B5-%E7%AC%AC%E5%85%AB%E7%AB%A0-%E5%8F%91%E5%B8%83-%E8%AE%A2%E9%98%85%E6%A8%A1%E5%BC%8F-%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0/)

[文章](https://juejin.im/entry/5923973da22b9d005893805a)
[文章](https://zhuanlan.zhihu.com/p/25464162)

> 双向绑定是在同一个组件内，将数据和视图绑定起来，和父子组件之间的通信并无关联。  
  组件之间的通信使用单向数据流是为了组件之间更好地解藕。  
  在开发中可能有多个子组件依赖于父组件的某个数据，假如子组件可以修改父组件的数据的话，一个字组件的变化会引起所有依赖于这个数据的其它子组件发生变化，所以vue不推荐子组件修改父组件的数据，直接修改props会抛出警告。


### vue.js和其它框架的对比

#### vue VS angular

首先对我而言：

1. 在API和设计方面，vue比angular简单得多，因此学习成本低
2. vue更加灵活开放，你可以按照你希望的方式组织你的应用程序，而不会像angular那样，有时候必须遵循它自己定的一些规则。vue仅仅是作为一个视图层，它可以嵌入一个现有页面，而不一定是个庞大的单页应用。在配合其它库的使用方面，vue给了很大的空间，但相应的需要做更多的架构决策。比如：vuejs的核心默认不包含路由和ajax功能，并且通常假定你在应用中使用了一个模块构建系统。
3. Augular使用双向数据绑定，Vue也支持双向绑定，但默认是单向绑定，数据从父组件单向传递给子组件。在大型应用中单向绑定让数据流更容易理解。
4. 在vuejs中，指令和组件分得很清晰，指令只负责dom操作，而组件代表一个自给自足的独立单元————有自己的视图和数据逻辑。而在angular中这个概念就比较模糊。
5. vuejs有更好的性能，很容易优化，因为它不是用脏检查。vuejs使用基于依赖追踪的观察系统并且异步列队更新，所有的数据变化都是独立地触发，除非它们之间有明确的依赖关系。唯一需要做的优化是在 v-for 上使用 track-by。

#### vue VS react

react和vue确实有相似的地方，它们都提供数据驱动、可组合搭建的视图组件，它们也有不同的地方：

1. react的渲染建立在虚拟dom上（一种在内存中描述dom树状态的数据结构），当状态发生变化时，react重新渲染虚拟dom，比较计算之后给真实的dom打补丁。
2. 

技术好文：
[对比其它框架 - vue.js](https://juejin.im/entry/567ff13100b042c0920f336b)
[150行代码教你实现一个低配版的MVVM库（1）- 原理篇](https://segmentfault.com/a/1190000010744960?share_user=1030000009206936&utm_source=Weibo&utm_medium=shareLink&utm_campaign=socialShare)

