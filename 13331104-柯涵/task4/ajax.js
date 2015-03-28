var sign = false;

window.onload = function() {
	var unreads = document.getElementsByClassName("unread");
	var list = document.getElementsByTagName("li");
	var ele = document.getElementById("at-plus-container");
	for (var i = 0; i < unreads.length; i++) unreads[i].style.visibility = "hidden";
	ele.onclick = function() {
		mainclick(list);
	}
}

function mainclick(list) {
	var x = new Array();
	var i;
	var j;
	for (i = 0; i < list.length; i++) {
		var y = Math.random()*4;
		for (j = 0; j < x.length; j++) {
			if (y == x[j]) {
				i--;
				break;
			}
		}
		if (j == x.length) x[i] = y;
	}
	button_click(list, x);
}

function button_click(list, x) {
	for (var i = 0; i < x.length; i++) {
	var unreads = document.getElementsByClassName("unread");
	list[x[i]].style.backgroundColor = "gray";
	unreads[i].style.visibility = "visible";
	unreads[i].innerHTML = "...";
	var xmlHttpReg = null;
	if (window.ActiveXObject) {
    	xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");
  	} else if (window.XMLHttpRequest) {
     	xmlHttpReg = new XMLHttpRequest();
    }
  	//如果实例化成功,就调用open()方法,就开始准备向服务器发送请求
  	if (xmlHttpReg != null) {
    	xmlHttpReg.open("get", "/", true);
   		xmlHttpReg.send(null);
    	xmlHttpReg.onreadystatechange = function() {
    		if (xmlHttpReg.readyState == 4 && xmlHttpReg.status == 200) {
    			unreads[i].innerHTML = xmlHttpReg.responseText;
    			for (var l = 0; l < unreads.length; l++) if (unreads[l].innerHTML == "") list[l].style.backgroundColor = "blue";
    			if (i + 1 < list.length) {
    				button_click(list, i + 1);
    			} else {
    				mainbutton_click();
    			}
    		}
    	}
	}
	//if (i + 1 < list.length) setTimeout(button_click(list, i + 1), 5000);
}

function mainbutton_click() {
	var main = document.getElementById("info-bar");
	var number = document.getElementsByClassName("sum")[0];
	var unreads = document.getElementsByClassName("unread");
	var sum = 0;
	for (var i = 0; i < unreads.length; i++) sum += parseInt(unreads[i].innerHTML);
	number.innerHTML = sum.toString();
	main.style.backgroundColor = "gray";
}

function check(list) {
	var x;
	for (x = 0; x < list.length; x++) if (list[x].style.backgroundColor == "blue") return false;
	var info = document.getElementById("info-bar");
	info.style.backgroundColor = "blue";
	return true;
}

function clean() {
	var unreads = document.getElementsByClassName("unread");
	var list = document.getElementsByTagName("li");
	var main = document.getElementById("info-bar");
	for (var i = 0; i < unreads.length; i++) {
		unreads[i].innerHTML = "";
		unreads[i].style.visibility = "hidden";
	}
	for (var i = 0; i < list.length; i++) list[i].style.backgroundColor = "blue";
	main.style.backgroundColor = "gray";
}

function kong() {}