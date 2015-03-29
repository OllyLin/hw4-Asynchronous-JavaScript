var sign = false;

window.onload = function() {
	var unreads = document.getElementsByClassName("unread");
	var list = document.getElementsByTagName("li");
	for (var i = 0; i < unreads.length; i++) unreads[i].style.visibility = "hidden";
	button_click(list, unreads);
	mainbutton_click();
}

function button_click(list, unreads) {
	var blo = document.getElementById("all");
	blo.onMouseout = clean();
	for (var i = 0; i < list.length; i++) {
		list[i].onclick = function(i) {
			return function() {
				if (list[i].style.backgroundColor == "gray") return;
				for (var j = 0; j < list.length; j++) list[j].style.backgroundColor = "gray";
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
    						sign = check(list);
    					}
    				} //设置回调函数
				}
			};
		}(i);
	}
}

function mainbutton_click() {
	var main = document.getElementById("info-bar");
	var number = document.getElementsByClassName("sum")[0];
	main.onclick = function() {
		if (sign == false) return;
		var unreads = document.getElementsByClassName("unread");
		var sum = 0;
		for (var i = 0; i < unreads.length; i++) sum += parseInt(unreads[i].innerHTML);
		number.innerHTML = sum.toString();
		main.style.backgroundColor = "gray";
	}
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