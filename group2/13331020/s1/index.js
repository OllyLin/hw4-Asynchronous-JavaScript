window.onload = function() {
	document.getElementById("control-ring").onclick = getNum();
	document.getElementById("bottom-positioner").addEventListener('mouseenter', resetAll);
}

function resetAll() {
	var icons = document.getElementsByClassName("button");
	for (var i = 0; i < icons.length; i++) {
		icons[i].getElementsByClassName("unread")[0].style.visibility = "hidden";
		icons[i].style.backgroundColor = "rgba(48,63,159,1)";
		icons[i].getElementsByClassName("unread")[0].innerHTML = "...";
		icons[i].onclick = function(i) {
			return function() {
				icons[i].getElementsByClassName("unread")[0].style.visibility = "visible";
				setDisable(i);
				getRandomNum(i)
			};
		} (i);
	}
	document.getElementsByClassName("sum")[0].innerHTML = " ";
	document.getElementById("info-bar").style.backgroundColor = "gray";
	document.getElementById("info-bar").onclick = function() {};

}

function getNum() {
	document.getElementById("info-bar").onclick = function() {};
	var icons = document.getElementsByClassName("button");
	for (var i = 0; i < icons.length; i++) {
		icons[i].onclick = function(i) {
			return function() {
				icons[i].getElementsByClassName("unread")[0].style.visibility = "visible";
				setDisable(i);
				getRandomNum(i)
			};
		} (i);
	}
}

function setDisable(i) {
	var icons = document.getElementsByClassName("button");
	for (var j = 0; j < icons.length; j++) {
		if (j != i) {
			icons[j].style.backgroundColor = "gray";
			icons[j].onclick = function() {};
		}
	}
}

function getRandomNum(i) {
	var icons = document.getElementsByClassName("button");
	var client = new XMLHttpRequest();
	client.open("GET","/",true);
	client.send(null);
	client.onreadystatechange = function() {
		if (client.readyState == 4) {
            icons[i].getElementsByClassName("unread")[0].innerHTML = client.responseText;
            icons[i].style.backgroundColor = "gray";
            icons[i].onclick = function() {};

            var count = 0;
            for (var k = 0; k < icons.length; k++) {
            	if (icons[k].getElementsByClassName("unread")[0].innerHTML != "...") {
            		count++;
            	}
            }
            if (count == 5) {
            	document.getElementById("info-bar").style.backgroundColor = "rgba(48,63,159,1)";
            	document.getElementById("info-bar").addEventListener('click', sum);
            }

            setEnable(i);
		}
	}
}

function setEnable(index) {
	var icons = document.getElementsByClassName("button");
	for (var i = 0; i < icons.length; i++) {
		if (icons[i].getElementsByClassName("unread")[0].innerHTML == "...") {
			icons[i].style.backgroundColor = "rgba(48,63,159,1)";
			icons[i].onclick = function(i) {
				return function() {
					icons[i].getElementsByClassName("unread")[0].style.visibility = "visible";
					setDisable(i);
					getRandomNum(i)
				};
			} (i);
		}
	}
}

function sum() {
	var num = document.getElementsByClassName("unread");
	var Sum = 0;
	for (var i = 0; i < num.length; i++) {
		Sum += parseInt(num[i].innerHTML);
	}
	document.getElementsByClassName("sum")[0].innerHTML = Sum;
	document.getElementById("info-bar").style.backgroundColor = "grey";
	document.getElementById("info-bar").onclick = function() {};
}