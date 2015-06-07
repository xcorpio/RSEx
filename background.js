chrome.runtime.onStartup.addListener(signInRs);
chrome.alarms.onAlarm.addListener(onRsAlarm);
setAlarm();


//设置定时器
function setAlarm(){
  var xhr = new XMLHttpRequest();
	xhr.open("GET","http://rs.xidian.edu.cn/misc.php?mod=faq",true);
	xhr.send();
	xhr.onreadystatechange=function(){//got time
	  if(xhr.readyState==4&&xhr.status==200){
	    var regex = /GMT\+8.+</;
	    var time = regex.exec(xhr.responseText)[0].split('GMT+8, ')[1].split('<')[0];
      if(time===null) time = new Date();
      var serverTime = new Date(time);
      var alarmTime = new Date(serverTime.getFullYear(),serverTime.getMonth(),serverTime.getDate(),7,0,0,0);
      var delay = alarmTime-serverTime;
      if(delay < 0){
        delay+=86400000;
      }
      info = {'when':delay + Date.now()};
      chrome.alarms.create("RsAlarm",info);
	  }
	};
}

//定时事件
function onRsAlarm(alarm){
  console.log(alarm,' fired.');
	signInRs();  
}

//浏览器启动时，睿思签到
function signInRs(){
	var day=localStorage.getItem('day');
	var d=(new Date()).getDate().toString();
	if(day!=d){
		var xhr = new XMLHttpRequest();
		xhr.open("GET","http://rs.xidian.edu.cn/plugin.php?id=dsu_paulsign:sign",true);
		//签到参数
		xhr.send();
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				//console.log(typeof(xhr.responseText),xhr.responseText);
				//获得formhash
				var regex = /formhash=\S+"/;
				regret = regex.exec(xhr.responseText)[0];
				var formhash = regret.split('"')[0];
				
				//签到心情,开心
				var qdxq = 'kx';
				//签到模式
				var qdmode = '1';
				//todaysay
				var todaysay="love u.";
				//快速回复
				var fastreplay='0';
				//发送签到
				var xhr2 = new XMLHttpRequest();
				xhr2.open("POST","http://rs.xidian.edu.cn/plugin.php?id=dsu_paulsign:sign&operation=qiandao&infloat=1&inajax=1",true);
				xhr2.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        var data = formhash+'&qdxq='+qdxq+"&qdmode="+qdmode+"&todaysay="+todaysay+'&fastreplay='+fastreplay;
        console.log('post:',data);
				xhr2.send(data);
				xhr2.onreadystatechange=function(){
				  if(xhr2.readyState==4&&xhr2.status==200){  //成功签到
				    //console.log(typeof(xhr2.responseText),xhr2.responseText);
				    var c = localStorage.getItem('total');
				    if(c===null){
				    	var regex = /恭喜你签到成功!获得随机奖励 金币 \d/;
					    var coin = regex.exec(xhr2.responseText)[0].split(' ')[2];
					    localStorage.setItem('total',parseInt(coin));
				    }else{
					    var cc = parseInt(c);
					    var regex2 = /恭喜你签到成功!获得随机奖励 金币 \d/;
					    var coin2 = regex2.exec(xhr2.responseText)[0].split(' ')[2];
					    localStorage.setItem('total',cc+parseInt(coin2));
				    }
				    //本地存储今天签到日期
				    localStorage.setItem('day',(new Date()).getDate());
				    //记录签到次数
				    c = localStorage.getItem('times');
				    if(c===null){
					    localStorage.setItem('times',1);
				    }else{
					    var ci = parseInt(c);
					    localStorage.setItem('times',ci+1);
				    }
				    setAlarm();
				  }
				};
			}
		};
	}else{
		console.log('signed.');
	}
}

