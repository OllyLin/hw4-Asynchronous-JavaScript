// Created by Lushen Liao
// Connect with me by 1219810894@qq.com


// Tool function ----> 将HTMLCollection/NodeList/伪数组转换成数组(copy form internet)
var makeArray = function(obj){
    return Array.prototype.slice.call(obj,0);
}

window.onload = function() {
	var xhr = new XMLHttpRequest();
	// creat a XMLHttpRequest Object Pool
	var XMLHttp = {
		_objPool: [],
		_getInstance: function () {
        	for (var i = 0; i < this._objPool.length; i ++) {
            	if (this._objPool[i].readyState == 0 || this._objPool[i].readyState == 4) {
                	return this._objPool[i];
            	}
        	}
        	this._objPool[this._objPool.length] = this._createObj();
        	return this._objPool[this._objPool.length - 1];
    	},
    	_createObj: function () {
        	return new XMLHttpRequest();
    	},
    	sendReq: function (method, url, target) {
    		var request = this._getInstance();
    		url += "?randnum=" + Math.random();
    		request.open(method, url, true);
    		request.send(null);
    		request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					target.getElementsByClassName('unread')[0].innerHTML = request.responseText;
					disableBtns.push(target);
		        	if (disableBtns.length == 5) {
		        		var sum = 0;
						for (var i = 0; i < disableBtns.length; i++) {
							sum += Number(disableBtns[i].getElementsByClassName('unread')[0].innerHTML);
						}
						document.getElementById("info-bar").getElementsByTagName('p')[0].innerHTML = sum;
		        	}
				} else {
					target.getElementsByClassName('unread')[0].innerHTML = ".."
				}
			}
    	}
	}
	var allBtns = makeArray(document.getElementById('control-ring').getElementsByTagName('li'));
	var disableBtns = makeArray(document.getElementById('control-ring').getElementsByClassName('disable'));

	for (var i = 0; i < allBtns.length; i++) {
		allBtns[i].addEventListener('click', getNum);
	}
	document.getElementById("info-bar").addEventListener('click', getSum);
	document.getElementById("at-plus-container").addEventListener('mouseout', reset);
	document.getElementById('apd').addEventListener('click', robotTwo);

	function getNum(event) {
		var target = event.target;
		while (target.localName != "li") target = target.parentNode; // the target maybe the "p", we need "li";
		if (target.classList.contains("enable")) {
			disable(allBtns);
			target.getElementsByClassName('unread')[0].style.display = "inline";
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					target.getElementsByClassName('unread')[0].innerHTML = xhr.responseText;
					disableBtns.push(target);
					enable(allBtns);
		        	disable(disableBtns);
		        	if (disableBtns.length == 5) {
		        		enable(document.getElementById("info-bar"));
		        	}
				} else {
					target.getElementsByClassName('unread')[0].innerHTML = ".."
				}
			}
			xhr.open("get", "/", true);
			xhr.send(null);
		}
	}

	function getSum(event) {
		var target = event.target;
		while (target.id != "info-bar") target = target.parentNode;
		if (target.classList.contains("enable")) {
			var sum = 0;
			for (var i = 0; i < disableBtns.length; i++) {
				sum += Number(disableBtns[i].getElementsByClassName('unread')[0].innerHTML);
			}
			target.getElementsByTagName('p')[0].innerHTML = sum;
			disable(target);
		}
	}

	function reset(event) {
		var target = event.relatedTarget ? event.relatedTarget : event.toElement;
		while (target && target != this) {target = target.parentNode;}
		if (target != this) {
			clear();
		}
	}

	function robotTwo() {
		clear();
		disable(allBtns);
		for (var i = 0; i < allBtns.length; i++) {
			allBtns[i].getElementsByClassName('unread')[0].style.display = "inline";
			XMLHttp.sendReq("get", "/", allBtns[i]);
		}
	}

	function clear() {
		xhr.abort();
		enable(allBtns);
		disable(document.getElementById("info-bar"));
		disableBtns.splice(0,disableBtns.length); //clear array;
		var redBtns = document.getElementsByClassName('unread');
		for (var i = 0; i < redBtns.length; i++) {
			redBtns[i].style.display = 'none';
		}
		document.getElementById("info-bar").getElementsByTagName('p')[0].innerHTML = "";
	}

	function enable() {
		for (var i = 0; i < arguments.length; i++) {
			if (arguments[i].length) {
				for (var j = 0; j < arguments[i].length; j++) {
					arguments[i][j].classList.remove("disable");
					arguments[i][j].classList.add("enable");
				}
			} else {
				arguments[i].classList.remove("disable");
				arguments[i].classList.add("enable");
			}
		}
	}

	function disable() {
		for (var i = 0; i < arguments.length; i++) {
			if (arguments[i].length) {  // judge weather it's an array;
				for (var j = 0; j < arguments[i].length; j++) {
					arguments[i][j].classList.remove("enable");
					arguments[i][j].classList.add("disable");
				}
			} else {
				arguments[i].classList.remove("enable");
				arguments[i].classList.add("disable");
			}
		}
	}
}
