window.onload = function() {
	circles = get_circles();
	for (var i = 0; i < circles.length; i++)
		circles[i].state = "noclick";
	for (var i = 0; i < circles.length; i++) {
		circles[i].onclick = function() {
			if (this.state == "noclick" && IsClass(this, "enable")) {
				click_circles(this);
				var number;
				var that = this;
				Ajax("http://localhost:3000", function(number) {
					getRandomNum(that, number);
					stateChanging(that);
					Check_Sum();
				});
			}
		}
	}
	info_bar = document.getElementById('info-bar');
	info_bar.onclick = function() {
		if (IsClass(this, 'enable')) {
			calculate_sum(this);
		}
	}
    positioner = document.getElementById('bottom-positioner');
 	positioner.onmouseleave = function() {
 		reset();
	}

	var button = document.getElementById("icon");
	button.onclick = function() {
		var circles = get_circles();
		robot(circles, 0);
		robot(circles, 1);
		robot(circles, 2);
		robot(circles, 3);
		robot(circles, 4);
	}
}


function get_circles() {
	var ring = document.getElementById("control-ring-container");
	var all_div = ring.getElementsByTagName('div');
	var all_circles = [];
	for (var i = 0; i < all_div.length; i++) {
		if (i % 2 == 0)
			all_circles.push(all_div[i]);
	}
	return all_circles;
}

function IsClass(elem, name) {
	var reg = new RegExp(name);
	return elem.className.match(reg);
}

function AddClass(elem, name) {
	if (IsClass(elem, name))
		return;
	else
		elem.className += ' ' + name;
}

function DeleteClass(elem, name) {
	if (IsClass(elem, name))
		elem.className=elem.className.replace(new RegExp(name), '');
}

function click_circles(elem) {
	elem.getElementsByTagName('div')[0].style.visibility = "visible";
	elem.state ="isclick";
	var circles = get_circles();
	for (var i = 0; i < circles.length; i++)
		DeleteClass(circles[i], "enable");
	AddClass(elem, "enable");
}

function getRandomNum(elem, number) {
	elem.getElementsByTagName('div')[0].textContent = number;
}

function stateChanging(elem) {
	var circles = get_circles();
	DeleteClass(elem, 'enable');
	for (var i = 0; i < circles.length; i++) {
		if (circles[i].state == "noclick") {
			AddClass(circles[i], "enable");
		}
	}
}

function Check_Sum() {
	var circles = get_circles();
	var flag = true;
	for (var i = 0; i < circles.length; i++) {
		if (circles[i].state != "isclick") {
			flag = false;
			break;
		}
	}
	if (flag == true) {
		AddClass(document.getElementById('info-bar'), 'enable');
		return true;
	}
	return false;
}

function calculate_sum(elem) {
	var circles = get_circles();
	var sum = 0;
	for (var i = 0; i < circles.length; i++) {
		sum += parseInt(circles[i].getElementsByTagName('div')[0].textContent);
	}
	elem.getElementsByTagName('span')[0].textContent = sum;
	DeleteClass(elem, 'enable');
}

function reset() {
	var circles = get_circles();
	for (var i = 0; i < circles.length; i++) {
		circles[i].state = "noclick";
	    AddClass(circles[i], 'enable');
	    circles[i].getElementsByTagName('div')[0].style.visibility = "hidden";
	    circles[i].getElementsByTagName('div')[0].textContent = "...";
	}
	var info_bar = document.getElementById('info-bar');
	info_bar.getElementsByTagName('span')[0].textContent = '';
	DeleteClass(info_bar, 'enable');
}

function Ajax(url, callback) {
	var xmlhttp;
	if (window.XMLHttpRequest)
  	{// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp = new XMLHttpRequest();
  	}
	else
  	{// code for IE6, IE5
  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  	}
  	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
  		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
    	callback(xmlhttp.responseText);
    }
  }
}

function robot_click_circles(elem) {
	elem.getElementsByTagName('div')[0].style.visibility = "visible";
	elem.state ="isclick";
}

function robot_check_Sum() {
	var circles = get_circles();
	var flag = true;
	for (var i = 0; i < circles.length; i++) {
		if (circles[i].getElementsByTagName('div')[0].textContent == '...') {
			flag = false;
			break;
		}
	}
	if (flag == true) {
		AddClass(document.getElementById('info-bar'), 'enable');
		return true;
	}
	return false;
}

/*参考资料XMLHttpRequest对象连接池*/
var XMLHttp = {
	_objPool : [],

	_getInstance : function() {
		for ( var i = 0; i < this._objPool.length; i++) {
			if (this._objPool[i].readyState == 0
					|| this._objPool[i].readyState == 4) {
				return this._objPool[i];
			}
		}

		// IE5中不支持push方法
		this._objPool[this._objPool.length] = this._createObj();

		return this._objPool[this._objPool.length - 1];
	},

	_createObj : function() {
		if (window.XMLHttpRequest) {
			var objXMLHttp = new XMLHttpRequest();

		} else {
			var MSXML = [ 'MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0',
					'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP' ];
			for ( var n = 0; n < MSXML.length; n++) {
				try {
					var objXMLHttp = new ActiveXObject(MSXML[n]);
					break;
				} catch (e) {
				}
			}
		}

		// mozilla某些版本没有readyState属性
		if (objXMLHttp.readyState == null) {
			objXMLHttp.readyState = 0;

			objXMLHttp.addEventListener("load", function() {
				objXMLHttp.readyState = 4;

				if (typeof objXMLHttp.onreadystatechange == "function") {
					objXMLHttp.onreadystatechange();
				}
			}, false);
		}

		return objXMLHttp;
	},

	// 发送请求(方法[post,get], 地址, 数据, 回调函数)
	sendReq : function(method, url, data, callback) {
		var objXMLHttp = this._getInstance();

		with (objXMLHttp) {
			try {
				// 加随机数防止缓存
				if (url.indexOf("?") > 0) {
					url += "&randnum=" + Math.random();
				} else {
					url += "?randnum=" + Math.random();
				}

				open(method, url, true);

				// 设定请求编码方式
				setRequestHeader('Content-Type',
						'application/x-www-form-urlencoded; charset=UTF-8');
				send(data);
				onreadystatechange = function() {
					if (objXMLHttp.readyState == 4
							&& (objXMLHttp.status == 200 || objXMLHttp.status == 304)) {
						callback(objXMLHttp.responseText);
					}
				}
			} catch (e) {
				alert(e);
			}
		}
	}
};



function robot(elem, index) {
	if (elem[index].state == "noclick" && IsClass(elem[index], "enable")) {
		robot_click_circles(elem[index]);
		var number;
		var that = elem[index];
		XMLHttp.sendReq('GET', 'http://localhost:3000', '', function(number) {
			getRandomNum(that, number);
			stateChanging(that);			
			if (robot_check_Sum()) {
				var info_bar = document.getElementById('info-bar');
				calculate_sum(info_bar);
			}
		});
	}
}
