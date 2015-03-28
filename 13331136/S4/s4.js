window.onload = function() {
	var all = document.getElementById("bottom-positioner");
	all.onmouseenter = function() {
		setTimeout(addNumbers_random, 800);
	}
}


function addNumbers_random() {
	var bts = getButtons();
	var count = 0;
	var randomBts = getRandomArray(bts);   // 将bts的顺序打乱（随机数组）

	initialization(bts);

	addNumbers(randomBts[0]);

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
				addNumbers(randomBts[count]);
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


// 将arr数组的顺序打乱
function getRandomArray(arr){
	var l = arr.length;
	var arr1 = new Array();
	var arr2 = new Array();
	for(var i = 0;i < l; i++){
		arr1[i] = i;
	}

	for(var i = 0;i < l; i++){
		arr2[i] = arr1.splice(Math.floor(Math.random() * arr1.length),1);
	}

	var arr3 = new Array();
	for(var i = 0; i < l; i++){
		arr3[i] = arr[arr2[i]];
	}
	return arr3;
}