//button mouseover -> robot1
//robot1 -> handle abcde
//		 -> inactive button
//




var greys;

window.onload = function() {
	var button = document.getElementById("info-bar");
	var b = document.getElementById("bottom-positioner");
	b.addEventListener("click", robot1);
	greys = document.getElementsByTagName("li");
	for (var i = 0; i < greys.length; i++) {
		enable(greys[i]);
		setUnvisibleStyle(greys[i].getElementsByClassName("unread")[0]);
		greys[i].getElementsByClassName("unread")[0].innerHTML = "";
	}
};

function robot1 () {
	handleHover(0);
}

function getRan(container, grey, num, f) {
	var xmlhttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp=new XMLHttpRequest();
  	}

	xmlhttp.onreadystatechange=function() {
 		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
    		container.innerHTML=xmlhttp.responseText;
    		disable(greys[num]);
			for (var i = 0; i < greys.length; i++) {
				if (i != num) {enable(greys[i]);}
			}
			if (checkAll(greys)) {
				var big = document.getElementById("info-bar");
				enableBig();
			}
			num = num + 1;
			f(num);
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
	handleBig(big);
}

function handleBig(big){
	big.innerHTML = "<div id = 'center'>" + sum() + "</div>";
	disableBig(big);
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
	grey.style.backgroundColor = "grey";
}

//enable greys by adding their listener
//set them to active style by calling inActive(grey) 
function enable(grey) {
	grey.onclick = handleHover;
	grey.style.backgroundColor = "blue";
}

//when a grey is hovered, follow these steps:
//1.disable other greys
//2.change grey's red to waiting style
//3.send request to server to get random
//4.set ran in red
//5.disable grey
function handleHover(num) {
	if (num == 5) return;
	var red = greys[num].getElementsByClassName("unread")[0];
	setvisibleStyle(red);
	getRan(red, greys[num], num, handleHover);
	setWaitingStyle(red);
	for (var i = 0; i < greys.length; i++) {
		if (i != num) {disable(greys[i]);}
	}
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












