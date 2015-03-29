/*software process improvement
homework, 04.asychronous js, javascript*/

var counter_num = 0;

window.onload = function () {
	var icon = document.getElementsByClassName("icon");
	icon[0].onclick = startCounter;
	var place = document.getElementById("button");
	place.onmouseleave = end();
}

function end() {
	return function () {
		var buttons = document.getElementsByClassName("button");
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
			if (buttons[i].childNodes.length > 1)
				buttons[i].removeChild(buttons[i].childNodes[1]);
		}
		var result = document.getElementsByClassName('page');
		result[0].innerHTML = '';
	}
}

function startCounter() {
	var buttons = document.getElementsByClassName("button");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = setTimeout(clickButton(i, buttons), 300);
	}
	
	var result = document.getElementsByClassName('page');
	result[0].innerHTML = '';
}

function clickButton(i, buttons) {
	return function () {
		if (buttons[i].childNodes.length == 1) {
			for (var j = 0; j < buttons.length; j++)
				if (j != i) buttons[j].style.backgroundColor = "gray";

			var red = document.createElement("span");
			red.className = "unread";
			red.innerHTML = '...';
			buttons[i].appendChild(red);
			getRandomNum(i, buttons, red);
		}
	}
}

function activateButtons(i, buttons, red) {
	for (var j = 0; j < buttons.length; j++) {
		if (red.innerHTML != '...' && buttons[j].childNodes.length == 1)
			buttons[j].style.backgroundColor = "rgba(48, 63, 159, 1)";
	}
}

function getRandomNum(i, buttons, red) {
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

			buttons[i].style.backgroundColor = 'gray';

	    	activateButtons(i, buttons, red);
			
			counter_num += 1;
			// calculate automatically
			var info = document.getElementsByClassName('info');
			info[0].onclick = setTimeout(calculate(info[0], buttons), 0);
	    }
	  }
	xmlhttp.open("GET","/",true);
	xmlhttp.send();
}

function calculate(info, buttons) {
	return function () {
		if (canCal(info, buttons)) {
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
}

function canCal(info, buttons) {
	if (counter_num == 5) {
		info.style.backgroundColor = "rgba(48, 63, 159, 1)";
		return true;
	}
}
