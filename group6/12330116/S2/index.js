window.onload = function() {
	
	//样式定型
	var atplus_white = document.getElementById("atplus_white");
	var atplus_green = document.getElementById("atplus_green");
	var elements = ["A","B","C","D","E"];
	var xmlHttp;  
	function createXMLHttpRequest() {  
		if (window.ActiveXObject) {  
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");  
		}  
		else if (window.XMLHttpRequest) {
			xmlHttp = new XMLHttpRequest();  
		}  
	}
	
	var num = 0;
	var addAll = 0;
	var clicked = [false,false,false,false,false];
	var k = 0;
	var okFunc = function(obj,elements){
		if(xmlHttp.readyState == 4) {  
			if(xmlHttp.status == 200) {
				addAll += parseInt(xmlHttp.responseText);
				num++;
				var div = obj.lastChild;
				div.innerHTML = xmlHttp.responseText;
				obj.style.backgroundColor = "gray";
				obj.canClick = false;
				for(var i = 0;i < 5; i++) {
					if(!clicked[i]) {
						elements[i].canClick = true;
						elements[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
					}
				}
				if(k < 5)
					elements[k].click();
				if(k === 5)
					all.click();
				k++;
			}  
		}  
	}  
	var startAjax = function(obj){  
		createXMLHttpRequest();  
		if( !xmlHttp){  
			return alert('create failed');  
		}  
		xmlHttp.open("POST", "/", true);  
		xmlHttp.onreadystatechange = okFunc.bind(null,obj,elements);  
		xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  
		xmlHttp.send(document); 
	}  

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
				startAjax(this,elements);
			}
		}(i,elements);
		elements[i].onmouseover = function() {
			this.style.cursor = "pointer";
		}
		atplus_green.onclick = function() {
			elements[0].click();
			k++;
			this.onclick = null;
		}
	}
	var all = document.getElementById("all");
	all.onclick = function() {
		console.log(num);
		if(num === 5) {
			var textNode = document.createTextNode(addAll);
			document.getElementById('addAll').appendChild(textNode);
			this.onclick = null;
		}
	}
	all.onmouseover = function() {
		this.style.cursor = "pointer";
	}
	atplus_white.onmouseover = function() {
		atplus_white.style.opacity = 0;
		atplus_white.style.zIndex = -1000;
		atplus_green.style.cssText = "opacity:1;transform:scale(1.5,1.5);background-color:rgba(48, 63, 159, 1)";
		elements[0].style.cssText = "opacity:1;background-color:rgba(48, 63, 159, 1);transform:translate(-82px,-40px)";
		elements[1].style.cssText = "opacity:1;background-color:rgba(48, 63, 159, 1);;transform:translate(-100px,0px)";
		elements[2].style.cssText = "opacity:1;background-color:rgba(48, 63, 159, 1);;transform:translate(-80px,50px)";
		elements[3].style.cssText = "opacity:1;background-color:rgba(48, 63, 159, 1);;transform:translate(-30px,85px)";
		elements[4].style.cssText = "opacity:1;background-color:rgba(48, 63, 159, 1);;transform:translate(30px,80px)";
		all.style.cssText = "opacity:1;background-color:gray;transform:translate(-50px,-80px);width:150px;height:150px;color:white;text-align:center;font-weight:bold";
	}
	
	
};