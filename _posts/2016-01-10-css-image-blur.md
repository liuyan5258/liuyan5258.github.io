---
layout: post
title:  "css实现毛玻璃片效果"
date:   2016-01-10 19:29:54
categories: css
excerpt: css特效
---

* content
{:toc}  

效果图：  
![毛玻璃片效果](https://github.com/liuyan5258/liuyan5258.github.io/blob/master/static/images/yinshi.png?raw=true)  

代码：  

		<div class="demo demo-05">
		  <div class="demo-box">
		    <main>
		      <cite>来自一个异次元的二笔</cite>
		    </main>
		  </div>
		  <div class="demo-title">demo-05</div>
		</div> 
	  
		/*demo5 style*/
		.demo-05 .demo-box {
		  /*flexbox水平垂直居中*/
		  display: -webkit-flex;
		  display: flex;

		  background: url(http://img4.duitang.com/uploads/item/201312/24/20131224112821_LARU2.thumb.700_0.jpeg) 0 / cover fixed;
		  -webkit-align-items: center;
		  align-items: center;
		  -webkit-justify-content: center;
		  justify-content: center;
		}
		.demo-05 main {
		  overflow: hidden;
		  position: relative;
		  width: 200px;
		  height: 100px;
		  border-radius: 5px;
		  background: hsla(0,0%,100%,.3);
		}
		.demo-05 main::before {
		  content: '';
		  position: absolute;
		  top: 0;right: 0;bottom: 0;left: 0;
		  margin: -30px;
		  background: url(http://img4.duitang.com/uploads/item/201312/24/20131224112821_LARU2.thumb.700_0.jpeg) 0 / cover fixed;
		  -webkit-filter: blur(20px);
		  filter: blur(20px);
		}
		.demo-05 cite {
		  position: absolute;
		  width: 100%;
		  text-align: center;
		  line-height: 100px;
		}