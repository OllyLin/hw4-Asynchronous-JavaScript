window.onload = function() {
	var greys = document.getElementsByTagName("li");
	for (var i = 0; i < greys.length; i++) {
		greys[i].onclick = handleHover;//addEventListener("onclick", handleHover);
		setUnvisibleStyle(greys[i].getElementsByClassName("unread")[0]);
		greys[i].getElementsByClassName("unread")[0].innerHTML = "";
	}
	var big = document.getElementById("info-bar");
	big.innerHTML = "";
	big.onclick = function(){};
	var button = document.getElementById("at-plus-container");
	button.onmouseleave = init;
};

function init() {
	var greys = document.getElementsByTagName("li");
	for (var i = 0; i < greys.length; i++) {
		greys[i].onclick = handleHover;//addEventListener("onclick", handleHover);
		setUnvisibleStyle(greys[i].getElementsByClassName("unread")[0]);
		greys[i].getElementsByClassName("unread")[0].innerHTML = "";
	}
	var big = document.getElementById("info-bar");
	big.innerHTML = "";
	big.onclick = function(){};
}

function getRan(container, grey) {
	var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }

xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    container.innerHTML=xmlhttp.responseText;
    var greys = document.getElementsByTagName("li");
	for (var i = 0; i < greys.length; i++) {
		enable(greys[i]);
	}
	if (checkAll(greys)) {
		var big = document.getElementById("info-bar");
		enableBig();
	}
	disable(grey);
    }
}
xmlhttp.open("GET","/",true);
xmlhttp.send();
}

//
function disableBig(big) {
	big.onclick = function(){};
}

//
function enableBig() {
	var big = document.getElementById("info-bar");
	big.onclick = handleBig;
}

function handleBig(){
	this.innerHTML = "<div id = 'center'>" + sum() + "</div>";
	disableBig(this);
}

function checkAll(greys) {
	for (var i = 0; i < greys.length; i++) {
		if (greys[i].getElementsByClassName("unread")[0].innerHTML == "" || greys[i].getElementsByClassName("unread")[0].innerHTML == "。。。") {
			return false;
		}
	}
	return true;
}

function sum() {
	var sum = 0;
	var reds = document.getElementsByClassName("unread");
	for (var i = 0; i < reds.length; i++) {
		sum += Number(reds[i].innerHTML);
	}
	return sum;
}

//
function disable(grey) {
	grey.onclick = function () {};
}

//enable greys by adding their listener
//set them to active style by calling inActive(grey) 
function enable(grey) {
	grey.onclick = handleHover;
}

//when a grey is hovered, follow these steps:
//1.disable other greys
//2.change grey's red to waiting style
//3.send request to server to get random
//4.set ran in red
//5.disable grey
function handleHover() {
	var red = this.getElementsByClassName("unread")[0];
	setvisibleStyle(red);
	getRan(red, this);
	setWaitingStyle(red);
	var greys = document.getElementsByTagName("li");
	for (var i = 0; i < greys.length; i++) {
		disable(greys[i]);
	}
	enable(this);
}

//functions used to set styles
function setWaitingStyle(red) {
	red.innerHTML = "。。。";
}

function setUnvisibleStyle(red) {
	red.style.display = "none";
}

function setvisibleStyle(red) {
	red.style.display = "";
}












