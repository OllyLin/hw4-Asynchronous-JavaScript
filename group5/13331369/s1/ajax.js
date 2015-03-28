//the active button
var isActive = [1, 1, 1, 1, 1];

//the clicked button
var hasClick = [0, 0, 0, 0, 0];

//get the all buttons
var buttons = document.getElementsByClassName("button");

//whether the num return
var isNumHas = 0;

//judge the number of the number get
var count = 0;

//sum of the num 
var sum = 0;

window.onload = function() {
	//get all the buttons
	var allButtons = document.getElementsByClassName("button");
	for (var i = 0; i < allButtons.length; i++) {
		allButtons[i].onclick = response;
	}

	//the big big button
	document.getElementById("info-bar").onclick = getSum;

//some initial work
	//disappear the red radius
	document.getElementsByClassName("unread_a")[0].style.display = "none";
	document.getElementsByClassName("unread_b")[0].style.display = "none";
	document.getElementsByClassName("unread_c")[0].style.display = "none";
	document.getElementsByClassName("unread_d")[0].style.display = "none";
	document.getElementsByClassName("unread_e")[0].style.display = "none";

	//recover the color of the buttons
	var bigButton = document.getElementsByClassName("apb")[0];

	//when the mouse leave the area button
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
		isActive = [1, 1, 1, 1, 1];
		hasClick = [0, 0, 0, 0, 0];
		isNumHas = 0;
		count = 0;
		sum = 0;
	}
 }

//show the sum
function getSum() {
	if (count == 5) {
		document.getElementsByClassName("like")[0].innerHTML = sum;
		document.getElementById('info-bar').style.backgroundColor = "rgba(0, 0, 0, .4)";
	}
}

//response to the click
function response() {
	var whichBeClicked;

	//a
	if (event.target.innerHTML.search(/A/) != -1) {
		if (hasClick[0] || isNumHas)
			return;
		document.getElementsByClassName("unread_a")[0].style.display = "block";
		document.getElementsByClassName("unread_a")[0].innerHTML = "...";
		hasClick[0] = 1;
		whichBeClicked = "A";
	}
	//b
	if (event.target.innerHTML.search(/B/) != -1) {
		if (hasClick[1] || isNumHas)
			return;
		document.getElementsByClassName("unread_b")[0].style.display = "block";
		document.getElementsByClassName("unread_b")[0].innerHTML = "...";
		hasClick[1] = 1;
		whichBeClicked = "B";
	}
	//c
	if (event.target.innerHTML.search(/C/) != -1) {
		if (hasClick[2] || isNumHas)
			return;
		document.getElementsByClassName("unread_c")[0].style.display = "block";
		document.getElementsByClassName("unread_c")[0].innerHTML = "...";
		hasClick[2] = 1;
		whichBeClicked = "C";
	}
	//d
	if (event.target.innerHTML.search(/D/) != -1) {
		if (hasClick[3] || isNumHas)
			return;
		document.getElementsByClassName("unread_d")[0].style.display = "block";
		document.getElementsByClassName("unread_d")[0].innerHTML = "...";
		hasClick[3] = 1;
		whichBeClicked = "D";
	}
	//e
	if (event.target.innerHTML.search(/E/) != -1) {
		if (hasClick[4] || isNumHas)
			return;
		document.getElementsByClassName("unread_e")[0].style.display = "block";
		document.getElementsByClassName("unread_e")[0].innerHTML = "...";
		hasClick[4] = 1;
		whichBeClicked = "E";
	}

	isNumHas = 1;

	//inactivate the button 
	for (var i = 0; i < 5; i++) {
		buttons[i].style.backgroundColor = "rgba(0, 0, 0, .4)";
	}

	event.target.style.backgroundColor = "#2828FF";

	ajax(function(num) { //when the num is returned  do some operation
		sum += parseInt(num);
		if (whichBeClicked == "A") {
			document.getElementsByClassName("unread_a")[0].innerHTML = num;
			document.getElementsByClassName("a")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";
		}
		else if (whichBeClicked == "B") {
			document.getElementsByClassName("unread_b")[0].innerHTML = num;
			document.getElementsByClassName("b")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";
		}
		else if (whichBeClicked == "C") {
			document.getElementsByClassName("unread_c")[0].innerHTML = num;
			document.getElementsByClassName("c")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";
		}
		else if (whichBeClicked == "D") {
			document.getElementsByClassName("unread_d")[0].innerHTML = num;
			document.getElementsByClassName("d")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";
		}
		else {
			document.getElementsByClassName("unread_e")[0].innerHTML = num;
			document.getElementsByClassName("e")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";
		}

		isNumHas = 0;

		count++;
		//recover the active button
		for (var i = 0; i < 5; i++)
			if (!hasClick[i])
				buttons[i].style.backgroundColor = "#2828FF";
		if (count == 5)
			document.getElementById('info-bar').style.backgroundColor = "#2828FF";
	}
		);	


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