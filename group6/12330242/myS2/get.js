

function changeColor(liPos, index, status) {
	if (status == false) {
		for (var i = 0; i < liPos.length; i++) {
			liPos[i].style.backgroundColor = "gray";
		}
		if (index < liPos.length)
		liPos[index].style.backgroundColor = "blue";
	} else if (status == true) {
		for (var i = 0; i < liPos.length; i++) {
			liPos[i].style.backgroundColor = "blue";
		}
		if (index < liPos.length)
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

				
					if (i < liPos.length - 1)
						setTimeout(liPos[i + 1].onclick(), 0);
					else
						setTimeout(sumPos.onclick(), 0);
				}
				);
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
		for (var i = 0; i < 5; i++)
		liPos[i].style.backgroundColor = "blue";
		sumPos.style.backgroundColor = "blue";
	}
	buttonPos.onclick = function() {
		setTimeout(liPos[0].onclick(), 0);
	}

}
