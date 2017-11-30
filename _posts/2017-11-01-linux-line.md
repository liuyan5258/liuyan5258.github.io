---
layout: post
title: 远程服务器使用mongodb3.4遇到的一些问题
categories: tools
tags: tools
author: LY
---

* content
{:toc}  










### Ubuntu下运行mongodb3.4  

远程服务器的环境是Ubuntu的，要在生产环境下运行mongodb。

首先，按照官方文档安装mongodb，安装完之后来配置。  

> sudo vi /etc/mongod.conf

```shell
# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1
security:
  authorization: enabled

配置完之后，当我们执行  

```shell
sudo mongod 
```

启动失败，说`/data/db`不存在，没有就创建一个好了。  

```shell
sudo mkdir -p /data/db
```

然后再执行，就成功了。

### win7下配置mongodb的服务
```

> "E:\job_tools\MongoDB\bin\mongod.exe" --logpath "E:\job_tools\MongoDB\log\mongod.log" --dbpath "E:\job_tools\MongoDB\data" --install --journal

[连接](https://laike9m.com/blog/ubuntu-yun-xing-mongodb-de-zheng-que-zi-shi,64/)




