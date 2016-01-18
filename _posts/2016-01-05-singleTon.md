---
layout: post
title:  "singleTon单例模式"
date:   2016-01-05 15:29:54
categories: javascript设计模式
excerpt: 设计模式
---

* content
{:toc}  

### singleTon单例
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Document</title>
    </head>
    <body>
      点击之前就已经创建好了dom：
      <button id="loginBtn">登录</button>
      点击之后创建dom（达到了惰性的目的）：
      <button id="loginBtn2">登录</button>
      通用的惰性单例：
      <button id="loginBtn3">登录</button>
    </body>
    <script>
      var createLoginLayer = (function(){
        var div = document.createElement('div');
        div.innerHTML = '我是登录弹框';
        div.style.display = 'none';
        document.body.appendChild(div);
        return div;
      })();
      document.getElementById('loginBtn').onclick = function(){
        createLoginLayer.style.display = 'block';
      };
    
      var lazyLoginLayer = (function(){
        var div;   //频繁地创建和删除dom明显是不合理的，我们可以创建一个变量来判断dom是否被创建过。
        return function(){
          if(!div){
            div = document.createElement('div');
            div.innerHTML = '我是登录弹框';
            div.style.display = 'none';
            document.body.appendChild(div);
          }
          return div;
        }
      })();
      document.getElementById('loginBtn2').onclick = function(){
        var loginLayer = lazyLoginLayer();
        loginLayer.style.display = 'block';
      };
    
      //如果页面中需要创建一个iframe来实现跨域，那是不是要如法炮制复制那一段代码。不需要，我们可以把不变的部分抽离出来，也就是封装啦。  
      var getSingle = function(fn){
        var result;
        return function(){
          return result || (result = fn.apply(this,arguments));
        }
      }
      var LoginLayer = function(){
        var div = document.createElement('div');
        div.innerHTML = '我是登录弹框';
        div.style.display = 'none';
        document.body.appendChild(div);
        return div;
      };
      var createSingleLoginLayer = getSingle(LoginLayer);
      document.getElementById('loginBtn3').onclick = function(){
        var loginLayer = createSingleLoginLayer();
        loginLayer.style.display = 'block';
      };
    </script>
    </html>


### call()和apply()函数的方法 
 
apply和call都是对某个方法的应用，  
区别在于apply有两个参数：apply(obj,args)，其中obj为方法应用的对象，args为参数数组；  
call有多个参数，call(obj,arg1,arg2,arg3......)，obj和apply的obj一样，而参数则是用逗号隔开，有多少个参数就传多少个。  
下面以apply为例，需要注意的是  
`apply的第二个参数必须为数组，否则会报错。
obj为null、undefined、bool值、0、this、window等的时候，相当于调用方法自身。`

    function test(arg) {
    console.log(arg);
    }
 
    /**
    分别调用test.apply(null,[1,2,3])，test.apply(undefined,[1,2,3])，test.apply(false,[1,2,3])，test.apply(true,[1,2,3])，
     
    test.apply(0，[1,2,3])，test.apply(this,[1,2,3]);
 
    输出结果都为1。
     
    ps:test函数只有一个参数，所以即使传入的数组参数多于一个，也只会取第一个，其它的被忽略。
    **/

    // obj为不存在的对象时，会报错
     
    test.apply(xxx,[1,2,3]);  //xxx is not defined
    
    // obj为函数时，如XXX.apply(obj,args)，意为调用XXX函数。
    // 其实就是将参数传给test1然后调用test1
    function test1(arg) {
    console.log("test1 " + arg);
    }
     
    function test2(arg1, arg2) {
    console.log(arg1 + " " + arg2);
    }
     
    test1.apply(test2,[1,2,3]);   //test1 1
