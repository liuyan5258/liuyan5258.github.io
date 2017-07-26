---
layout: post
title: windows下如何安装jekyll
categories: Tool
tags: windows Tool jekyll
author: LY
---

* content
{:toc}  

### jekyll介绍

jekyll是一个静态站点生成器，有jekyll生成的站点，可以直接发布到github上，这样我们就有了一个属于自己的免费网站。

### 安装ruby

win7 64位系统下安装:

[下载ruby](http://rubyinstaller.org/downloads/)

安装完后设置环境变量：在用户变量path中加入C:\Ruby22\bin。

命令行输入`ruby -v`测试一下，看能不能输入版本号，能输出就安装配置成功了。   













### 安装rubyGems

```shell
gem update --system
```

### 下载认证文件

```shell
$ curl http://curl.haxx.se/ca/cacert.pem -o cacert.pem
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  245k  100  245k    0     0  26428      0  0:00:09  0:00:09 --:--:-- 23662


# 移动到Ruby安装目录
$ mv cacert.pem /c/Ruby22/bin/
```

设置环境变量：

  ruby 没有包含 SSL 证书，所以 https 的链接被服务器拒绝。

  解决方法很简单，首先在这里下载证书 http://curl.haxx.se/ca/cacert.pem, 

  然后再环境变量里设置 SSL_CERT_FILE 这个环境变量，并指向 cacert.pem 文件。

安装jekyll：

```shell
gem install jekyll
```

### 疑问

设置了环境变量之后还是报错

```shell
ERROR:  Could not find a valid gem 'jekyll' (>= 0), here is why:
          Unable to download data from https://ruby.taobao.org/ - SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (https://ruby.taobao.org/specs.4.8.gz)
```

原因：可能是修改了全局变量不一定在当前已经打开的 console 内立即生效

解决方法：建议退出 console 重新打开再试一次。

或者，可以打开 console，然后输入

```shell
set SSL_CERT_FILE=C:\\Ruby22\\cacert.pem
```

之后再安装jekyll就好了
