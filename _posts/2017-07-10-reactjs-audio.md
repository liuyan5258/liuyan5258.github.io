---
layout: post
title: reactjs 获取真实的dom节点
categories: Reactjs
tags: Reactjs Javascript
author: LY
---

* content
{:toc}

用reactjs 如何获取真实的dom节点。

reactjs的设计，是采用DOM Diff的算法，所有的dom改变，都现在虚拟dom上发生，然后再将实际发生变动的部分，反映在真实的dom上。

但是有时候需要从组件获取真实的dom怎么办？

比如我之前写的那个例子，[自定制一个简易的audio音频播放器](http://liuyan5258.github.io/2017/07/06/html5-audio/)。

我需要在点击ui组件的时候获取audio的播放和停止事件。我们并不能像javascript那样直接从document上去寻找，这个时候就需要用到ref属性了。







### 代码
```js
import React from 'react'

export default class Audio extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      isPaused: true
    }
  }

  handleClick() {
    const audio = this.audio
    if (this.state.isPaused) {
      audio.play()
      audio.addEventListener('ended', () => {
        this.setState({
          isPaused: true
        })
      })
    } else {
      audio.pause()
    }
    this.setState({
      isPaused: !this.state.isPaused
    })
  }
  
  render() {
    return (
      <div>
        <div className="audio-wrap" onClick={this.handleClick}>
          <div className={'audio-animate ' + (this.state.isPaused ? '' : 'play')}></div>
          <div className="audio-length"><span className="audio-len">{this.props.length}"</span></div>
          <audio preload="auto" hidden="true" id="audio" src={this.props.href} ref={(ref) => { this.audio = ref }} />
        </div>
      </div>
    )
  }
}
Audio.contextTypes = {
  utils: React.PropTypes.object
}
```

### 分析

上面代码，组件Audio中有一个子节点（audio-wrap），它用来自定义audio的ui，点击这个ui的时候需要触发真实audio的播放和停止事件。为了做到这一点，audio上必须有ref这个属性，
然后this.refs[refName]就会返回这个真实的dom节点，但是这种方法已经废弃了。 新的方法是通过在引用回调中设置对象的属性来引用组件。`ref={(ref) => { this.audio = ref }}`。
直接通过this.audio来获取真实的audio。