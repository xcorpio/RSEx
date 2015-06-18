
$(document).ready(function(){
	console.log("%cAuthor: %cmr.zheng\n%cE-mail: %cxcorpio@qq.com","color:purple","color:red","color:purple","color:red");
  
  if(localStorage.getItem('autosignin') === null){
    localStorage.setItem('autosignin','true');
  }
  if(localStorage.getItem('doufm') === null){
    localStorage.setItem('doufm','true');
  }
  if(localStorage.getItem('rs') === null){
    localStorage.setItem('rs','true');
  }
	$("#id_autosignin").click(function(){
	  localStorage.setItem('autosignin',$("#id_autosignin").prop("checked"));
	});
	$("#id_doufm").click(function(){
	  localStorage.setItem('doufm',$("#id_doufm").prop("checked"));
	});
	$("#id_rs").click(function(){
	  localStorage.setItem('rs',$("#id_rs").prop("checked"));
	});
	$('#id_autosignin').prop('checked',localStorage.getItem('autosignin')=='true');
	$('#id_doufm').prop('checked',localStorage.getItem('doufm')=='true');
	$('#id_rs').prop('checked',localStorage.getItem('rs')=='true');
	
	//聊天室
	$("#id_button").click(function(){
	  var channel = $("#id_channel").prop("value");
	  var url = "http://rs.xidian.edu.cn/tv.php?mod=chat&channel="+channel;
	  window.open(url);
	  localStorage.setItem('channel',channel);
	});
	if(localStorage.getItem("channel") === null){
	  localStorage.setItem("channel",1);
	}
	$("#id_channel").prop('value',localStorage.getItem("channel"));
});



