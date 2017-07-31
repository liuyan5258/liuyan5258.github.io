<?php

/********************************************************/
/* 文件名：weather.php                                  */
/* 功能：充当weather.js的服务器端，抓取Yahoo! Weather的 */
/* Feed。                                               */
/* 作者：阮一峰                                         */
/* 网址：http://www.ruanyifeng.com/blog/                */
/* 版本：v0.1                                           */
/* 日期：2007年6月9日                                   */
/********************************************************/

// 如果需要关闭缓存功能，请将下面的$cached设为false。注意,使用此功能时，文件所在的目录必须具有写权限。

$cached=true;

// 设置缓存时间，单位为分钟，默认为60分钟。注意，此值低于60，没有意义。

$cached_time=60;

/********************************************************/
/* 以下部分一般不用改动。                               */
/********************************************************/

// 获取地点编码，默认地点为中国上海。

$city_code=$_GET[city];

if ($city_code=="") $city_code="CHXX0116";

// 设置Yahoo！Weather的Feed网址。

$yahoo_url="http://weather.yahooapis.com/forecastrss?p=".$city_code."&u=c";

$file_name = "weather.xml";

// 判断是否启用了缓存功能。



if ($cached)
{
	$file = cached_handle($file_name,$yahoo_url);
} else {
	$file = weather_url_read($yahoo_url);
}

function cached_handle($file_name,$url)
{
	if ((file_exists($file_name)) and ((time()-filemtime($file_name))<($cached_time*60*60))) 
	{
		$file=file_get_contents($file_name);
		return $file;
	}
		$file=weather_url_read($url);
		file_write($file,$file_name);
		return $file;
}



// 输出文件内容。

header("Content-Type: text/xml; charset=utf-8");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
echo $file;


// 函数：weather_url_read
// 功能：读取远程文件。
// 参数：$yahoo_url,类型为字符串，内容为网址。
// 返回值：字符串。

function weather_url_read($yahoo_url) 
{
		
	// 判断allow_url_allow选项是否打开，如果打开，使用fget()，否则使用curl函数。

	if(ini_get('allow_url_fopen') != 1)
	{
		/*
		// get contents of a file into a string
		$handle = fopen($filename, "r");
		$contents = fread($handle, filesize ($filename));
		fclose($handle);
		*/
$ch = curl_init();
$timeout = 5; // set to zero for no timeout
curl_setopt ($ch, CURLOPT_URL, $yahoo_url);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
$file = curl_exec($ch);
curl_close($ch);

	} else {
		$file=file_get_contents($yahoo_url); 
	}
	return $file;
}

// 函数：file_write
// 功能：写文件。
// 参数：$file,类型为字符串。
// 参数：$filename,类型为字符串。
// 返回值：无。

function file_write($file,$filename) {
	 if (is_file($filename))
   {
   	unlink($filename);
   }
   if (!$handle = fopen($filename, 'a')) {
         print "不能打开文件 $filename";
         exit;
   }
   // 将$somecontent写入到我们打开的文件中。
   if (!fwrite($handle, $file)) {   	
       print "不能写入到文件 $filename";
       exit;
   }
}

?>