function changeBackground(liPos, index, status) {
	if (status == 0) {
		for (var i = 0; i < liPos.length; i++) {
			if (i == index) {
				liPos[i].style.backgroundColor = "blue";
			} else {
				liPos[i].style.backgroundColor = "gray";
			}
		}
	} else if (status == 1) {
		for (var i = 0; i < liPos.length; i++) {
			if (i == index) {
				liPos[i].style.backgroundColor = "gray";
			} else {
				liPos[i].style.backgroundColor = "blue";
			}
		}
	}
}

function ajax(url, successfunction, failfunction) {
	var oAjax;
	// 创建Ajax对象
	if (window.XMLHttpRequest) {
		oAjax = new XMLHttpRequest();
	} else {
		oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	// 连接服务器
	oAjax.open("GET", url, true);
	// 发送请求
	oAjax.send();
	// 接受返回
	oAjax.onreadystatechange = function () {
		if (oAjax.readyState == 4 && oAjax.status == 200) {
			successfunction(oAjax.responseText);
		} else {
			// failfunction();
		}
	}
}

window.onload = function () {
	var liPos      = document.getElementById("control-ring").getElementsByTagName("li");
	var spanPos    = document.getElementById("control-ring").getElementsByTagName("span");
	var oSum     = document.getElementById("info-bar").getElementsByTagName("div")[0];
	var sequence = document.getElementById("sequence");
	var times = 0;
	
	var extendPos = document.getElementById("extend");
	var buttonPos = document.getElementById("button");
	var flag;
	var ButtonModel = 0;

	// 生成随机序列
	var list = new Array();
	var hadused = new Array();
	var reflect = new Array("A", "B", "C", "D", "E");

	// 初始状态
	changeBackground(liPos, liPos.length+1, 1);

	for (var i = 0; i < liPos.length; i++) {
		liPos[i].onmouseover = function () {
			flag = 1;
		}

		liPos[i].onmouseout = function () {
			flag = 0;
		}
	}
	oSum.onmouseover = function () {
		flag = 1;
	}
	oSum.onmouseout = function () {
		flag = 0;
	}
	buttonPos.onmouseover = function () {
		flag = 1;
	}
	buttonPos.onmouseout = function () {
		flag = 0;
	}

	extendPos.onmouseout = function() {
		setTimeout(function () {
			if (flag == 1) return;
			// reset
			for (var i = 0; i < spanPos.length; i++) {
				spanPos[i].style.display = "none";
			}
			changeBackground(liPos, liPos.length+1, 1);
			oSum.style.backgroundColor = "gray";
			oSum.innerHTML = "";
			times = 0;
			sequence.style.display = "none";
			sequence.innerHTML = '';
		}, 0);
	}

	oSum.onclick = function (ev) {
		var oEvent = ev || event;
		if (oSum.style.backgroundColor != "blue") {
			oEvent.cancelBubble = true;
			return;
		}
		var sum = 0;
		for (var i = 0; i < spanPos.length; i++) {
			sum = sum + Number(spanPos[i].innerHTML);
		}
		oSum.innerHTML = sum;
		oSum.style.backgroundColor = "gray";
		changeBackground(liPos, liPos.length+1, 1);
		oEvent.cancelBubble = true;
	};


	for (var i = 0; i < liPos.length; i++) {
		liPos[i].clicked = 0;
		liPos[i].onclick = function(i) {
			return function (ev) {
				sequence.innerHTML += " " + reflect[i];
				var oEvent = ev || event;

				if (this.style.backgroundColor == "gray") return;

				if (this.clicked == 0) times++;
				// if (spanPos[i].innerHTML == "") times++;
				// alert(times);
				
				changeBackground(liPos, i, 0);
				spanPos[i].style.display = "block";
				spanPos[i].innerHTML = "...";

				// 
				ajax("http://localhost:3000", function(returnNum) {
					changeBackground(liPos, i, 1);
					spanPos[i].innerHTML = returnNum;
					if (times == liPos.length)
						oSum.style.backgroundColor = "blue";
					if (ButtonModel == 1) {

						list.hasclick++;
						// alert(list.hasclick);
						if (list.hasclick != list.length) {
							setTimeout(function() {
								liPos[list[list.hasclick]].onclick();
							},0);
						} else {
							setTimeout(function() {
								oSum.onclick();
							},0);
							ButtonModel = 0;
						}
					}
				}, function () {
					// function for fail state
				});
				oEvent.cancelBubble = true;
			}
		}(i);
	}

	
	buttonPos.onclick = function () {
		var temp;
		ButtonModel = 1;
		list.hasclick = 0;
		times = 0;
		oSum.innerHTML = "";
		for (var i = 0; i < liPos.length; i++) {
			hadused[i] = false;
		}
		for (var i = 0; i < liPos.length; i++) {
			while (true) {
				temp = Math.floor(Math.random() * 100) % liPos.length;
				if (!!hadused[temp]) continue;
				else {
					hadused[temp] = true;
					list[i] = temp;
					console.log(temp);
					break;
				}
			}
		}
		sequence.style.display = "block";
		sequence.innerHTML = "";

		setTimeout(function() {
			liPos[list[0]].onclick();
		},0);

	};
}
