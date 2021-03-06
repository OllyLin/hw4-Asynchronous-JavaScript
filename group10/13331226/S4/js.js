window.onload = function() {
	var AtoE = getAllLi();
	addEvent(AtoE);
	var control = document.getElementById("at-plus-container");
	control.onmouseover = function(event) {
		//console.log(this);
		//event.stopPropagation();
		//reset(this);
	};
	// icon event
	var icon = document.getElementsByClassName("icon")[0];
	icon.onclick = triggerAllLi;
	
};
function getAllLi() {
	return document.getElementsByClassName("button");
};
function addEvent(elements) {
	for (var i = 0; i < elements.length; i++) {
		elements[i].onclick = clickEvent;
	}
}
function clickEvent() {
	freezeOthers(this);
	requestData(this);
}
function freezeOthers(active) {
	if (active.className.indexOf("sending") == -1) {
		active.className += " sending";
	}
	var AtoE = getAllLi();
	for (var i = 0; i < AtoE.length; i++) {
		if (AtoE[i] !== active && AtoE[i].className.indexOf("hasData") == -1) {
			AtoE[i].className += " frozen";
			AtoE[i].onclick = function() {};
		}
	}
}

function requestData(obj) {
	// async req
	var xml = new XMLHttpRequest();
	var url = "http://localhost:3000/";
	xml.open("GET", url, true);
	xml.onreadystatechange = function() {
		manageData(obj, xml);
		afterRequest(obj);
	};
	xml.send(null);
	// add red circle
	var span = document.createElement("span");
	span.setAttribute("class", "unread");
	span.innerHTML = "...";
	if (obj.getElementsByTagName("span").length == 0) {
		obj.appendChild(span);
	}
}
function afterRequest(element) {
	// freeze element recieved data
	element.onclick = function() {};
	element.className = element.className.replace("sending", "hasData");
	// active others
	var AtoE = getAllLi();
	for (var i = 0; i < AtoE.length; i++) {
		if (AtoE[i].className.indexOf("frozen") != -1) {
			AtoE[i].className = AtoE[i].className.replace(" frozen", "");
			AtoE[i].onclick = clickEvent;
		}
	}
	
}
function manageData(obj, xml) {
	if (xml.readyState == 4) {
		var container = obj.getElementsByClassName("unread")[0];
		container.innerHTML = xml.responseText;
		checkAllHaveData();
	}
}
function checkAllHaveData() {
	var lis = getAllLi();
	var allhave = true;
	for (var i = 0; i < lis.length; i++) {
		var span = lis[i].getElementsByTagName("span");
		if (span.length == 0) {
			allhave = false;
			break;
		}
		if (span[0].innerHTML == "...") {
			allhave = false;
			break;
		}
	}
	if (allhave) {
		infoActive();
	}
}
function infoActive() {
	var info = document.getElementsByClassName("info")[0];
	info.onclick = addNum;
}
function addNum() {
	var lis = getAllLi();
	var sum = 0;
	for (var i = 0; i < lis.length; i++) {
		var str = lis[i].getElementsByTagName("span")[0].innerHTML;
		sum += parseInt(str);
	}
	var info = document.getElementsByClassName("info")[0];
	info.innerHTML = sum;
	info.onclick = function() {};
}
function reset(obj) {
	console.log(obj);
	var lis = obj.getElementsByTagName("li");
	if (lis.length == 0) return;
	for (var i = 0; i < lis.length; i++) {
		var span = lis[i].getElementsByTagName("span");
		if (span.length != 0) {
			lis[i].removeChild(span[0]);
		}
	}
	var info = document.getElementsByClassName("info")[0];
	info.innerHTML = "";
}


var arr = [];
// s2 add
function triggerAllLi() {
	// random
	
	var i = 0;
	while(arr.length != 5) {
		var num = Math.floor(Math.random() * 5);
		var has = false;
		for (var k = 0; k < i; k++) {
			if (arr[k] == num) {
				has = true;
				break;
			}
		}
		if (!has) {
			arr[i] = num;
			i++;
		}
	}
	// add to info
	var info = document.getElementsByClassName("info")[0];
	var str = "";
	var dic = ["A", "B", "C", "D", "E"];
	for (var m = 0; m < 5; m++) {
		str += dic[arr[m]];
	}
	info.innerHTML = str;
	console.log("triggerall");

	var AtoE = getAllLi();
	
	/*
	for (var i = 0; i < AtoE.length; i++) {
		AtoE[i].click();
	}
	*/
	requestData = function(obj) {
		var xml = new XMLHttpRequest();
		var url = "http://localhost:3000/";
		xml.open("GET", url, true);
		xml.onreadystatechange = function() {
			manageData(obj, xml);
			afterRequest(obj);
			if (xml.readyState == 4) {
				chain();
			}
		};
		xml.send(null);
		// add red circle
		var span = document.createElement("span");
		span.setAttribute("class", "unread");
		span.innerHTML = "...";
		if (obj.getElementsByTagName("span").length == 0) {
			obj.appendChild(span);
		}
	}
	
		AtoE[arr[index]].click();
		index++;
	
}
var index = 0;
function chain() {
	
	var AtoE = getAllLi();
	if (arr[index] < 5) {
		AtoE[arr[index]].click();
		index++;
	}
	

	checkAllHaveData();
	var info = document.getElementsByClassName("info")[0];
	info.click();	
}