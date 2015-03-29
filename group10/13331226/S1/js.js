window.onload = function() {
	var AtoE = getAllLi();
	addEvent(AtoE);
	var control = document.getElementById("at-plus-container");
	control.onmouseover = function(event) {
		//console.log(this);
		//event.stopPropagation();
		//reset(this);
	};
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
	active.className += " sending";
	var AtoE = getAllLi();
	for (var i = 0; i < AtoE.length; i++) {
		if (AtoE[i] !== active && AtoE[i].className.indexOf("hasData") == -1) {
			AtoE[i].className += " frozen";
			AtoE[i].onclick = function() {};
		}
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
