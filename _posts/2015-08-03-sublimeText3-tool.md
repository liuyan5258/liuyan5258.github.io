---
layout: post
title:  "Mac下sublimeText3的安装配置及使用"
date:   2015-09-24 15:44:54
categories: tools
excerpt: 前端工具的使用。
---

* content
{:toc}

##download sublimeText3 for mac  

url：[http://www.sublimetext.com/3](http://www.sublimetext.com/3)  

貌似现在官方还没有正式的sublimeText3出来，这里下的是体验版，但已经有很多人在用了，没有什么问题。  

##安装插件  

`通过sublimeText控制台命令安装package control`  

		import urllib.request,os; pf = 'PackageControl.sublime-package'; ipp = sublime.installed_packages_path();urllib.request.install_opener( urllib.request.build_opener(urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf),'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace('','%20')).read())  

试了n次，然而并没有什么软用，所以我还是妥妥滴`下载插件包放到preferences－》package文件夹下`  

推荐：[http://www.imjeff.cn/blog/146/](http://www.imjeff.cn/blog/146/)   

安装插件的过程中会因为pyv8无法加载而失败，下载[pyv8](http://uedethan.com/resolve-mac-sublime-text3-because-pyv8-unable-to-load-cause-emmet-unavailable-problems/)安装后重启sublimetext即可。  



