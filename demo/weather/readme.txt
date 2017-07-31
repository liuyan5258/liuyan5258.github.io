Yahoo天气插件（Yahoo Weather JS Parser）

作者：阮一峰
主页：http://www.ruanyifeng.com/blog/
版本：v0.1
日期：2007年6月9日

一、简述

利用Ajax技术，实时返回Yahoo! weather的天气信息。

二、特点

1）全球任意一个地点的天气信息，实时返回。每小时更新一次数据。

2）天气信息种类全，包括地点、经度、纬度、气温、气温、风向、风速、湿度、能见度、日出时间、日落时间、未来24小时天气预报等内容。并且，提供大、小两种格式的天气示意图。

3）采用缓存设计，最大限度地减轻服务器端压力。

三、安装条件

1) 服务器端必须支持php。

2）在打开缓存选项时（默认打开），文件所在的目录必须具有写权限。

四、安装步骤

1）解压文件压缩包，其中包含4个文件，分别为weather.js、weather.php、demo.html和readme.txt。

2) 将weather.js和weather.php上传至网页所在的目录，该目录必须具有写权限。

3）访问http://weather.yahoo.com，在地点搜索框中，输入所要查找的城市的英文名字。注意，该网站只支持英文搜索。地区码就是该城市的天气页的文件名。比如，上海的天气位于网页http://weather.yahoo.com/forecast/CHXX0116.html，则CHXX0116就是上海的地区码。

4）将地区码代入下面的代码，然后将这些代码插入你所要放置天气信息的网页。

<script type="text/javascript" src="weather.js"></script>
<div id="weather_info"></div>
<script type="text/javascript">
showWeatherInfo("你的地区码");
</script>

5) 打开浏览器，访问该网页。正常情况下，你就可以立刻看到实时返回的天气信息了。

五、常见问题

问：如何配置天气信息的显示模板？
答：打开weather.js文件，找到weatherTemplate函数，该函数的注释中有如何编辑模板的说明。

（完）




