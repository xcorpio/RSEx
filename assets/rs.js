$(document).ready(function(){
  chrome.extension.sendMessage({type:'rs'}, function(response){
    if(response.isShow === false) return;
    
    //全局audio
    audio = document.createElement("AUDIO");
    audio.setAttribute('name','rs-audio');
    audio.onended = function(){//播放结束
      //播放图标停止
      var as = $("ignore_js_op > img[src='static/image/filetype/av.gif']");
      for(i=0;i<as.length;++i){
        as[i].className = as[i].className.replace(/ audio-play/g,'');
      }
      //重载，否则播放同一首失败
      audio.load();
    };

    //音乐附件图标
    var as = $("ignore_js_op > img[src='static/image/filetype/av.gif']");
    for(i=0;i<as.length;++i){
      as[i].onclick = onImgPlayClick;
      var p = as[i].parentNode;
      var d = p.querySelector("a[href^='forum.php?mod=attachment&aid=']");
      as[i].setAttribute('data-mp3',d.href);
      as[i].className += ' audio-img';
    }
    
    //楼主MP3
    bgMp3();
    
    //语音
    setVoice();
  });
});

//语音输入
function setVoice(){
  var a = '<a id="rs-voice" class="fbld">V</a>';
  $("div.fpd").append(a);
  $("#rs-voice").click(function(event){
    //var textarea = $("#fastpostmessage");
    //textarea.val(textarea.val()+' aaa');
    startButton(event);
  });
}


//看楼主是否有自动播放:阿桑 - 受了点伤.autoplay.mp3</a>
function bgMp3(){
  var first_post = $("div > div[id^='post_']:first"); //一楼
  var re = /<a href="forum\.php\?mod=attachment&amp;aid=.+\.autoplay\.mp3<\/a>/;
  var ret = re.exec(first_post.html());
  if(ret !== null && ret.length > 0){
    var auto_play_mp3 = ret[0];
    var a_href = 'http://rs.xidian.edu.cn/' + auto_play_mp3.split('"')[1];
    //a的href中有&amp转义; data-mp3中未转义
    var sel = "img[data-mp3='" + a_href.replace(/&amp;/g,'&') +"']";
    $(sel).trigger('click');
  }
}

//播放图片点击事件
function onImgPlayClick(){
  var d = this.getAttribute("data-mp3");  //MP3链接
  if(audio.src == d){//同一首歌
    if(audio.paused){//当前暂停中
      audio.play();
      this.className += " audio-play";
    }else{
      audio.pause();
      this.className = this.className.replace(/ audio-play/g,'');
    }
  }else{
    //停止其他旋转图标
    var as = $("ignore_js_op > img[src='static/image/filetype/av.gif']");
    for(i=0;i<as.length;++i){
      as[i].className = as[i].className.replace(/ audio-play/g,'');
    }
    audio.src = d;
    audio.play();
    this.className += " audio-play";
  }
  //console.log(audio.getAttribute('name'),' paused:',audio.paused);
}