$(function(){
  /**
   * [svg动画]
   * @param  {[type]} ){                     
   * var current_frame,           
   * total_frames,           
   * path,           
   * length,           
   * handle;           
   * path [description]
   * @return {[type]}     [description]
   */
  $(function(){
    /*定义相关Javascript*/
    var current_frame, //定义当前帧
          total_frames, //定义全部帧数
          path, //定义svg中的唯一path元素
          length, //定义path所生成的素描长度
          handle, //定义javascript动画句柄
          path = document.getElementsByTagName('path'),
          length = path[0].getTotalLength();
            
    //定义初始化方法
    var init = function(){
      current_frame = 0;
      total_frames = 160;
      path[0].style.strokeDasharray = length + ' ' + length; //定义dasharray
      path[0].style.strokeDashoffset = length; //定义dashoffset
      handle = 0;
    }
    //定义实际的动画绘制方法
    var draw = function(){
      var progress = current_frame/total_frames;
      if(progress>1){ //这里定义完成动画
        window.cancelAnimationFrame(handle);
      }else{//否则使用reqeuestAnimationFrame来生成动画
        current_frame++;
        path[0].style.strokeDashoffset = Math.floor(length*(1 - progress));
        
        handle = window.requestAnimationFrame(draw);
      }
    }
    init();
    draw();
  });
});