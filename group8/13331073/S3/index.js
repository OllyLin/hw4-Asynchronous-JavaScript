var isclick = [false, false, false, false, false];
var new_click = [false, false, false, false, false];
var info_bar_isclick = false;
var UpperChar = document.getElementsByTagName("li");

function getRandomNumber() {
	if(isclick[this.number]) {
		return;
	}
	isclick[this.number] = true;
    for(var i = 0; i < 5; i++) {
    	new_click[i] = false;
    }
    new_click[this.number] = true;
    for(var i = 0; i < 5; i++) {
    	if(!new_click[i]) {
    		document.getElementsByTagName("li")[i].style.backgroundColor = "gray";
    	} else {
    		document.getElementsByTagName("li")[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
    	}
    }
    var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	var span_id = "number_" + this.number;
	var small_ring = document.getElementById(span_id);
	small_ring.style.backgroundColor = "rgba(255, 0, 0, 1)";
    small_ring.innerHTML = "...";
    xmlhttp.onreadystatechange = function() {
	    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		    document.getElementById(span_id).innerHTML = xmlhttp.responseText;
		    info_bar_isclick = true;
			    for(var i = 0; i < 5; i++) {
				    if(!isclick[i]) {
                        document.getElementsByTagName("li")[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
					    info_bar_isclick = false;
				    } else {
                        document.getElementsByTagName("li")[i].style.backgroundColor = "gray";
				    }
			    }
			    if(info_bar_isclick) {
				    document.getElementById("info-bar").style.backgroundColor = "rgba(48, 63, 159, 1)";
			    }
	    }
	}
    xmlhttp.open("GET", "/" + this.number, true);
	xmlhttp.send();
}

function Add() {
	return parseInt(document.getElementById("number_0").innerHTML) +
	       parseInt(document.getElementById("number_1").innerHTML) +
	       parseInt(document.getElementById("number_2").innerHTML) +
	       parseInt(document.getElementById("number_3").innerHTML) +
	       parseInt(document.getElementById("number_4").innerHTML);
}

function info_click() {
	if(!info_bar_isclick) {
        return;
	}
    this.innerHTML = Add();
    this.style.backgroundColor = "gray";
    info_bar_isclick = false;
}

function getRandomNumberFromServer() {
	var controlRing = document.getElementById("control-ring");
	var ring = controlRing.getElementsByTagName("li");
	var plus = document.getElementById("at_plus");
	plus.onmouseover = function() {
		init();
	}
	plus.onmouseout = function() {
		init();
	}
	document.getElementById("info-bar").onclick = info_click;
	for(var i = 0; i < ring.length; i++) {
		ring[i].number = i;
		ring[i].onclick = getRandomNumber;
	}
}

function init() {
    for(var i = 0; i < 5; i++) {
		var rings_number = "number_" + i;
		isclick[i] = false;
		var small_ring = document.getElementById(rings_number);
		small_ring.innerHTML = null;
        small_ring.style.backgroundColor = "rgba(255, 0, 0, 0)";
        document.getElementsByTagName("li")[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
        document.getElementById("info-bar").style.backgroundColor = "gray";
	}
    document.getElementById("info-bar").innerHTML = null;
	info_bar_isclick = false;
}

window.onload = function() {
	getRandomNumberFromServer();
	document.getElementById("at_plus").onclick = hehe;
}

function hehe() {
    for(var i = 0; i < 5; i++) {
    	document.getElementsByTagName("li")[i].click();
    }
    setTimeout(info_bar_click, 3000);
}

function info_bar_click() {
	document.getElementById("info-bar").click();
}