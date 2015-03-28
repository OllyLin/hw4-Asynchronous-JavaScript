// disabled函数，使按钮变为无效
var disabled = function(array) {
	if (Array.isArray(array)) {
		for (var i = array.length - 1; i >= 0; i--) {
			array[i].classList.remove("enable");
			array[i].classList.add("disabled");
		}
	} else {
		array.classList.remove('enable');
		array.classList.add("disabled");
	}
};

// enable函数，使按钮变为有效++
var enable = function(array) {
	if (Array.isArray(array)) {
		for (var i = array.length - 1; i >= 0; i--) {
			if (array[i].children[1].innerHTML == '...') {
				array[i].classList.remove('disabled');
			}
		}
	} else {
		array.classList.remove("disabled");
		array.classList.add('enable');
	}
};

//refer by baidu
var shuffle = function(array) {
	for (var i, j, k = array.length; k > 0; k--) {
		i = parseInt(Math.random() * k);
		j = array[i];
		array[i] = array[k - 1];
		array[k - 1] = j;
	}
}

var isAllClick = function(array) {
	return (array[0].children[1].innerHTML !== '...' &&
		array[1].children[1].innerHTML !== '...' &&
		array[2].children[1].innerHTML !== '...' &&
		array[3].children[1].innerHTML !== '...' &&
		array[4].children[1].innerHTML !== '...');
};

// convert to letter
var convertToLetter = function(array, newarray) {
	if (array == 0) array = 'A';
	else if (array == 1) array = 'B';
	else if (array == 2) array = 'C';
	else if (array == 3) array = 'D';
	else array = 'E';

	return array;
}

window.onload = function () {
	var container = document.getElementById("button");
	var apb = document.getElementsByClassName("apb")[0];
	var btns = document.getElementsByClassName("button");
	var info = document.getElementById("info-bar");
	disabled(info);


	// s4 添加一个随机数组，并且自写一个shuffle函数
	var randomList = [0,1,2,3,4];
	shuffle(randomList);
	var toLetter = [];

	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsot.XMLHTTP");
	}

	// calculate the sum
	info.addEventListener("click", function(event) {
		var that = event.target;
		if (that.classList.contains('enable')) {
			var res = 0;
			for (var i = btns.length - 1; i >= 0; i--) {
				res += Number(btns[i].children[1].innerHTML);
			}
			for (var j = 0; j < toLetter.length; j++) {
				toLetter[j] = convertToLetter(toLetter[j]);
			}
			that.innerHTML = res + '<br>' + toLetter.join("");
		}
	})

	// reset
	container.addEventListener('mouseout', function(event) {
		var target = event.relatedTarget ? event.relatedTarget : event.toElement;
		while (target && target != this) {
			target = target.parentNode;
		}
		if (target != this) {
			for (var i = btns.length - 1; i >= 0; i--) {
				btns[i].children[1].classList.add('unseen');
				btns[i].children[1].innerHTML = "...";
				info.innerHTML = "";
				xmlhttp.abort();
				enable(btns[i]);
			}
			disabled(info);
			randomList = [0,1,2,3,4];
			shuffle(randomList);
			toLetter = [];
		}
	})

	// handler for click button
	for (var i = 0; i < btns.length; i++) {
		btns[i].addEventListener("click", function(i) {
			var autoclick = function(event) {
				var that = this;
				if (!that.classList.contains('disabled')) {
					var tmparr = [];
					for (var j = btns.length - 1; j >= 0; j--) {
						if (btns[j].children[0].innerHTML !== that.children[0].innerHTML) {
							tmparr.push(btns[j]);
						}
					}
					disabled(tmparr);
					var smallIcon = that.getElementsByTagName("span")[0];
					smallIcon.innerHTML = "...";
					smallIcon.classList.remove("unseen");

					xmlhttp.onreadystatechange = function() {
						if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
							smallIcon.innerHTML = xmlhttp.responseText;
							enable(tmparr);
							disabled(that);
							if (isAllClick(btns)) {
								enable(info);
								// 自动点击
								info.click();
							} else {
								toLetter.push(randomList[0]);
								btns[randomList.shift()].click();
							}
						}
					}
					xmlhttp.open("GET", "/", true);
					xmlhttp.send();
				}
			}
			return autoclick;
		}(i));
	}

	//s2 仿真机器人
	//通过click之后，自动模拟btns[i].click
	apb.addEventListener('click', function(event) {
		// array.shift(),删除首元素并且返回被删除的元素
		toLetter.push(randomList[0]);
		btns[randomList.shift()].click();
	})

};