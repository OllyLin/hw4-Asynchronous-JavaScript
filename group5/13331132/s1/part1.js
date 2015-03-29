window.onload = function () {
	worked = new Array;
	ready = new Array;
	lists = document.getElementsByTagName("li");
	start();
	document.getElementById("test").onmouseout = function () {
		if (event.offsetX < -1 || event.offsetX > 140 || event.offsetY > 279 || event.offsetY < -1) start();
	}
}

function start() {
	count = 0;
	for (var i = 0; i < lists.length; i++) {
	    lists[i].onclick = action;
	    lists[i].childNodes[1].style.visibility = "hidden";
	    lists[i].style.backgroundColor = "rgba(48,63,159,1)";
		lists[i].style.color = "#079E6E";
		lists[i].childNodes[1].innerHTML = "...";
		document.getElementsByTagName("ul")[1].innerHTML = "";
		worked[i] = false;
		ready[i] = true;
		document.getElementById("sumup").onclick = function () {}
	}

}


function action() {
	for (var i = 0; i < lists.length; i++)
		if (this == document.getElementsByTagName("li")[i]) var p = i;
	if (worked[p] == true || ready[p] == false) return;
	worked[p] = true;
	for (var i = 0; i < worked.length; i++)
		if (worked[i] == true) {
			count++;
			break;
		}
	for (var i = 0; i < worked.length; i++) {
		ready[i] = false;
		if (i != p) {
			lists[i].style.color = "black";
			lists[i].style.backgroundColor = "gray";		
		}
	}
	XMLhttp = new XMLHttpRequest();
	XMLhttp.open("GET", "/", true)
	XMLhttp.send();
	XMLhttp.onreadystatechange = function () {
		if (XMLhttp.readyState == 4 && XMLhttp.status == 200) document.getElementsByTagName("li")[p].childNodes[1].innerHTML = XMLhttp.responseText;
		document.getElementsByTagName("li")[p].style.backgroundColor = "gray";
		document.getElementsByTagName("li")[p].style.color = "black";
		for (var i = 0; i < lists.length; i++) 
			if (worked[i] == false) ready[i] = true;
		for (var i = 0; i < lists.length; i++)
			if (ready[i] == true) {
				document.getElementsByTagName("li")[i].style.backgroundColor = "rgba(48,63,159,1)";
				document.getElementsByTagName("li")[i].style.color = "#079E6E";
			}
	if (count == worked.length) document.getElementById("sumup").onclick = sumup;		
	}
	
	this.childNodes[1].style.visibility = "visible";

}

function sumup() {
	var sum = 0;
	for (var i = 0; i < lists.length; i++)
		sum += parseInt(document.getElementsByTagName("li")[i].childNodes[1].innerHTML);
	this.childNodes[1].innerHTML = sum.toString();
}