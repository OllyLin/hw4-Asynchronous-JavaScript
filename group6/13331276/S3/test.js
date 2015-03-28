window.onload = init;
function getNumber(targetSpan) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// code below for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code below handle IE5 and IE6
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
	}
	xmlhttp.onreadystatechange = function(target, targetXmlhttp) {
		return function() {
			if (targetXmlhttp.readyState == 4 && targetXmlhttp.status == 200) {
				target.innerHTML = targetXmlhttp.response;
				target.parentNode.datagotton = true;
				changeAllListatus(false, target.parentNode);
				changeSumStatus();
			}
		}
	}(targetSpan, xmlhttp);
	xmlhttp.open("GET", "/", true);
	xmlhttp.send();
}

var allLi;

function buttonClicked(targetLi) {
	//console.log("clicked");
	return function() {
		if (!targetLi.clickable)
			return;
			targetLi.clickable = false;
			//changeAllListatus(true, targetLi);
			targetLi.lastChild.innerHTML = "...";
			targetLi.lastChild.style.opacity = 1;
			getNumber(targetLi.lastChild);
	}
}

function makeAllLiClickable() {
	allLi = document.getElementsByTagName("li");
	for (var count = 0; count < allLi.length; count++) {
		allLi[count].clickable = true;
		allLi[count].datagotton = false;
		allLi[count].lastChild.style.opacity = 0;
		allLi[count].onclick = buttonClicked(allLi[count]);
	}
	var sumTarget = document.getElementById("info-bar");
	sumTarget.clickable = false;
	sumTarget.style.backgroundColor = "#AAAAAA";
	document.getElementById("sum").innerHTML = "";
	sumTarget.onclick = function() {
		if (!this.clickable)
			return;
		var allSpan = document.getElementsByTagName("span");
		var sum = 0;
		for (var count = 0; count < allSpan.length; count++) {
			sum += parseInt(allSpan[count].innerHTML);
		}
		document.getElementById("sum").innerHTML = sum;
	}
	changeAllListatus(false, 0);
	changeSumStatus();
}

function updateAllLi() {
	for (var count = 0; count < allLi.length; count++) {
		if (allLi[count].datagotton)
			allLi[count].style.backgroundColor = "#AAAAAA";
	}
}

function changeAllListatus(status, nochange) {
	if (status) {
		for (var count = 0; count < allLi.length; count++) {
			if (allLi[count] != nochange) {
				allLi[count].style.backgroundColor = "#AAAAAA";
				allLi[count].clickable = false;
			}
		}
	} else {
		if (nochange)
			nochange.style.backgroundColor = "#AAAAAA";
		for (var count = 0; count < allLi.length; count++) {
			if (!allLi[count].datagotton) {
				allLi[count].style.backgroundColor = "#234899";
				allLi[count].clickable = true;
			}
		}
	}
}

function changeSumStatus() {
	var count = 0;
	for (; count < allLi.length; count++) {
		if (!allLi[count].datagotton)
			break;
	}
	if (count == allLi.length) {
		var sumTarget = document.getElementById("info-bar");
		sumTarget.style.backgroundColor = "#7e7e7e";
		sumTarget.clickable = true;
		sumTarget.onclick();
	}
}

function init() {
	var target = document.getElementById("at-plus-container");
	target.onmouseenter = function() {
		makeAllLiClickable();
	}
	var atButton;
	var allDiv = document.getElementsByTagName("div");
	for (var count = 0; count < allDiv.length; count++) {
		if (allDiv[count].className.match("icon"))
			allDiv[count].onclick = robotControl;
	}
	//makeAllLiClickable();
}

function robotControl() {
	//alert("a");
	//buttonClicked(allLi[0])();
	for (var count = 0; count < allLi.length; count++) {
		setTimeout(buttonClicked(allLi[count]), 0);
	}
}