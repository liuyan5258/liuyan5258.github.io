
/********************************************************/
/* 文件名：weather.js                                   */
/* 功能：提供全球任意一个地点的实时天气信息，数据来源为 */
/* Yahoo! Weather。此js文件为客户端文件，需与服务器端的 */
/* weather.php配合使用。                                */
/* 作者：阮一峰                                         */
/* 网址：http://www.ruanyifeng.com/blog/                */
/* 版本：v0.1                                           */
/* 日期：2007年6月9日                                   */
/********************************************************/

//定义XMLHttpRequest对象实例
var http_request = false;
var weatherInfo = {};

// 函数：showWeatherInfo
// 功能：显示天气信息。
function showWeatherInfo(siteCode)
{
	var cityCode=siteCode;

	if (cityCode=="") cityCode="CHXX0116";
	
	var php_url="weather.php?city="+cityCode;
	
	send_request("GET",php_url,null,"XML",weatherCallback);
}


// 函数名：weatherCallBack
// 功能：解析天气信息。
function weatherCallback()
{
	if(http_request.readyState == 4){
		if(http_request.status == 200){
			var doc = http_request.responseXML;
			if (!doc.documentElement && http_request.responseStream) {
					doc.load(http_request.responseStream);
					}
			parseWeatherInfo(doc);
			document.getElementById("weather_info").innerHTML = weatherTemplate();
		}
	}
}

// 函数名：weatherTemplate
// 功能：显示天气信息的模范。
// 说明：在不需要的行的最前面，加上//就可能屏蔽掉该行。如果了解HTML语法，可以直接编辑HTMLCode。

function weatherTemplate()
{
	var HTMLCode;
	
	HTMLCode = '<h3>实时天气信息</h3>';
    HTMLCode += '<p>小图</p>';
	HTMLCode += '<p><img src="'+weatherInfo["img_small_url"]+'"/></p>';
	HTMLCode += '<p>大图</p>';
	HTMLCode += '<p><img src="'+weatherInfo["img_big_url"]+'"/></p>';
	HTMLCode += '<p>地点：'+weatherInfo["city"]+'（经度'+weatherInfo["long"]+'，纬度'+weatherInfo["lat"]+'）</p>';
	HTMLCode += '<p>天气：'+weatherInfo["condition_cn"]+'</p>';
	HTMLCode += '<p>时间：'+weatherInfo["year"]+'年'+weatherInfo["month_cn"]+weatherInfo["day"]+'日，'+weatherInfo["time"]+weatherInfo["time_suffix"]+'</p>';	
	HTMLCode += '<p>气温：'+weatherInfo["temp"] +'度</p>';
	HTMLCode += '<p>风向：'+weatherInfo["wind_direction"]+'度角</p>';
	HTMLCode += '<p>风速：'+weatherInfo["wind_speed"]+'公里/小时</p>';
	HTMLCode += '<p>湿度：'+weatherInfo["humidity"]+'%</p>';
	HTMLCode += '<p>能见度：'+parseInt(weatherInfo["visibility"])/100+'公里</p>';
    HTMLCode += '<p>日出时间：'+weatherInfo["sunrise"]+'</p>';	
    HTMLCode += '<p>日落时间：'+weatherInfo["sunset"]+'</p>';
    HTMLCode += '<p>未来24小时：'+weatherInfo["forecast_24h_text_cn"]+'，最高'+weatherInfo["forecast_24h_high"]+'度，最低'+weatherInfo["forecast_24h_low"]+'度</p>';
			
	return HTMLCode;
}

function parseWeatherInfo(doc)
{
  weatherInfo["lastBuildDate"] = doc.getElementsByTagName("lastBuildDate")[0].firstChild.nodeValue;
	var weatherTimeInfo = weatherInfo["lastBuildDate"].split(' ');
	weatherInfo["week"] = weatherTimeInfo[0];
	weatherInfo["day"] = weatherTimeInfo[1];
	weatherInfo["month"] = weatherTimeInfo[2];
	weatherInfo["month_cn"] = monthSwitch(weatherInfo["month"]);
	weatherInfo["year"] = weatherTimeInfo[3];
	weatherInfo["time"] = weatherTimeInfo[4];
	weatherInfo["time_suffix"] = weatherTimeInfo[5]; 
	weatherInfo["NS_yweather"] = "http://xml.weather.yahoo.com/ns/rss/1.0";
	weatherInfo["NS_geo"] = "http://www.w3.org/2003/01/geo/wgs84_pos#";
	weatherInfo["city"]=getTagValue(doc,'yweather','location',0,'city',weatherInfo["NS_yweather"]);
	weatherInfo["country"] =  getTagValue(doc,'yweather','location',0,'country',weatherInfo["NS_yweather"]);
	weatherInfo["lat"] =  getTagValue(doc,'geo','lat',0,'',weatherInfo["NS_geo"]);
	weatherInfo["long"] =  getTagValue(doc,'geo','long',0,'',weatherInfo["NS_geo"]);
	weatherInfo["temp"] =  getTagValue(doc,'yweather','wind',0,'chill',weatherInfo["NS_yweather"]);
	weatherInfo["wind_direction"] =  getTagValue(doc,'yweather','wind',0,'direction',weatherInfo["NS_yweather"]);
	weatherInfo["wind_speed"] =  getTagValue(doc,'yweather','wind',0,'speed',weatherInfo["NS_yweather"]);
	weatherInfo["humidity"] =  getTagValue(doc,'yweather','atmosphere',0,'humidity',weatherInfo["NS_yweather"]);
	weatherInfo["visibility"] =  getTagValue(doc,'yweather','atmosphere',0,'visibility',weatherInfo["NS_yweather"]);
	weatherInfo["sunrise"] =  getTagValue(doc,'yweather','astronomy',0,'sunrise',weatherInfo["NS_yweather"]);
	weatherInfo["sunset"] =  getTagValue(doc,'yweather','astronomy',0,'sunset',weatherInfo["NS_yweather"]);
	weatherInfo["condition_code"] =  getTagValue(doc,'yweather','condition',0,'code',weatherInfo["NS_yweather"]);
	weatherInfo["condition_en"] =  getTagValue(doc,'yweather','condition',0,'text',weatherInfo["NS_yweather"]);
	weatherInfo["condition_cn"] = weatherCondition(weatherInfo["condition_code"]);
	weatherInfo["forecast_12h_low"] = getTagValue(doc,'yweather','forecast',0,'low',weatherInfo["NS_yweather"]);
	weatherInfo["forecast_12h_high"] = getTagValue(doc,'yweather','forecast',0,'high',weatherInfo["NS_yweather"]);
	weatherInfo["forecast_12h_code"] = getTagValue(doc,'yweather','forecast',0,'code',weatherInfo["NS_yweather"]);
	weatherInfo["forecast_12h_text"] = getTagValue(doc,'yweather','forecast',0,'text',weatherInfo["NS_yweather"]);
	weatherInfo["forecast_12h_text_cn"] = weatherCondition(weatherInfo["forecast_12h_code"]);
	weatherInfo["forecast_24h_low"] = getTagValue(doc,'yweather','forecast',1,'low',weatherInfo["NS_yweather"]);
	weatherInfo["forecast_24h_high"] = getTagValue(doc,'yweather','forecast',1,'high',weatherInfo["NS_yweather"]);
	weatherInfo["forecast_24h_code"] = getTagValue(doc,'yweather','forecast',1,'code',weatherInfo["NS_yweather"]);
	weatherInfo["forecast_24h_text"] = getTagValue(doc,'yweather','forecast',1,'text',weatherInfo["NS_yweather"]);
	weatherInfo["forecast_24h_text_cn"] = weatherCondition(weatherInfo["forecast_24h_code"]);
	weatherInfo["day_or_night"] = dayOrNight();
	weatherInfo["img_big_url"] = 'http://us.i1.yimg.com/us.yimg.com/i/us/nws/weather/gr/'+weatherInfo["condition_code"]+weatherInfo["day_or_night"]+'.png';
	weatherInfo["img_small_url"] = 'http://l.yimg.com/us.yimg.com/i/us/we/52/'+weatherInfo["condition_code"]+'.gif';
}

function dayOrNight()
{
	if (weatherInfo["time_suffix"]=='pm' && parseInt(weatherInfo["time"])==12) return 'd';
	if ((weatherInfo["time_suffix"]=='pm' && parseInt(weatherInfo["time"])>6) || (weatherInfo["time_suffix"]=='am' && parseInt(weatherInfo["time"])<6) || (weatherInfo["time_suffix"]=='am' && parseInt(weatherInfo["time"])==12))
	{
		return 'n';
	} else {
		return 'd';
	}
}

function monthSwitch(month)
{
	var monthCN;
	switch(month)
	{
		case 'Jan':
		monthCN = '1月';
		break;
		case 'Feb':
		monthCN = '2月';
		break;
		case 'Mar':
		monthCN = '3月';
		break;
		case 'Apr':
		monthCN = '4月';
		break;
		case 'May':
		monthCN = '5月';
		break;
		case 'Jun':
		monthCN = '6月';
		break;
		case 'Jul':
		monthCN = '7月';
		break;
		case 'Aug':
		monthCN = '8月';
		break;
		case 'Sep':
		monthCN = '9月';
		break;
		case 'Oct':
		monthCN = '10月';
		break;
		case 'Nov':
		monthCN = '11月';
		break;
		case 'Dec':
		monthCN = '12月';
		break;
	}
	return monthCN;
}


function weatherCondition(code)
{
	var condition;
	
	switch(code) {
		case '0' :
		 condition = '龙卷风';
		 break;
		case '1' :
		 condition = '热带风暴';
		 break;		 
		case '2' :
		 condition = '飓风';
		 break;		
		case '3' :
		 condition = '雷暴雨';
		 break;	
	  case '4' :
		 condition = '雷雨';
		 break;	
	  case '5' :
		 condition = '雨夹雪';
		 break;	
	  case '6' :
		 condition = '雨夹冰雹';
		 break;	
	  case '7' :
		 condition = '雪夹冰雹';
		 break;	
		case '8' :
		 condition = '冻毛毛雨';
		 break;	
		case '9' :
		 condition = '毛毛雨';
		 break;	
		case '10' :
		 condition = '冻雨';
		 break;	
		case '11' :
		 condition = '阵雨';
		 break;	
		case '12' :
		 condition = '阵雨';
		 break;
		case '13' :
		 condition = '雪阵';
		 break;
		case '14' :
		 condition = '小阵雪';
		 break;
		case '15' :
		 condition = '高吹雪';
		 break;
		case '16' :
		 condition = '雪';
		 break;
		case '17' :
		 condition = '冰雹';
		 break;		 
		case '18' :
		 condition = '雨夹雪';
		 break;
		case '19' :
		 condition = '风沙';
		 break;
		case '20' :
		 condition = '雾';
		 break;
		case '21' :
		 condition = '薄雾';
		 break;
		case '22' :
		 condition = '烟雾';
		 break;		 
		case '23' :
		 condition = '大风';
		 break;
		case '24' :
		 condition = '有风';
		 break;
		case '25' :
		 condition = '冷';
		 break;
		case '26' :
		 condition = '多云';
		 break;
		case '27' :
		 condition = '夜间，阴';
		 break;
		case '28' :
		 condition = '白天，阴';
		 break;
		case '29' :
		 condition = '夜间，多云';
		 break;
		case '30' :
		 condition = '白天，多云';
		 break;
		case '31' :
		 condition = '夜间，晴';
		 break;
		case '32' :
		 condition = '阳光晴好';
		 break;
		case '33' :
		 condition = '夜间，晴朗';
		 break;
		case '34' :
		 condition = '白天，晴朗';
		 break;
		case '35' :
		 condition = '雨夹冰雹';
		 break;
		case '36' :
		 condition = '晴热';
		 break;
		case '37' :
		 condition = '局部雷阵雨';
		 break;
		case '38' :
		 condition = '局部雷阵雨';
		 break;
		case '39' :
		 condition = '局部雷阵雨';
		 break;
		case '40' :
		 condition = '局部阵雨';
		 break;
		case '41' :
		 condition = '大雪';
		 break;		 
		case '42' :
		 condition = '局部阵雨雪';
		 break;	
		case '43' :
		 condition = '大雪';
		 break;	
		case '44' :
		 condition = '局部阴';
		 break;	
		case '45' :
		 condition = '雷阵雨';
		 break;	
		case '46' :
		 condition = '阵雨雪';
		 break;
		case '47' :
		 condition = '局部雷阵雨';
		 break;			 
		case '3200' :
		 condition = '暂无数据';
		 break;	
		}
		
		return condition;
}

// 函数名：getTagValue
// 功能：获得标签的值
// 参数：doc,文档或节点对象
// 参数：NS,名称空间，如果没有名称空间，此项为空。
// 参数: localTag,本地标签名。
// 参数：TagNum,整数，表明第几个标签。
// 参数：attr,属性的名字，如果取标签下面的文本节点的值，则此处为空。
// 参数：NSuri，名称空间的URI。
// 返回值：字符串。

function getTagValue(doc,NS,localTag,TagNum,attr,NSuri)
{
	var docElement ='';
	var docElementValue = '';
	if (NS != '') 
	{
		if (doc.getElementsByTagNameNS)
		{
			docElement = doc.getElementsByTagNameNS(NSuri,localTag)[TagNum];
		} else {
			docElement = doc.getElementsByTagName(NS+':'+localTag)[TagNum];
		}
	} else {
		docElement = doc.getElementsByTagName(localTag)[TagNum];
	}	
	
	if (attr!='')
	{
		docElementValue = docElement.getAttribute(attr);
	} else {
		docElementValue = docElement.firstChild.nodeValue;
	}
	
	return docElementValue;
}


//定义可复用的http请求发送函数
function send_request(method,url,content,responseType,callback) {//初始化、指定处理函数、发送请求的函数
	 http_request = false;
	//开始初始化XMLHttpRequest对象
	if(window.XMLHttpRequest) { //Mozilla 浏览器
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {//设置MiME类别
			http_request.overrideMimeType("text/xml");
		}
	}
	else if (window.ActiveXObject) { // IE浏览器
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	if (!http_request) { // 异常，创建对象实例失败
		window.alert("不能创建XMLHttpRequest对象实例.");
		return false;
	}
	if(responseType.toLowerCase()=="text") {
		//http_request.onreadystatechange = processTextResponse;
		http_request.onreadystatechange = callback;
	}
	else if(responseType.toLowerCase()=="xml") {
		//http_request.onreadystatechange = processXMLResponse;
		http_request.onreadystatechange = callback;
	}
	else {
		window.alert("响应类别参数错误。");
		return false;
	}
	// 确定发送请求的方式和URL以及是否异步执行下段代码
	if(method.toLowerCase()=="get") {
		http_request.open(method, url, true);
	}
	else if(method.toLowerCase()=="post") {
		http_request.open(method, url, true);
		http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	}
	else {
		window.alert("http请求类别参数错误。");
		return false;
	}
	http_request.send(content);
}
// 处理返回文本格式信息的函数
function processTextResponse() {
	if (http_request.readyState == 4) { // 判断对象状态
		if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
			//alert(http_request.responseText);
			alert("Text文档响应。");
		} else { //页面不正常
			alert("您所请求的页面有异常。");
		}
	}
}
//处理返回的XML格式文档的函数
function processXMLResponse() {
	if (http_request.readyState == 4) { // 判断对象状态
		if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
			//alert(http_request.responseXML);
			alert("XML文档响应。");
		} else { //页面不正常
			alert("您所请求的页面有异常。");
		}
	}
}

	
