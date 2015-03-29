// Created by Lushen Liao
// Connect with me by 1219810894@qq.com


// Tool function ----> 将HTMLCollection/NodeList/伪数组转换成数组(copy form internet)
var makeArray = function(obj){
    return Array.prototype.slice.call(obj,0);
}

window.onload = function() {
	// 这个allBtns只是一个静态的变量，用于获取全部的button，不想在每个函数里都加这句话，原谅我的任性
	var allBtns = makeArray(document.getElementById('control-ring').getElementsByTagName('li'));
	for (var i = 0; i < allBtns.length; i++) {
		allBtns[i].addEventListener('click', getNum);
	}
	document.getElementById("info-bar").addEventListener('click', getSum);
	document.getElementById("at-plus-container").addEventListener('mouseout', reset);
	document.getElementById('apd').addEventListener('click', robotThree);

	function getNum(event) {
		var xhr = new XMLHttpRequest();
	    var disableBtns = makeArray(document.getElementById('control-ring').getElementsByClassName('disable'));
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
	    var disableBtns = makeArray(document.getElementById('control-ring').getElementsByClassName('disable'));
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

	function aHandler(queue, index, currentSum) {
		var xhr = new XMLHttpRequest();
		document.getElementById(queue[index]).getElementsByClassName('unread')[0].style.display = "inline";
		document.getElementsByClassName('message')[0].innerHTML = '这是个天大的秘密';
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				document.getElementById(queue[index]).getElementsByClassName('unread')[0].innerHTML = xhr.responseText;
				currentSum += Number(xhr.responseText);
				++index;
				bubbleHandler(currentSum);
				if (index < 5) {
					var nextFunction = selectFunction(queue[index]);
					nextFunction(queue, index, currentSum);
				}
			} else {
				document.getElementById(queue[index]).getElementsByClassName('unread')[0].innerHTML = "..";
			}
		}
		xhr.open("get", "/", true);
		xhr.send(null);
	}

	function bHandler(queue, index, currentSum) {
		var xhr = new XMLHttpRequest();
		document.getElementById(queue[index]).getElementsByClassName('unread')[0].style.display = "inline";
		document.getElementsByClassName('message')[0].innerHTML = '我不知道';
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				document.getElementById(queue[index]).getElementsByClassName('unread')[0].innerHTML = xhr.responseText;
				currentSum += Number(xhr.responseText);
				++index;
				bubbleHandler(currentSum);
				if (index < 5) {
					var nextFunction = selectFunction(queue[index]);
					nextFunction(queue, index, currentSum);
				}
			} else {
				document.getElementById(queue[index]).getElementsByClassName('unread')[0].innerHTML = "..";
			}
		}
		xhr.open("get", "/", true);
		xhr.send(null);
	}

	function cHandler(queue, index, currentSum) {
		var xhr = new XMLHttpRequest();
		document.getElementById(queue[index]).getElementsByClassName('unread')[0].style.display = "inline";
		document.getElementsByClassName('message')[0].innerHTML = '你不知道';
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				document.getElementById(queue[index]).getElementsByClassName('unread')[0].innerHTML = xhr.responseText;
				currentSum += Number(xhr.responseText);
				++index;
				bubbleHandler(currentSum);
				if (index < 5) {
					var nextFunction = selectFunction(queue[index]);
					nextFunction(queue, index, currentSum);
				}
			} else {
				document.getElementById(queue[index]).getElementsByClassName('unread')[0].innerHTML = "..";
			}
		}
		xhr.open("get", "/", true);
		xhr.send(null);
	}

	function dHandler(queue, index, currentSum) {
		var xhr = new XMLHttpRequest();
		document.getElementById(queue[index]).getElementsByClassName('unread')[0].style.display = "inline";
		document.getElementsByClassName('message')[0].innerHTML = '他不知道';
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				document.getElementById(queue[index]).getElementsByClassName('unread')[0].innerHTML = xhr.responseText;
				currentSum += Number(xhr.responseText);
				++index;
				bubbleHandler(currentSum);
				if (index < 5) {
					var nextFunction = selectFunction(queue[index]);
					nextFunction(queue, index, currentSum);
				}
			} else {
				document.getElementById(queue[index]).getElementsByClassName('unread')[0].innerHTML = "..";
			}
		}
		xhr.open("get", "/", true);
		xhr.send(null);
	}

	function eHandler(queue, index, currentSum) {
		var xhr = new XMLHttpRequest();
		document.getElementById(queue[index]).getElementsByClassName('unread')[0].style.display = "inline";
		document.getElementsByClassName('message')[0].innerHTML = '才怪';
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				document.getElementById(queue[index]).getElementsByClassName('unread')[0].innerHTML = xhr.responseText;
				currentSum += Number(xhr.responseText);
				++index;
				bubbleHandler(currentSum);
				if (index < 5) {
					var nextFunction = selectFunction(queue[index]);
					nextFunction(queue, index, currentSum);
				}
			} else {
				document.getElementById(queue[index]).getElementsByClassName('unread')[0].innerHTML = "..";
			}
		}
		xhr.open("get", "/", true);
		xhr.send(null);
	}

	function bubbleHandler(currentSum) {
		document.getElementById("info-bar").getElementsByTagName('p')[0].innerHTML = currentSum;
	}

	function selectFunction(str) {
		if (str === 'A') return aHandler;
		if (str === 'B') return bHandler;
		if (str === 'C') return cHandler;
		if (str === 'D') return dHandler;
		if (str === 'E') return eHandler;
	}

	function robotThree() {
		clear();
		var queue = ['A', 'B', 'C', 'D', 'E'];
		function randomsort(a, b) {
        	return Math.random()>.5 ? -1 : 1;
		}
		queue.sort(randomsort);  //get random queue
		var strQueue = "";
		for (var i = 0; i < queue.length; i++) {
			strQueue += queue[i];
		}
		document.getElementsByClassName('queue')[0].innerHTML = strQueue;

		function robotBegin(num) {
			var index = num;
			var currentSum = 0;
			disable(allBtns);
			var nextFunction = selectFunction(queue[index]);
			nextFunction(queue, index, currentSum);
		}
		robotBegin(0);
	}

	function clear() {
		var disableBtns = makeArray(document.getElementById('control-ring').getElementsByClassName('disable'));
		enable(allBtns);
		disable(document.getElementById("info-bar"));
		disableBtns.splice(0,disableBtns.length); //clear array;
		var redBtns = document.getElementsByClassName('unread');
		for (var i = 0; i < redBtns.length; i++) {
			redBtns[i].style.display = 'none';
		}
		document.getElementById("info-bar").getElementsByTagName('p')[0].innerHTML = "";
		document.getElementsByClassName('queue')[0].innerHTML = "";
		document.getElementsByClassName('message')[0].innerHTML = "";
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
