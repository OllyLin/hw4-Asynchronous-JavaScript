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
	DeleteClass(elem, "enable");
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
	if (flag == true)
		AddClass(document.getElementById('info-bar'), 'enable');
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