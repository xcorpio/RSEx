$(document).ready(function(){
  chrome.extension.sendMessage({'type':'value'}, function(response){//是否使用doufm功能
    if(response.isShow === false) return;
    var a = '<a id="a_download" download="fileName" href="fileUrl" title="download ">下载</a>';
    $("body").append(a);
    $("#a_download").click(function(){
      var shareMsg = $("#shareMsg").html();
      var msgs = shareMsg.split('<br>');
      var fileName = msgs[1];
      var url = msgs[2];
      var fileUrl = 'http' + url.split('http')[2];
      this.download = fileName + ".mp3";
      this.href = fileUrl;
    });  
  });
});

