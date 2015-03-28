

window.onload = function() {
	var li = document.getElementsByTagName("li");
	for (var i = 1; i < li.length; i++)
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
	}
	var start = document.getElementById("at-plus-container");
	start.onclick = function() {
		li[0].onclick = function(event) {
			disableLi(li[0]);
			clearSpan(li[0]);
			liOnchick(li[0]);
		}();
	}
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
}

function clearSpan(that) {
	if (that.childNodes.length == 2)
		that.removeChild(that.childNodes[1]);
}

function liOnchick(that) {
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
				if (that.nextElementSibling)
					that.nextElementSibling.onclick();
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
