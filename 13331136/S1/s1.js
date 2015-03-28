window.onload = function() {
	var all = document.getElementById("bottom-positioner");
	all.onmouseenter = function() {
		addNumbers()
	}
}


function addNumbers() {
	var bts = getButtons();     // 存放按钮对象
	var count = 0;              // 存放已经点击的按钮的数目

	// 初始化按钮
	initialization(bts);

	for (var i = 0; i < bts.length; i++) {
		// 鼠标点击按钮
		bts[i].onclick = function() {
			// 已经被禁用的按钮不能点击
			if (this.canClick == false) return;

			var that = this;

			// 灭活其他按钮
			inactivation(this);
			// 显示红色小圆圈
			this.getElementsByTagName("span")[0].style.display = "block";

			// 获取随机数
			xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", "/", true);
			xmlhttp.send(null);

			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4) {
					that.getElementsByTagName("span")[0].innerHTML = xmlhttp.responseText;
					activation(that);
					count++;
					getResult(count);
				};
			}
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
	console.log("initialization");
	for (var i = 0; i < bts.length; i++) {
		// 给每个按钮添加一个canClick属性，表示当前按钮是否可以点击
		bts[i].canClick = true;
		bts[i].style.backgroundColor = "#2D3AA4";
		bts[i].getElementsByTagName("span")[0].style.display = "...";
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

// 点击中间的@+进行加法得出结果
function getResult(count) {
	// 判断是否所有按钮都已经的到随机数
	if (count != 5) return;

	var plus = getDivByClassName("icon");
	var bts = getButtons();
	var result = 0;                            // 存放求和结果

	// 求和
	for (var i = 0; i < bts.length; i++) {
		result += (bts[i].getElementsByTagName("span")[0].innerHTML - 0);
	}

	// 点击@+显示结果
	plus.onclick = function() {
		var plus = getDivByClassName("info").getElementsByTagName("span")[0];
		plus.innerHTML = result.toString();
	}
}