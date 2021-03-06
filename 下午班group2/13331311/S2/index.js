var flag = true;

window.onload = function () {
	makeButtonClearable(getContainer());
	makeAtPlusFunctional(getAtPlus());
}

function makeAtPlusFunctional(atplus) {
	atplus.onclick = robot;
}

function robot() {
	this.onclick = null;
	flag = true;
	
	var firstButton = getAllButtons()[0];
	buttonRobot(firstButton);
}

function buttonRobot(button) {
	if (button != null && flag) {
		requestRamdomNumber(button);
		disableOtherButtons(button);
	}
	if (!flag) {
		clearAndAbleAllButtons();
		clearButtle();
	}
}

function bubbleRobot(bubble) {
	if (bubble != null && flag) {
		calculateSum(bubble);
	}

	if (!flag) {
		clearAndAbleAllButtons();
		clearButtle();
	}
}

function getContainer() {
	return document.getElementById("button");
}

function getAllButtons() {
	return document.getElementsByClassName("button");;
}

function getNextButton(thisButton) {
	var buttons = getAllButtons();
	var target;
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].isSameNode(thisButton))
			target = i + 1;
		if (i == target)
			return buttons[i];
	};
	return null;
}

function getBubble() {
	return document.getElementsByClassName("info")[0];
}

function getAtPlus() {
	return document.getElementsByClassName("icon")[0];
}

function makeButtonClearable(container) {
	container.onmouseout = function() {
		var x = event.clientX;
       	var y = event.clientY;  
       	var divx1 = this.offsetLeft;  
       	var divy1 = this.offsetTop;  
       	var divx2 = this.offsetLeft + this.offsetWidth;  
       	var divy2 = this.offsetTop + this.offsetHeight;
       	if (x < divx1 || x > divx2 || y < divy1 || y > divy2) {
       		flag = false;
			clearAndAbleAllButtons();
			clearButtle();
			makeAtPlusFunctional(getAtPlus());
		}
	};
}

function requestRamdomNumber(button) {
	button.getElementsByTagName("span")[0].style.opacity = 1;

	xmlhttp = null;
	if (window.XMLHttpRequest) {  // code for IE7, Firefox, Opera, etc.
		xmlhttp=new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {  // code for IE6, IE5
	  	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (xmlhttp!=null) {
	  	xmlhttp.onreadystatechange = function(button) {
	  		return function() {
	  			getRamdomNumber(button);
	  		}
	  	}(button);
	  	xmlhttp.open("GET","/",true);
	  	xmlhttp.send(null);
	}
	else {
	  alert("Your browser does not support XMLHTTP.");
	}
}

function getRamdomNumber(button) {
	if (xmlhttp.readyState == 4) {  // 4 = "loaded"
  		if (xmlhttp.status==200) {  // 200 = "OK"
    		button.getElementsByTagName("span")[0].innerHTML=xmlhttp.responseText;
    		ableOtherButtons(button);
    		/**
    		** Robot is here.
    		**/
    		buttonRobot(getNextButton(button));

    		if (AllButtonsDisabled()) {

    			/**
    			 * Robot is here.
    			**/
    			bubbleRobot(getBubble());
    		}

    	} else {
    		alert("Problem retrieving XML data:" + xmlhttp.statusText);
    	}
  	}	
}

function disableOtherButtons(thisButton) {
	var buttons = getAllButtons();
	for (var i = 0; i < buttons.length; i++) {
		if (!buttons[i].isSameNode(thisButton)) {
			buttons[i].style.backgroundColor = 'grey';
		}
	};
}

function ableOtherButtons(thisButton) {
	var buttons = getAllButtons();
	for (var i = 0; i < buttons.length; i++) {
		if (!buttons[i].isSameNode(thisButton)) {
			if (buttons[i].getElementsByTagName('span')[0].style.opacity == 0) {
				buttons[i].style.backgroundColor = 'rgba(48, 63, 159, 1)';
			}
		}
	};
	thisButton.style.backgroundColor = 'grey';
}

function clearAndAbleAllButtons() {
	var buttons = getAllButtons();
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].getElementsByTagName("span")[0].innerHTML = '...';
		buttons[i].getElementsByTagName("span")[0].style.opacity = 0;
		buttons[i].style.backgroundColor = 'rgba(48, 63, 159, 1)';
	}
}

function AllButtonsDisabled() {
	var buttons = getAllButtons();
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].getElementsByTagName('span')[0].innerHTML == '...') {
			return false;
		}
	};
	return true;
}

function clearButtle() {
	var bubble = getBubble();
	bubble.getElementsByTagName("span")[0].innerHTML = '';
	bubble.getElementsByTagName("span")[0].style.opacity = 0;
}

function calculateSum(bubble) {
	var sum = 0;
	var buttons = getAllButtons();
	for (var i = 0; i < buttons.length; i++) {
		sum += parseInt(buttons[i].getElementsByTagName('span')[0].innerHTML);
	};
	bubble.getElementsByTagName("span")[0].innerHTML = sum;
	bubble.getElementsByTagName("span")[0].style.opacity = 1;
	bubble.style.backgroundColor = 'grey';
}