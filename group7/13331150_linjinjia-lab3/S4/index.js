

window.onload = function() {
	var li = document.getElementsByTagName("li");
	for (var i = 0; i < li.length; i++)
		li[i].onclick = function(event) {
			disableLi(this);
			clearSpan(this);
			liOnchick(this);
		}
	var total = document.getElementById("total");
	total.parentNode.onclick = function(event) {
		if (finished())
			count();
	}
	var main = document.getElementById("bottom-positioner");
	main.onmouseleave = function(event) {
		clearAll();
		for (var i = 0; i < li.length; i++)
		li[i].onclick = function(event) {
			disableLi(this);
			clearSpan(this);
			liOnchick(this);
		}
		array = new Array;
		for (var i = 0; i < 5; i++)
			array[i] = i;
		array.sort(function() {
			return 0.5 - Math.random();
		});
		now = 0;
	}
	array = new Array();
	for (var i = 0; i < 5; i++)
		array[i] = i;
	array.sort(function() {
		return 0.5 - Math.random();
	});
	now = 0;
	var start = document.getElementById("at-plus-container");
	start.onclick = function() {
		show();
		li[array[now]].onclick = function(event) {
			disableLi(li[array[now]]);
			clearSpan(li[array[now]]);
			liOnchick(li[array[now]]);
		}();
	}
}

function show() {
	var str = "";
	for (var i = 0; i < array.length; i++) {
		if (array[i] == 0) str += "A";
		if (array[i] == 1) str += "B";
		if (array[i] == 2) str += "C";
		if (array[i] == 3) str += "D";
		if (array[i] == 4) str += "E";
	}
	var p = document.createElement("p");
	p.innerText = str;
	p.id = "order";
	p.style.color = "rgb(50, 219, 160)";
	p.style.textAlign = "center";
	p.style.position = "absolute";
	p.style.left = "2.5em";
	p.style.top = "5em";
	document.getElementById("info-bar").appendChild(p);
}

function disableLi(that) {
	var li = document.getElementsByTagName("li");
	for (var i = 0; i < li.length; i++)
		if (li[i] != that)
			li[i].style.backgroundColor = "grey";
}

function enableLi() {
	var li = document.getElementsByTagName("li");
	for (var i = 0; i < li.length; i++)
		li[i].style.backgroundColor = "rgb(33, 75, 162)";
}

function clearAll() {
	var li = document.getElementsByTagName("li");
	for (var i = 0; i < li.length; i++)
		clearSpan(li[i]);
	var total = document.getElementById("total");
	total.innerText = "";
	var order = document.getElementById("order");
	if (order)
		document.getElementById("info-bar").removeChild(order);
}

function clearSpan(that) {
	if (that.childNodes.length == 2)
		that.removeChild(that.childNodes[1]);
}

function liOnchick(that) {
	var li = document.getElementsByTagName("li");
	var span = document.createElement("span");
	span.classList.add("unread");
	span.innerText = "...";
	that.appendChild(span);
	var request = new XMLHttpRequest();
	request.open("GET", "/", true);
	request.onreadystatechange = function() {
		if (request.readyState == 4)
			if (request.status == 200) {
				span.innerText = request.responseText;
				enableLi();
				if (now < 4) {
					now++;
					li[array[now]].onclick();
				}
				else
					document.getElementById("total").parentNode.onclick();
			}
	}
	request.send(null);
}

function finished() {
	var li = document.getElementsByTagName("li");
	for (var i = 0; i < li.length; i++)
		if (li[i].childNodes.length != 2)
			return false;
	return true;
}

function count() {
	var num = document.getElementsByTagName("span");
	var sum = 0;
	for (var i = 0; i < num.length; i++)
		sum += parseInt(num[i].innerText);
	var total = document.getElementById("total");
	total.innerText = sum.toString();
}
