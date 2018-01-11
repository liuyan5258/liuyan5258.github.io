---
layout: post
title: 远程服务器使用mongodb3.4遇到的一些问题
categories: tools
tags: tools
author: LY
---

* content
{:toc}  

### 在Ubuntu环境下配置mongodb的服务 

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
```  











配置完之后，当我们执行  

```shell
sudo mongod 
```

启动失败，说`/data/db`不存在，没有就创建一个好了。  

```shell
sudo mkdir -p /data/db
```

然后再执行，就成功了。

```shell
sudo chown -R `id -u` /data/db
mongod --port 27017
```

### win7下配置mongodb的服务  

```shell
> "E:\job_tools\MongoDB\bin\mongod.exe" --logpath "E:\job_tools\MongoDB\log\mongod.log" --dbpath "E:\job_tools\MongoDB\data" --install --journal

[连接](https://laike9m.com/blog/ubuntu-yun-xing-mongodb-de-zheng-que-zi-shi,64/)

db、collections、tables
http://www.runoob.com/mongodb/mongodb-databases-documents-collections.html

db.createCollection("blog")
db.blog.insert({"name" : "liuyan"})

db.createUser({user:"liuyan", pwd:"liuyan1993%",roles:[{role:"dbAdmin",db:"movies"}]})

mongo -u liuyan -p liuyan1993% --authenticationDatabase movies --host 127.0.0.1

{ "_id" : ObjectId("58fcb193ba823d06b2c78ffe"), name: 'liuyan', password: 'liuyan1993%', "meta" : { "updateAt" : ISODate("2017-04-23T13:52:19.949Z"), "createAt" : ISODate("2017-04-23T13:52:19.949Z") }, "role" : 0, "__v" : 0 }

{username: 'liuyan', password: 'liuyan1993%'}

/usr/local/etc/mongod.conf
/etc/mongodb.conf

systemLog:
  destination: file
  path: /usr/local/var/log/mongodb/mongo.log
  logAppend: true
storage:
  dbPath: /usr/local/var/mongodb
  journal:
   enabled: true
net:
  port: 27017
  bindIp: 0.0.0.0
security:
  authorization: enabled
```   


mongod.conf 指定了 dbpath，但是实际上这个配置文件没有起作用！（启动时没指定配置文件）而 mongodb 本身认为 /data/db 才是默认路径。这是我搜到的解释。

1. mongodb config未生效

```shell

npm install cnpm -g --registry=https://registry.npm.taobao.org
    
➜  server lsof -i:27017
COMMAND     PID   USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
Robo\x203 27536 liuyan   18u  IPv4 0x2c0eef59ad303a31      0t0  TCP localhost:63016->localhost:27017 (CLOSED)
Robo\x203 27536 liuyan   19u  IPv4 0x2c0eef59adf12709      0t0  TCP localhost:63049->localhost:27017 (CLOSED)
Robo\x203 27536 liuyan   20u  IPv4 0x2c0eef59ade22e11      0t0  TCP localhost:59905->localhost:27017 (CLOSE_WAIT)
Robo\x203 27536 liuyan   21u  IPv4 0x2c0eef59adebe709      0t0  TCP localhost:59972->localhost:27017 (CLOSE_WAIT)
➜  server kill -9 27536

sudo node --inspect-brk run.js

sudo pm2 start run.js
```