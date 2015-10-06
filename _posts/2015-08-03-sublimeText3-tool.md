---
layout: post
title:  "Mac下sublimeText3的安装配置及使用"
date:   2015-08-03 12:44:54
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

##Mac下sublimeText3常用的几个快捷键  

|| 快捷键 || 说明 ||  
|| CMD+CTRL+P || 获取已保存的项目 ||  
|| CMD + ALT + 左箭头 || 上个标签 ||  
|| CMD + ALT + 右箭头 || 下个标签 ||  
|| CMD+P || 搜索打开的问价 || 
|| CMD + D || 选择相同内容（一行接一行） ||  
|| CMD+CTRL+G || 选择相同内容（一次性选中全部） ||  
|| CMD+L || 按行选择 ||  
|| CMD + SHIFT + J || 选择全部子元素 ||  
|| CMD + R || 跳转到函数 ||  
|| CMD+SHIFT+D || 复制当前行 ||  
|| CMD+CTRL+↓ || 下移当前行 ||  
|| CMD+CTRL+↑ || 上移当前行 || 
|| CMD+K+B || 隐藏、显示侧边栏 ||  


