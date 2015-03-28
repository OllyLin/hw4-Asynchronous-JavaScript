

function changeColor(liPos, index, status) {
	if (status == false) {
		for (var i = 0; i < liPos.length; i++) {
			liPos[i].style.backgroundColor = "gray";
		}
		liPos[index].style.backgroundColor = "blue";
	} else if (status == true) {
		for (var i = 0; i < liPos.length; i++) {
			liPos[i].style.backgroundColor = "blue";
		}
		liPos[index].style.backgroundColor = "gray";
	}
}

function getNum(url, successfunction, failfunction) {
	var XHR;
	XHR = new XMLHttpRequest();
	XHR.open("GET", url, true);
	XHR.send();
	XHR.onreadystatechange = function () {
		if (XHR.readyState == 4 && XHR.status == 200)
			successfunction(XHR.responseText);
	}
}

window.onload = function () {
	var liPos      = document.getElementById("control-ring").getElementsByTagName("li");
	var spanPos    = document.getElementById("control-ring").getElementsByTagName("span");
	var sumPos     = document.getElementById("info-bar").getElementsByTagName("div")[0];
	var times = 0;
	
	var extendPos = document.getElementById("extend");
	var buttonPos = document.getElementById("button");
	var flag;
	for (var i = 0; i < liPos.length; i++) {
		liPos[i].onmouseover = function () {
			flag = 1;
		}

		liPos[i].onmouseout = function () {
			flag = 0;
		}
	}
	sumPos.onmouseover = function () {
		flag = 1;
	}
	sumPos.onmouseout = function () {
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
			changeColor(liPos, liPos.length+1, true);
			sumPos.style.backgroundColor = "gray";
			sumPos.innerHTML = "";
			times = 0;
		}, 0);
	}



	for (var i = 0; i < liPos.length; i++) {
		// liPos[i].clicked = 0;
		liPos[i].onclick = function(i) {
			return function () {
				if (this.style.backgroundColor == "gray") return;
				// 改变背景颜色和span的内容

				// if (this.clicked == 0) times++;
				if (spanPos[i].innerHTML == "") times++;

				changeColor(liPos, i, false);
				spanPos[i].style.display = "block";
				spanPos[i].innerHTML = "...";

				// 
				getNum("http://localhost:3000", function(returnNum) {
					changeColor(liPos, i, true);
					spanPos[i].innerHTML = returnNum;
					if (times == liPos.length)
						sumPos.style.backgroundColor = "blue";
				}, function () {
					// function for fail state
				});
			}
		}(i);
	}

	sumPos.onclick = function () {
		if (sumPos.style.backgroundColor == "gray") return;
		var sum = 0;
		for (var i = 0; i < spanPos.length; i++) {
			sum = sum + Number(spanPos[i].innerHTML);
		}
		sumPos.innerHTML = sum;
		sumPos.style.backgroundColor = "gray";
		changeColor(liPos, liPos.length+1, true);
	};
}
