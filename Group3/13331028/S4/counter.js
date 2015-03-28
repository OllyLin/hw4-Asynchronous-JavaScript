/*software process improvement
homework, 04.asychronous js, javascript*/

var counter_num = 0;

window.onload = function () {
	var icon = document.getElementsByClassName("icon");
	icon[0].onclick = startCounter;
	var place = document.getElementById("button");
	place.onmouseleave = end(place);
}

function end(place) {
	return function () {
		var buttons = document.getElementsByClassName("button");
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
			if (buttons[i].childNodes.length > 1)
				buttons[i].removeChild(buttons[i].childNodes[1]);
		}
		var result = document.getElementsByClassName('page');
		result[0].innerHTML = '';
		place.removeChild(place.childNodes[0]);
	}
}

function startCounter() {
	var order = createRandomClickArr();

	var buttons = document.getElementsByClassName("button");
	buttons[order[0]].onclick = setTimeout(clickButton(0, order, buttons), 300);
	
	var result = document.getElementsByClassName('page');
	result[0].innerHTML = '';
}

function randomSort(a, b) {
	return Math.random() > 0.5 ? -1 : 1;
}
function createRandomClickArr() {
	var origin = [0, 1, 2, 3, 4];
	var newOrder = origin.sort(randomSort);

	// show the order
	var p = document.createElement("p");
	p.innerHTML = "NEW ORDER:";
	for (var i = 0; i < newOrder.length; i++)
		p.innerHTML += newOrder[i] + ' ';
	p.style.marginTop = "-30px";
	p.style.textAlign = "center";
	var button = document.getElementById("button");
	button.insertBefore(p, button.firstChild);

	return newOrder;
}

function clickButton(i, order, buttons) {
	return function () {
		if (buttons[order[i]].childNodes.length == 1) {
			for (var j = 0; j < buttons.length; j++)
				if (j != order[i]) buttons[j].style.backgroundColor = "gray";

			var red = document.createElement("span");
			red.className = "unread";
			red.innerHTML = '...';
			buttons[order[i]].appendChild(red);
			getRandomNum(i, order, buttons, red);
		}
	}
}

function activateButtons(i, buttons, red) {
	for (var j = 0; j < buttons.length; j++) {
		if (red.innerHTML != '...' && buttons[j].childNodes.length == 1)
			buttons[j].style.backgroundColor = "rgba(48, 63, 159, 1)";
	}
}

function getRandomNum(i, order, buttons, red) {
	var xmlhttp;
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	// callback
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	red.innerHTML = xmlhttp.responseText;

			buttons[order[i]].style.backgroundColor = 'gray';

	    	activateButtons(i, buttons, red);

			counter_num += 1;
	    	// calculate automatically
			var info = document.getElementsByClassName('info');
			if (!canCal(info[0], buttons)) {
				++i;
				buttons[order[i]].onclick = setTimeout(clickButton(i, order, buttons), 300);
			} else {
				info[0].onclick = setTimeout(calculate(info[0], buttons), 0);
			}
	    }
	  }
	xmlhttp.open("GET","/",true);
	xmlhttp.send();
}

function calculate(info, buttons) {
	return function () {
		setTimeout(function () {
			var cal = 0;
			for (var i = 0; i < buttons.length; i++)
				cal += parseInt(buttons[i].childNodes[1].innerHTML);
			
			var result = document.getElementsByClassName('page');
			result[0].innerHTML = cal;
			
			info.style.backgroundColor = 'gray';
		}, 300);
	}
}

function canCal(info, buttons) {
	if (counter_num == 5) {
		info.style.backgroundColor = "rgba(48, 63, 159, 1)";
		return true;
	}
}
