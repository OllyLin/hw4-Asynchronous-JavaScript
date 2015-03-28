window.onload = function() {
	var all = document.getElementById("bottom-positioner");
	all.onmouseenter = function() {
		setTimeout(addNumbers_sequence, 800);
	}
}


function addNumbers_sequence() {
	var bts = getButtons();
	var count = 0;
	initialization(bts);

	addNumbers(bts[0]);

	function addNumbers(obj) {
		// 判断是否可以得出结果
		getResult(count);

		// 所有按钮都获取到随机数后终止
		if (count == 5) return;

		inactivation(obj);
		obj.getElementsByTagName("span")[0].style.display = "block";

		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "/", true);
		xmlhttp.send(null);

		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				obj.getElementsByTagName("span")[0].innerHTML = xmlhttp.responseText;
				activation(obj);
				count++;
				// 下一个按钮获取随机数
				addNumbers(obj.nextElementSibling||obj.nextSibling);
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
	console.log("init");
	for (var i = 0; i < bts.length; i++) {
		bts[i].canClick = true;
		bts[i].style.backgroundColor = "#2D3AA4";
		bts[i].getElementsByTagName("span")[0].style.display = "none";
		bts[i].getElementsByTagName("span")[0].innerHTML = "...";
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
	// 所有按钮都得到随机数之前不能显示结果
	if (count != 5) return;

	var bts = getButtons();
	var plus = getDivByClassName("info").getElementsByTagName("span")[0];
	var result = 0;

	for (var i = 0; i < bts.length; i++) {
		result += (bts[i].getElementsByTagName("span")[0].innerHTML - 0);
	}

	plus.innerHTML = result.toString();
}