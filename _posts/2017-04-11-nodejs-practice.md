---
layout: post
title: nodejs实战笔记｜初识nodejs
categories: Nodejs实战
tags: Nodejs Javascript
author: LY
---

* content
{:toc}  

### 为什么要使用nodejs

1. nodejs基于javascript语言，不用重新学一门语言，从而减轻了学习成本。
2. javascript在前端的重要性，使用nodejs统一前后台语言，不仅可以实现程序员的全栈开发，还可以统一公共类库，使代码标准化。
3. nodejs并没有重新开发运行时的环境，而是选择了目前最快的浏览器内核v8作为引擎，保证了nodejs的性能和稳定性。
4. v8为javascript提供了在非浏览器端的运行环境，这也是nodejs之所以高效的原因之一。
5. nodejs单线程机制，使得开发高效，代码简单。
6. Nodejs的另一个特点异步编程，让Nodejs处理IO密集型应用有了明显的优势。
7. nodejs的社区壮大，不仅包的数量在增加，包的质量也比其它语言的好，我最常用到的工具包，如socket.io, moment.js, underscore.js, async.js, express.js, bower.js, grunt.js, forever.js…，确实在改变我以前的编程习惯。
8. 

### nodejs的单线程机制

nodejs使用了一个事件驱动，非阻塞I/O模式，使其轻量又高效。

