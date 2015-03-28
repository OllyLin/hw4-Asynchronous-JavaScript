window.onload = function() {
	document.getElementById("bottom-positioner").onclick = Ahandler;
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

function setDisable(i) {
	var icons = document.getElementsByClassName("button");
	icons[i].getElementsByClassName("unread")[0].style.visibility = "visible";
	for (var j = 0; j < icons.length; j++) {
		if (j != i) {
			icons[j].style.backgroundColor = "gray";
			icons[j].onclick = function() {};
		}
	}
	return;
}

function getRandomNum(i) {
	var icons = document.getElementsByClassName("button");
	var client = new XMLHttpRequest();
	client.open("GET","/",true);
	client.send(null);
	client.onreadystatechange = function() {
		if (client.readyState == 4) {
			// document.getElementsByClassName("button")[i].getElementsByClassName("unread")[0].style.visibility = "visible";
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
            	sum();
            }
            setEnable(i);
            switch(i) {
				case 0:Bhandler(); break;
				case 1:Chandler(); break;
				case 2:Dhandler(); break;
				case 3:Ehandler(); break;
			}

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
	return;
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




function Ahandler() {
	var icons = document.getElementsByClassName("button");
	icons[0].getElementsByClassName("unread")[0].style.visibility = "visible";
	setDisable(0);
	getRandomNum(0);
}

function Bhandler() {
	var icons = document.getElementsByClassName("button");
	icons[1].getElementsByClassName("unread")[0].style.visibility = "visible";
	setDisable(1);
	getRandomNum(1);
}

function Chandler() {
	var icons = document.getElementsByClassName("button");
	icons[2].getElementsByClassName("unread")[0].style.visibility = "visible";
	setDisable(2);
	getRandomNum(2);
}

function Dhandler() {
	var icons = document.getElementsByClassName("button");
	icons[3].getElementsByClassName("unread")[0].style.visibility = "visible";
	setDisable(3);
	getRandomNum(3);
}

function Ehandler() {
	var icons = document.getElementsByClassName("button");
	icons[4].getElementsByClassName("unread")[0].style.visibility = "visible";
	setDisable(4);
	getRandomNum(4);
}
