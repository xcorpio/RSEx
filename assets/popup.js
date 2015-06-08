
$(document).ready(function(){
	console.log("%cAuthor: %cmr.zheng\n%cE-mail: %cxcorpio@qq.com","color:purple","color:red","color:purple","color:red");
  
  if(localStorage.getItem('autosignin') === null){
    localStorage.setItem('autosignin','true');
  }
  if(localStorage.getItem('doufm') === null){
    localStorage.setItem('doufm','true');
  }
	$("#id_autosignin").click(function(){
	  localStorage.setItem('autosignin',$("#id_autosignin").prop("checked"));
	});
	$("#id_doufm").click(function(){
	  localStorage.setItem('doufm',$("#id_doufm").prop("checked"));
	});
	$('#id_autosignin').prop('checked',localStorage.getItem('autosignin')=='true');
	$('#id_doufm').prop('checked',localStorage.getItem('doufm')=='true');
});



