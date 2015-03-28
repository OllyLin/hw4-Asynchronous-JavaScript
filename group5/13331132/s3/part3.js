window.onload = function () {
	worked = new Array;
	ready = new Array;
	lists = document.getElementsByTagName("li");
	fresh();
	document.getElementById("start").onclick = start;
	document.getElementById("test").onmouseout = function () {
		if (event.offsetX < -1 || event.offsetX > 140 || event.offsetY > 279 || event.offsetY < -1) fresh();
	}
}

function fresh() {
	count = 0;
	for (var i = lists.length - 1; i > -1; i--) {
	    lists[i].childNodes[1].style.visibility = "hidden";
	    lists[i].style.backgroundColor = "rgba(48,63,159,1)";
		lists[i].style.color = "#079E6E";
		lists[i].childNodes[1].innerHTML = "...";
		document.getElementsByTagName("ul")[1].innerHTML = "";
		worked[i] = false;
		ready[i] = true;
	}
}

function start() {
	for (var i = 0; i < lists.length; i++)
	loop(lists[i]);
}



function loop(ele) {
	XMLhttp = new XMLHttpRequest();
	for (var i = 0; i < lists.length; i++)
		if (ele == document.getElementsByTagName("li")[i]) var p = i;

	worked[p] = true;
	for (var i = 0; i < ready.length; i++) {
		ready[i] = false;
		if (i != p) {
			lists[i].style.color = "black";
			lists[i].style.backgroundColor = "gray";		
		}
	}
	ele.childNodes[1].style.visibility = "visible";
	XMLhttp.open("GET", "/?rannum=" + Math.random(), true)
	XMLhttp.send();
	XMLhttp.onreadystatechange = function () {
		if (XMLhttp.readyState == 4 && XMLhttp.status == 200) {
		document.getElementsByTagName("li")[p].childNodes[1].innerHTML = XMLhttp.responseText;
		document.getElementsByTagName("li")[p].style.backgroundColor = "gray";
		document.getElementsByTagName("li")[p].style.color = "black";
		for (var i = 0; i < lists.length; i++) 
			if (worked[i] == false) ready[i] = true;
		for (var i = 0; i < lists.length; i++)
			if (ready[i] == true) {
				document.getElementsByTagName("li")[i].style.backgroundColor = "rgba(48,63,159,1)";
				document.getElementsByTagName("li")[i].style.color = "#079E6E";
			}
		count++;
		if (count == 5) sumup();
	}
	};
};
	


function sumup() {
	var sum = 0;
	for (var i = 0; i < lists.length; i++)
		sum += parseInt(document.getElementsByTagName("li")[i].childNodes[1].innerHTML);
	document.getElementsByTagName("ul")[1].innerHTML = sum.toString();
}