/* jshint asi:true */
//先等图片都加载完成
//再执行布局函数

/**
 * 执行主函数
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {

  /**
     * 内容JSON
     */
  var demoContent = [
    {
      img_link: 'https://ooo.0o0.ooo/2016/11/24/5836d81f48cd2.png',
      title: '超级超级好吃的菜',
      qrcode_img: 'http://os8ri8oj4.bkt.clouddn.com/qrcode_img.jpg'
    }
  ];

  contentInit(demoContent) //内容初始化
  waitImgsLoad() //等待图片加载，并执行布局初始化
}());

/**
 * 内容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {
  var htmlStr = ''
  for (var i = 0; i < content.length; i++) {
    htmlStr += '<div class="grid-item"><img class="qrcode-img" src="' + content[i].qrcode_img + '" width="180" height="180" style="display:none;"><div class="canvas-wrap"><strong class="blanding"></strong><canvas width="180" height="180" class="canvas"><img src="' + content[i].img_link + '" width="180" height="180" style="visibility: visible; opacity: 1;"></canvas></div><div class="title">' + content[i].title + '|<a href="javascript:void(0);" class="look-qrcode">查看教程</a></div></div>'
  }
  var grid = document.querySelector('.grid')
  grid.insertAdjacentHTML('afterbegin', htmlStr)
}


/**
 * 等待图片加载
 * @return {[type]} [description]
 */
function waitImgsLoad() {
  var imgs = document.querySelectorAll('.grid img')
  var totalImgs = imgs.length
  var count = 0
  //console.log(imgs)
  for (var i = 0; i < totalImgs; i++) {
    if (imgs[i].complete) {
      //console.log('complete');
      count++
    } else {
      imgs[i].onload = function() {
        // alert('onload')
        count++
        //console.log('onload' + count)
        if (count == totalImgs) {
          //console.log('onload---bbbbbbbb')
          initGrid()
        }
      }
    }
  }
  if (count == totalImgs) {
    //console.log('---bbbbbbbb')
    initGrid()
  }
}

/**
 * 初始化栅格布局
 * @return {[type]} [description]
 */
function initGrid() {
  var msnry = new Masonry('.grid', {
    // options
    itemSelector: '.grid-item',
    columnWidth: 250,
    isFitWidth: true,
    gutter: 20
  })
}

// canvas
var canvas = document.querySelectorAll('.canvas')
Array.prototype.forEach.call(canvas, function(i) {
  var canvas = i.getContext('2d');
  window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {};
  })();
  var img = new Image();
  img.src = i.querySelector('img').src;
  var imgW = i.height
  var radius = imgW / 2 + 10;
  var num = 8;
  var radian = 0;
  var center = {
    x: imgW / 2,
    y: imgW / 2
  };
  var points = [];
  var swingpoints = [];
  var rangeMin = 4;
  var rangeMax = 8;
  canvas.fillStyle = '#FF0000';
  for (var i = 0; i < num; i++) {
    radian = Math.PI * 2 / num * i;
    var ptX = center.x + radius * Math.cos(radian);
    var ptY = center.y + radius * Math.sin(radian);
    points.push({
      x: ptX,
      y: ptY
    });
    swingpoints.push({
      x: ptX,
      y: ptY,
      radian: radian,
      range: random(rangeMin, rangeMax),
      phase: (random(8, 16) - 8) * 0.01
    });
  }
  function swingCircle() {
    canvas.clearRect(0, 0, 400, 400);
    canvas.save();
    for (var i = 0; i < swingpoints.length; i++) {
      swingpoints[i].phase += random(1, 8) * -0.01;
      var r = radius + (swingpoints[i].range * Math.sin(swingpoints[i].phase)) - rangeMax;
      var ptX = center.x + r * Math.cos(swingpoints[i].radian);
      var ptY = center.y + r * Math.sin(swingpoints[i].radian);
      swingpoints[i] = {
        x: ptX,
        y: ptY,
        radian: swingpoints[i].radian,
        range: swingpoints[i].range,
        phase: swingpoints[i].phase
      };
    }
    drawCurve({
      pts: swingpoints,
      strokeStyle: "rgba(0, 0, 0, 0.05)"
    });
    canvas.clip();
    canvas.drawImage(img, center.x - img.width * 0.5, center.y - img.width * 0.5);
    canvas.restore();
    requestAnimationFrame(swingCircle);
  }
  function drawCurve(obj) {
    var pts = (obj.pts === undefined) ? {}: obj.pts;
    var strokeStyle = (obj.strokeStyle === undefined) ? "rgba(0, 0, 0, 0.6)": obj.strokeStyle;
    canvas.strokeStyle = strokeStyle;
    canvas.fillStyle = '#00FF00';
    canvas.beginPath();
    canvas.moveTo((pts[cycle(0 - 1, num)].x + pts[0].x) / 2, (pts[cycle(0 - 1, num)].y + pts[0].y) / 2);
    for (var i = 0; i < pts.length; i++) {
      canvas.quadraticCurveTo(pts[i].x, pts[i].y, (pts[i].x + pts[cycle(i + 1, num)].x) / 2, (pts[i].y + pts[cycle(i + 1, num)].y) / 2);
    }
  }
  function cycle(num1, num2) {
    return (num1 % num2 + num2) % num2;
  }
  function random(num1, num2) {
    var max = Math.max(num1, num2);
    var min = Math.min(num1, num2);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  requestAnimationFrame(swingCircle);
})

function closest(el, selector) {
  var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
  var element = el
  while (element && element.removeChild) {
    if (matchesSelector.call(element, selector)) {
      return element
    }
    element = element.parentElement
  }
  return null
}

// 查看二维码
var look = document.querySelectorAll('.look-qrcode')
Array.prototype.forEach.call(look, function(item) {
  item.addEventListener('click', function(e) {
    var target = e.target
    var canvas = target.parentNode.previousElementSibling
    var qrcode = canvas.previousElementSibling
    if (canvas.style.display === 'block') {
      canvas.style.display = 'none'
      qrcode.style.display = 'block'
    } else {
      canvas.style.display = 'block'
      qrcode.style.display = 'none'
    }
  })
})