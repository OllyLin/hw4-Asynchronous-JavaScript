//get the all buttons
var buttons = document.getElementsByClassName("button");

//sum of the num 
var sum = 0;

window.onload = function() {
	//get all the buttons
	var allButtons = document.getElementsByClassName("button");

	document.getElementsByClassName("apb")[0].onclick = responseA;

//some initial work
	//disappear the red radius
	document.getElementsByClassName("unread_a")[0].style.display = "none";
	document.getElementsByClassName("unread_b")[0].style.display = "none";
	document.getElementsByClassName("unread_c")[0].style.display = "none";
	document.getElementsByClassName("unread_d")[0].style.display = "none";
	document.getElementsByClassName("unread_e")[0].style.display = "none";

	//recover the color of the buttons
	var bigButton = document.getElementsByClassName("apb")[0];
	bigButton.onmouseout = function() {
		//for the small buttom
		document.getElementsByClassName("unread_a")[0].style.display = "none";
		document.getElementsByClassName("unread_b")[0].style.display = "none";
		document.getElementsByClassName("unread_c")[0].style.display = "none";
		document.getElementsByClassName("unread_d")[0].style.display = "none";
		document.getElementsByClassName("unread_e")[0].style.display = "none";

		//for the big button
		for (var i = 0; i < allButtons.length; i++) {
			allButtons[i].style.backgroundColor = "#2828FF";
		}

		//for the big big button
		document.getElementsByClassName("mine")[0].innerHTML = "";


		//recover some other things
		sum = 0;
	}
 }



// for a
function responseA() {

	//waiting
	document.getElementsByClassName("unread_a")[0].style.display = "block";
	document.getElementsByClassName("unread_a")[0].innerHTML = "...";

	//some operation for a
	//inactivate the button 
	for (var i = 0; i < 5; i++) {
		buttons[i].style.backgroundColor = "rgba(0, 0, 0, .4)";
	}

	document.getElementsByClassName("a")[0].style.backgroundColor = "#2828FF";

	//ajax
	ajax(function(num) {
		sum += parseInt(num);

		document.getElementsByClassName("unread_a")[0].innerHTML = num;
		document.getElementsByClassName("a")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";

		//recover the active button
		for (var i = 1; i < 5; i++)
			buttons[i].style.backgroundColor = "#2828FF";

		setTimeout(responseB, 2000);
	});
}

//for b
function responseB() {
	
	//waiting
	document.getElementsByClassName("unread_b")[0].style.display = "block";
	document.getElementsByClassName("unread_b")[0].innerHTML = "...";

	//some operation for a
	//inactivate the button 
	for (var i = 0; i < 5; i++) {
		buttons[i].style.backgroundColor = "rgba(0, 0, 0, .4)";
	}

	document.getElementsByClassName("b")[0].style.backgroundColor = "#2828FF";

	//ajax
	ajax(function(num) {
		sum += parseInt(num);
		document.getElementsByClassName("unread_b")[0].innerHTML = num;
		document.getElementsByClassName("b")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";

		//recover the active button
		for (var i = 2; i < 5; i++)
			buttons[i].style.backgroundColor = "#2828FF";

		setTimeout(responseC, 2000);
	});
}

//for c
function responseC() {
	
	//waiting
	document.getElementsByClassName("unread_c")[0].style.display = "block";
	document.getElementsByClassName("unread_c")[0].innerHTML = "...";

	//some operation for a
	//inactivate the button 
	for (var i = 0; i < 5; i++) {
		buttons[i].style.backgroundColor = "rgba(0, 0, 0, .4)";
	}

	document.getElementsByClassName("c")[0].style.backgroundColor = "#2828FF";

	//ajax
	ajax(function(num) {
		sum += parseInt(num);
		document.getElementsByClassName("unread_c")[0].innerHTML = num;
		document.getElementsByClassName("c")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";

		//recover the active button
		for (var i = 3; i < 5; i++)
			buttons[i].style.backgroundColor = "#2828FF";

		setTimeout(responseD, 2000);
	});
}

//for d
function responseD() {
	
	//waiting
	document.getElementsByClassName("unread_d")[0].style.display = "block";
	document.getElementsByClassName("unread_d")[0].innerHTML = "...";

	//some operation for a
	//inactivate the button 
	for (var i = 0; i < 5; i++) {
		buttons[i].style.backgroundColor = "rgba(0, 0, 0, .4)";
	}

	document.getElementsByClassName("d")[0].style.backgroundColor = "#2828FF";

	//ajax
	ajax(function(num) {
		sum += parseInt(num);
		document.getElementsByClassName("unread_d")[0].innerHTML = num;
		document.getElementsByClassName("d")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";

		//recover the active button
		for (var i = 4; i < 5; i++)
			buttons[i].style.backgroundColor = "#2828FF";

		setTimeout(responseE, 2000);
	});
}

//for e
function responseE() {
	
	//waiting
	document.getElementsByClassName("unread_e")[0].style.display = "block";
	document.getElementsByClassName("unread_e")[0].innerHTML = "...";

	//some operation for a
	//inactivate the button 
	for (var i = 0; i < 5; i++) {
		buttons[i].style.backgroundColor = "rgba(0, 0, 0, .4)";
	}

	document.getElementsByClassName("e")[0].style.backgroundColor = "#2828FF";

	//ajax
	ajax(function(num) {
		sum += parseInt(num);
		document.getElementsByClassName("unread_e")[0].innerHTML = num;
		document.getElementsByClassName("e")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";
		document.getElementById('info-bar').style.backgroundColor = "#2828FF";

		setTimeout(showSum, 1000);
				
	});
}

//show the sum in the big button
function showSum() {
	document.getElementById('info-bar').style.backgroundColor = "rgba(0, 0, 0, .4)";
	document.getElementsByClassName("like")[0].innerHTML = sum;
}

//ajax request
function ajax(fnSuccess, beforeGetResult, url) {
	// beforeGetResult();

	if (window.XMLHttpRequest) {
		//build the Ajax object
		var iAjax = new XMLHttpRequest();
	} else {
		var iAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//connect to the server
	iAjax.open('GET', "http://127.0.0.1:3000/", true);
	//send the request
	iAjax.send();
	//recieve the return result
	iAjax.onreadystatechange = function() {
		if (iAjax.readyState == 4) {
			if (iAjax.status == 200)
				fnSuccess(iAjax.responseText);
		}
	}
}