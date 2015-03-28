window.onload = function() {
	var startAjax = function(err,message,cb){
		var xmlHttp;
		if (window.ActiveXObject) {  
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");  
		}  
		else if (window.XMLHttpRequest) {
			xmlHttp = new XMLHttpRequest();  
		}
		xmlHttp.open("POST", "/", true);
		var okFunc = function() {
			if(xmlHttp.readyState == 4) {  
				if(xmlHttp.status == 200) {
					cb(err,message,xmlHttp.responseText);
				}  
			} 
		}
		xmlHttp.onreadystatechange = okFunc;  
		xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  
		xmlHttp.send(document); 
	}
	var aHandler = function(cb) {
		var random = Math.random();
		if(random < 0.9) {
			var message = "这是个天大的秘密";
			var err = false;
			startAjax(err,message,cb);
		}
		else {
			var message = "这不是个天大的秘密";
			var err = true;
			startAjax(err,message,cb);
		}
	}
	var bHandler = function(cb) {
		var random = Math.random();
		if(random < 0.9) {
			var message = "我不知道";
			var err = false;
			startAjax(err,message,cb);
		}
		else {
			var message = "我知道";
			var err = true;
			startAjax(err,message,cb);
		}
	}
	var cHandler = function(cb) {
		var random = Math.random();
		if(random < 0.9) {
			var message = "你不知道";
			var err = false;
			startAjax(err,message,cb);
		}
		else {
			var message = "你知道";
			var err = true;
			startAjax(err,message,cb);
		}
	}
	var dHandler = function(cb) {
		var random = Math.random();
		if(random < 0.9) {
			var message = "他不知道";
			var err = false;
			startAjax(err,message,cb);
		}
		else {
			var message = "他知道";
			var err = true;
			startAjax(err,message,cb);
		}
	}
	var eHandler = function(cb) {
		var random = Math.random();
		if(random < 0.9) {
			var message = "才怪";
			var err = false;
			startAjax(err,message,cb);
		}
		else {
			var message = "就是";
			var err = true;
			startAjax(err,message,cb);
		}
	}
	var bubbleHandler = function(hint,addAll) {
		var message= "楼主异步调用战斗力感人，目测不超过" + addAll;
		hint.innerHTML = message;
	}
	document.getElementById("atplus_green").onclick = function() {
		var elements = ["A","B","C","D","E"];
		var sort = [0,1,2,3,4];
		for(var i = 0; i < 10; i++) {
			var index = Math.floor((Math.random()*sort.length));
			var mid = sort[4];
			sort[4] = sort[index];
			sort[index] = mid;
		}
		var handlers = [aHandler,bHandler,cHandler,dHandler,eHandler];
		var div = document.createElement('div');
		var clicked = [false,false,false,false,false];
		var k = 0;
		var addAll = 0;
		div.style.cssText = "position:absolute;top:-40px;left:25px;width:100px;color:red;background-color:white";
		document.getElementById('all').appendChild(div);
		for(var i = 0; i < elements.length; i++) {
			elements[i] = document.getElementById(elements[i]);
			elements[i].canClick = true;
			elements[i].onclick = function(i,elements) {
				return function() {
					if(!this.canClick)
						return;
					for(var j = 0; j < 5; j++) {
						if(i !== j) {
							elements[j].style.backgroundColor = "gray";
							elements[j].canClick = false;
						}
					}
					var div = document.createElement('div');
					div.style.cssText = "position:absolute;right:-5px;top:-5px;width:17px;height:17px;color:white;text-align:center;font-size:12px;z-index:50;background-color:red";
					div.innerHTML = "...";
					clicked[i] = true;
					this.appendChild(div);
					handlers[i](handler);
				}
			}(i,elements);
			elements[i].onmouseover = function() {
				this.style.cursor = "pointer";
			}
		}
		function handler(err,message,num) {
			if(err) {
				div.innerHTML = "Error:" + message;
				return;
			}
			addAll += parseInt(num);	
			div.innerHTML = message;
			var x = elements[sort[k]].lastChild;
			x.innerHTML = num;
			elements[sort[k]].style.backgroundColor = "gray";
			elements[sort[k]].canClick = false;
			for(var i = 0;i < 5; i++) {
				if(!clicked[i]) {
					elements[i].canClick = true;
					elements[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
				}
			}
			k++;
			if(k < 5)
				elements[sort[k]].click();
			if(k === 5) {
				document.getElementById("all").onclick = bubbleHandler.bind(null,div,addAll);
				document.getElementById("all").click();
			}
		}	
		elements[sort[0]].click();
		
	}
	document.getElementById("all").onmouseover = function() {
		this.style.cursor = "pointer";
	}
	document.getElementById("atplus_white").onmouseover = function() {
		this.style.opacity = 0;
		this.style.zIndex = -1000;
		document.getElementById("atplus_green").style.cssText = "opacity:1;transform:scale(1.5,1.5);background-color:rgba(48, 63, 159, 1)";
		document.getElementById("A").style.cssText = "opacity:1;background-color:rgba(48, 63, 159, 1);transform:translate(-82px,-40px)";
		document.getElementById("B").style.cssText = "opacity:1;background-color:rgba(48, 63, 159, 1);;transform:translate(-100px,0px)";
		document.getElementById("C").style.cssText = "opacity:1;background-color:rgba(48, 63, 159, 1);;transform:translate(-80px,50px)";
		document.getElementById("D").style.cssText = "opacity:1;background-color:rgba(48, 63, 159, 1);;transform:translate(-30px,85px)";
		document.getElementById("E").style.cssText = "opacity:1;background-color:rgba(48, 63, 159, 1);;transform:translate(30px,80px)";
		document.getElementById("all").style.cssText = "opacity:1;background-color:gray;transform:translate(-50px,-80px);width:150px;height:150px;color:white;text-align:center;font-weight:bold";
	}
	
	
};