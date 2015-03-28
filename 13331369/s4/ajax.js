//get the all buttons
var buttons = document.getElementsByClassName("button");

//sum of the num 
var sum = 0;

//the order
var order = ["", "", "", "", ""];

window.onload = function() {
	//get all the buttons
	var allButtons = document.getElementsByClassName("button");

	document.getElementsByClassName("apb")[0].onclick = execu;

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
		for (var i = 0; i < allButtons.length; i++)
			allButtons[i].style.backgroundColor = "#2828FF";

		//for the big big button
		document.getElementsByClassName("mine")[0].innerHTML = "";


		//recover some other things
		sum = 0;
		order = ["", "", "", "", ""];
		document.getElementById('A').innerHTML = "";
		document.getElementById('B').innerHTML = "";
		document.getElementById('C').innerHTML = "";
		document.getElementById('D').innerHTML = "";
		document.getElementById('E').innerHTML = "";
	}
 }



function execu() {
	var arr = [0,0,0,0,0], //remember the num has been esisted
	arr1 = [0,0,0,0,0];
	for (var i = 0; i < 5; i++) {
		while(1) {
			var temp =parseInt(Math.random() * 10 % 5);
			if (arr[temp] == 0) {
				arr[temp] = 1;
				arr1[i] = temp;
				break;
			}
		}
	}
	for (var i = 0; i < 5; i++) {
		if (i == 0) {
			document.getElementById('A').innerHTML = showOrder(arr1, i);
			order[i] = showOrder(arr1, i);
		}
		else if (i == 1) {
			document.getElementById('B').innerHTML = showOrder(arr1, i);
			order[i] = showOrder(arr1, i);
		}
		else if (i == 2) {
			document.getElementById('C').innerHTML = showOrder(arr1, i);
			order[i] = showOrder(arr1, i);
		}
		else if (i == 3) {
			document.getElementById('D').innerHTML = showOrder(arr1, i);
			order[i] = showOrder(arr1, i);
		}
		else {
			document.getElementById('E').innerHTML = showOrder(arr1, i);
			order[i] = showOrder(arr1, i);
		}
	}

	//execute after the order come out
	if (order[0] == "A")
		responseA(1);
	else if (order[0] == "B")
		responseB(1);
	else if (order[0] == "C")
		responseC(1);
	else if (order[0] == "D")
		responseD(1);
	else
		responseE(1);
}

function showOrder(arr, which) {
	if (arr[which] == 0)
		return "A";
	else if (arr[which] == 1)
		return "B";
	else if (arr[which] == 2)
		return "C";
	else if (arr[which] == 3)
		return "D";
	else
		return "E";
}

// for a
function responseA(nextNumm) {

	//waiting
	document.getElementsByClassName("unread_a")[0].style.display = "block";
	document.getElementsByClassName("unread_a")[0].innerHTML = "...";

	//some operation for a
	//inactivate the button 
	for (var i = 0; i < 5; i++)
		buttons[i].style.backgroundColor = "rgba(0, 0, 0, .4)";

	document.getElementsByClassName("a")[0].style.backgroundColor = "#2828FF";

	//ajax
	ajax(function(num) {
		sum += parseInt(num);

		document.getElementsByClassName("unread_a")[0].innerHTML = num;
		document.getElementsByClassName("a")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";
		setTimeout(function() {
			nextFunction(nextNumm);
		}, 1500);
	});
}

//for b
function responseB(nextNumm) {
	
	//waiting
	document.getElementsByClassName("unread_b")[0].style.display = "block";
	document.getElementsByClassName("unread_b")[0].innerHTML = "...";

	//some operation for a
	//inactivate the button 
	for (var i = 0; i < 5; i++)
		buttons[i].style.backgroundColor = "rgba(0, 0, 0, .4)";

	document.getElementsByClassName("b")[0].style.backgroundColor = "#2828FF";

	//ajax
	ajax(function(num) {
		sum += parseInt(num);
		document.getElementsByClassName("unread_b")[0].innerHTML = num;
		document.getElementsByClassName("b")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";
		setTimeout(function() {
			nextFunction(nextNumm);
		}, 1500);
	});
}

//for c
function responseC(nextNumm) {
	
	//waiting
	document.getElementsByClassName("unread_c")[0].style.display = "block";
	document.getElementsByClassName("unread_c")[0].innerHTML = "...";

	//some operation for a
	//inactivate the button 
	for (var i = 0; i < 5; i++)
		buttons[i].style.backgroundColor = "rgba(0, 0, 0, .4)";

	document.getElementsByClassName("c")[0].style.backgroundColor = "#2828FF";

	//ajax
	ajax(function(num) {
		sum += parseInt(num);
		document.getElementsByClassName("unread_c")[0].innerHTML = num;
		document.getElementsByClassName("c")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";

		setTimeout(function() {
			nextFunction(nextNumm);
		}, 1500);
	});
}

//for d
function responseD(nextNumm) {
	
	//waiting
	document.getElementsByClassName("unread_d")[0].style.display = "block";
	document.getElementsByClassName("unread_d")[0].innerHTML = "...";

	//some operation for a
	//inactivate the button 
	for (var i = 0; i < 5; i++)
		buttons[i].style.backgroundColor = "rgba(0, 0, 0, .4)";

	document.getElementsByClassName("d")[0].style.backgroundColor = "#2828FF";

	//ajax
	ajax(function(num) {
		sum += parseInt(num);
		document.getElementsByClassName("unread_d")[0].innerHTML = num;
		document.getElementsByClassName("d")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";

		setTimeout(function() {
			nextFunction(nextNumm);
		}, 1500);
	});
}

//for e
function responseE(nextNumm) {
	
	//waiting
	document.getElementsByClassName("unread_e")[0].style.display = "block";
	document.getElementsByClassName("unread_e")[0].innerHTML = "...";

	//some operation for a
	//inactivate the button 
	for (var i = 0; i < 5; i++)
		buttons[i].style.backgroundColor = "rgba(0, 0, 0, .4)";

	document.getElementsByClassName("e")[0].style.backgroundColor = "#2828FF";

	//ajax
	ajax(function(num) {
		sum += parseInt(num);
		document.getElementsByClassName("unread_e")[0].innerHTML = num;
		document.getElementsByClassName("e")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";
		setTimeout(function() {
			nextFunction(nextNumm);
		}, 1500);
	});
}

//show the sum in the big button
function showSum() {
	document.getElementById('info-bar').style.backgroundColor = "rgba(0, 0, 0, .4)";
	document.getElementsByClassName("like")[0].innerHTML = sum;
}

//execute next function after ajax
function nextFunction(nextNumm) {
	if (nextNumm < 5) {
		if (order[nextNumm] == "A") {
			recoverBackgroundColor(nextNumm);
			setTimeout(function() {
			responseA(nextNumm + 1);

		}, 1500);
		}
		else if (order[nextNumm] == "B") {
			recoverBackgroundColor(nextNumm);
			setTimeout(function() {
			responseB(nextNumm + 1);

		}, 1500);
		}
		else if (order[nextNumm] == "C") {
			recoverBackgroundColor(nextNumm);
			setTimeout(function() {
			responseC(nextNumm + 1);

		}, 1500);
		}
		else if (order[nextNumm] == "D") {
			recoverBackgroundColor(nextNumm);
			setTimeout(function() {
			responseD(nextNumm + 1);

		}, 1500);
		}
		else {
			recoverBackgroundColor(nextNumm);
			setTimeout(function() {
			responseE(nextNumm + 1);

		}, 1500);
		}
	} else {
		document.getElementById('info-bar').style.backgroundColor = "#2828FF";
		setTimeout(showSum, 1000);
	}		
}

//recover the backgrund dolor
function recoverBackgroundColor(nextNumm) {
	for (var i = 0; i < nextNumm; i++) {
		if (order[i] == "A")
			document.getElementsByClassName("a")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";
		else if (order[i] == "B")
			document.getElementsByClassName("b")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";
		else if (order[i] == "C")
			document.getElementsByClassName("c")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";
		else if (order[i] == "D")
			document.getElementsByClassName("d")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";
		else
			document.getElementsByClassName("e")[0].style.backgroundColor = "rgba(0, 0, 0, .4)";
	}
	for (var i = nextNumm; i < 5; i++) {
		if (order[i] == "A")
			document.getElementsByClassName("a")[0].style.backgroundColor = "#2828FF";
		else if (order[i] == "B")
			document.getElementsByClassName("b")[0].style.backgroundColor = "#2828FF";
		else if (order[i] == "C")
			document.getElementsByClassName("c")[0].style.backgroundColor = "#2828FF";
		else if (order[i] == "D")
			document.getElementsByClassName("d")[0].style.backgroundColor = "#2828FF";
		else
			document.getElementsByClassName("e")[0].style.backgroundColor = "#2828FF";
	}
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