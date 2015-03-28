// 其实s3用不了...
window.onload = function() {
	var all = document.getElementById("bottom-positioner");
	all.onmouseenter = function() {
		addNumbers_together();
	}
}


function addNumbers_together() {
	var bts = getButtons();
	var count = 0;
	initialization(bts);

	for (var i = 0; i < bts.length; i++) {
		addNumbers(bts[i]);
	}

	function addNumbers(obj) {
		var index = getIndex(obj);

		inactivation(obj);
		obj.getElementsByTagName("span")[0].style.display = "block";

		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "/" + index.toString(), true);
		xmlhttp.send(null);

		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				count++;
				console.log("count: "+count);
				console.log(index+" : "+xmlhttp.responseText);
				setButton(obj, xmlhttp.responseText, count, getResult);
			};
		}
	}
}


function getButtons() {
	return document.getElementsByTagName("li");
}


function getDivByClassName(clName) {
	var divs = document.getElementsByTagName("div");

	for (var i = 0; i < divs.length; i++) {
		if (divs[i].className == clName) {
			return divs[i];
		}
	}
}


function initialization(bts) {
	for (var i = 0; i < bts.length; i++) {
		bts[i].canClick = true;
		bts[i].style.backgroundColor = "#2D3AA4";
		bts[i].getElementsByTagName("span")[0].style.display = "none";
	}
	getDivByClassName("info").getElementsByTagName("span")[0].innerHTML = "";
}


function inactivation(obj) {
	var bts = getButtons();

	for(var i = 0; i < bts.length; i++) {
		if (obj != bts[i]) {
			bts[i].canClick = false;
			bts[i].style.backgroundColor = "#7E7E7E";
		}
	}
}


function activation(obj) {
	var bts = getButtons();

	for(var i = 0; i < bts.length; i++) {
		if (bts[i].getElementsByTagName("span")[0].style.display != "block") {
			bts[i].canClick = true;
			bts[i].style.backgroundColor = "#2D3AA4";
		}
	}

	obj.canClick = false;
	obj.style.backgroundColor = "#7E7E7E";

}


function getResult(count) {

	console.log("enter");

	var bts = getButtons();
	var plus = getDivByClassName("info").getElementsByTagName("span")[0];
	var result = 0;

	for (var i = 0; i < bts.length; i++) {
		console.log(bts[i].getElementsByTagName("span")[0].innerHTML - 0);
		result += (bts[i].getElementsByTagName("span")[0].innerHTML - 0) || 0;
	}

	plus.innerHTML = result.toString();
}


function setButton(obj, num, count, getResult) {
	console.log("set");

	obj.getElementsByTagName("span")[0].innerHTML = num.toString();
	activation(obj);

	getResult(count);
}

function getIndex(obj) {
	var bts = getButtons();

	for (var i = 0; i < bts.length; i++) {
		if (obj == bts[i]) return i;
	}
}