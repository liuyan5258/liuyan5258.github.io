---
layout: post
title: 全栈开发之服务器登录和配置
categories: Nodejs实战 服务器
tags: Nodejs
author: LY
---

* content
{:toc}  

在阿里云服务器上购买主机，选择适合自己的套餐，配置服务器时建议选择Ubuntu14.04.4系统。当然你也可以用公司的测试服务器，然后自己买个域名，绑定到公司服务器的ip地址。如果你只是想玩玩，也可以不用买域名。  

### 远程登录服务器  

购买完主机，首先我们就有了一个服务器的ip地址。登录远程服务器，我们还需要一个用户名，每个云服务商默认的用户名可能不一样，阿里云默认的用户名是root，默认端口是22.  

```shell
ssh root@10.173.32.13
```      

* 然后会提示你输入密码，这里需要输入的密码是你前面购买阿里云服务器时在网页上所填写的后台的登录密码，填的时候要用记得在某个地方纪录下来，这个忘记了就很麻烦了。也可以通过私钥认证的方式进行无密码登录。这个后面会说到。  

如果你在购买服务器的时候，多买了一个数据盘，那这个数据盘就需要额外来挂载，如果你没有购买的话，当然是不需要挂载的，因为默认的阿里云就已经给你挂载了一个硬盘，应该是20G的，这个硬盘是用来安装操作系统的。如果你把网站应用都跑在这个系统盘上也不是不可以，但是一旦重装系统之后，所有的网站数据，比如用户资料都会丢失。如果你把网站应用挂在了数据盘的话，就能提高一个安全性，即使你重装了系统，数据盘的文件还在那儿。  












那么怎么查看呢？  

```shell
fdisk -l
```  

```shell
command + r 或 command + l # 清屏
pwd # 查看根目录
df -h # 查看硬盘的使用情况
ctrl + D # 退出命令行环境
```  

```shell
➜  ~ ssh 10.173.32.13
Welcome to Ubuntu 14.04.4 LTS (GNU/Linux 4.2.0-27-generic x86_64)

 * Documentation:  https://help.ubuntu.com/
New release '16.04.3 LTS' available.
Run 'do-release-upgrade' to upgrade to it.

Last login: Mon Dec 18 10:51:39 2017 from 10.173.16.2
liuyan@f2e:~$ fdisk -l
liuyan@f2e:~$ df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            986M   12K  986M   1% /dev
tmpfs           200M  728K  199M   1% /run
/dev/vda1        20G  3.6G   16G  19% /
none            4.0K     0  4.0K   0% /sys/fs/cgroup
none            5.0M     0  5.0M   0% /run/lock
none            997M     0  997M   0% /run/shm
none            100M     0  100M   0% /run/user
```  

上面是我登录我的云服务器的信息，因为我是通过了私钥认证的，所以不需要用户密码登录。从上面可以看出，我的Ubuntu系统是14.04.4，建议在配置服务器时选择Ubuntu的14.04版本。然后我是没有数据盘的。系统硬盘是20G的。  

### 配置root及应用账号权限  

添加用户名：  

```shell
adduser liuyan
```

创建了一个用户之后，我们需要对它进行授权，升级为超级权限  

将用户添加进sudo group  

```shell
gpasswd -a liuyan sudo
```

编辑权限配置文件  

```shell
sudo visudo
```

加入你的用户权限：  

```shell
# User privilege specification
root    ALL=(ALL:ALL) ALL
liuyan  ALL=(ALL:ALL) ALL
```

`ctrl + X -> shift + Y`保存并退出  

现在我们就可以使用用户密码登录了  

```shell
ssh liuyan@10.173.32.13
```

### 配置本地无密码ssh登录  

![原理](http://os8ri8oj4.bkt.clouddn.com/QQ20180111-0@2x.png)  

如果你之前用过git仓库的话，那你本地应该是配了公钥和私钥的，就不需要再重新配置一遍了。  

查看你本地是否配置了公钥和私钥：  

```shell
ls -a # 查看当前目录下所有文件
cd .ssh 
ls # 只要有id_rsa就代表你配置过了
```

如果你没有配置的话，就继续下面操作：  

```shell
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```  

他会提示你一些生成路径和密码的信息，不要输入，直接回车就可以了。  

再次查看目录，会发现多了这几个文件。就代表你已经配置好了公钥和私钥。  

```shell
➜  .ssh ls
id_rsa           known_hosts
id_rsa.pub      
```  

我们可以打印下看看公钥的内容：  

```shell
➜  .ssh cat id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDbYOMamMUDKhClAiEhDT6wknP65cpEHt3sStItIuhOFwPc1aYxb8fTmdH+JBnfObbnEXxndt0MR/rvmRqZ4iMkL29IaT/JZauvHOTrwX/nEphTiB6MzzUG1J/Qj/WLNn/3Jp7T9eBGxLS54F/39EKtbpojfYxlHAW9VRw7g9Ssi46x/Fyi6UWFUSDpg+VoN+pND9MQbsiM2hi/hVIa2Wy9YppASIEOlL+5hj3be1/zGnpWxwmIrUuncqEcrEWvE2B7xur6Rz7QKT12EmjQZeGmESGn7ozNK7GG5X0tfX60wIr18kHKOnvg8EMoN7zVNff9VKWx5QYidsIUPw/WwOZ5 name@BIH-D-4202
```  

我们配置了公钥私钥和，接下来我们把ssh代理开起来：  

```shell
➜  .ssh eval "$(ssh-agent -s)"
```  

把ssh Key加入到代理中：  

```shell
➜  .ssh ssh-add ~/.ssh/id_rsa 
```

[可以对照这个步骤](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)  

登录到远程服务器进行授权：  

```shell
ssh liuyan@10.173.32.13
liuyan@f2e:~$ cd .ssh
liuyan@f2e:~/.ssh$ ls
id_rsa  id_rsa.pub
liuyan@f2e:~/.ssh$ 
```  

接下来我们需要在.ssh下创建一个授权文件:  

```shell
liuyan@f2e:~/.ssh$ vi authorized_keys
```

进入编辑模式，把之前复制的那段公钥拷贝到authorized_keys文件中保存并退出。  

```shell
liuyan@f2e:~/.ssh$ chmod 600 authorized_keys # 授权文件
liuyan@f2e:~/.ssh$ sudo service ssh restart # 重启ssh服务
```

这个时候服务器上已经持有了我这台电脑上的公钥。你可以不输入密码直接登录远程服务器了。

### 搭建服务器的nodejs环境  

```shell
sudo apt-get update  # 更新系统环境
```

安装依赖包  

```shell
sudo apt-get install vim openssl build-essential libssl-dev wget curl git
```

安装nvm管理node模块  

在github中找到[nvm](https://github.com/creationix/nvm)的项目  

```shell
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

查看nodejs最新的LTS版本是8.9.3  

```shell
nvm install v8.9.3  # 安装
nvm use v8.9.3  # 使用
nvm alias default v8.9.3  # 设置默认版本
```

为了安装某些包的时候快些，统一设置淘宝镜像源  

```shell
npm --registry=https://registry.npm.taobao.org install -g npm
npm --registry=https://registry.npm.taobao.org install -g cnpm
```

新增文件结构树：  

```shell
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```  

安装一些我们常用的包：  

```shell
npm i pm2 webpack gulp -g
```

新建一个app.js来验证一下  

```shell
vi app.js
```

`i`进入编辑模式  
```shell
const http = require('http')
http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('hello world!')
}).listen(8081)
console.log('server running on http://10.173.32.13:8081')
```  

### 借助pm2让nodejs服务常驻  

我们都知道，在终端里面启动node服务，它的生命周期仅限于终端的当前的会话周期，如果说终端关掉了，或者在终端里面退出的，node服务也就终止了。  

我们想让服务做到在后台运行，也可以在出现异常的时候自动重启。这个时候就可以用pm2（nodejs部署和进程管理工具）了。  

之前创建了一个app.js， 我们用pm2来启动  

```shell
pm2 start app.js
pm2 list # 查看当前的所有运行的nodejs服务
pm2 show [name] # 查看更详细的
pm2 log # 查看日志
```  

### 配置Nginx反向代理nodejs服务端口  

当前用户下的nodejs是不具备root的运行权限的，所以不能监听0-1024之间的任何一个端口，强制通过sudo的话，来启动node服务也不是不可以，一个是我们需要额外地去配置，一个是我们需要放大node程序的一些权限。  

我想直接通过ip来访问的话，就需要用到Nginx了，用root级别的权限来启动对80端口的监听。同时把来自80端口的流量分配给node服务的另外一个端口，来实现服务的代理。  

如果服务器只需要放一个网站程序的话，就只需要解析网站的服务器到一个网址。网站程序监听80端口就可以了。  

如果是服务器有很多个应用，借助Nginx的话，不仅可以实现一个代理，还可以实现负载均衡，让它来判断是来自哪个域名或者是哪个ip的一个访问。  

下面来安装Nginx，一般，刚刚购买的服务器，可能会预安装Apache，如果没有特别的需要，可以把它删掉。  

```shell
sudo apt-get remove apache2
sudo apt-get install nginx
cd /etc/nginx
cd conf.d
``` 

创建一个Nginx的配置文件  

```shell
sudo vi blog-com-8081.conf
```

编辑nginx配置文件  

```shell
upstream blog{
  server 127.0.0.1:8081;
}
server {
  listen 80;
  server_name 10.173.32.13;
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_pass http://blog;
    proxy_redirect off;
  }
}
```

在nginx目录下查看nginx.conf，去掉下面这条的注释  

```shell
include /etc/nginx/conf.d/*.conf;
```  

监测一下nginx是否配置成功  
```shell
sudo nginx -t
```

重启一下nginx
```shell
sudo nginx -s reload
```  

这个时候我们通过`10.173.32.13`就能直接访问到我们之前在app.js向客户端展示的内容  

























