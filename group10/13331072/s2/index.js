var letter = ['A', 'B', 'C', 'D', 'E'];
var flag = [false, false, false, false, false];
var buttons = document.getElementsByTagName('li');
var request;
var reset = false;
function loadXMLDoc (url, cfunc) {
	request = new XMLHttpRequest();
	request.onreadystatechange = cfunc;
	request.open("GET",url,true);
	request.send();
}

function getnumber(id) {
loadXMLDoc("/",
	function() {
		if (request.readyState==4 && request.status==200) {
			document.getElementById(id).innerHTML=request.responseText;
			var bigflag = true;
			for (i = 0; i <5; i++) {
				if (!flag[i]) {
					buttons[i].onclick = function() {
						Click(this.Index);
					};
					buttons[i].style.backgroundColor = 'rgba(48,63,159,1)';
					bigflag = false;
				} else {
					buttons[i].onclick = function() {};
					buttons[i].style.backgroundColor = 'gray';
				}
			}
			if (id < 4) {
				if (!reset)
				Click(id +1);
			 } else {
				info_click();
			}
			if (bigflag) {
				document.getElementById('info-bar').onclick = function() {
					info_click();
				}
			}
		}
	});
}
function info_click() {
	document.getElementById('big').innerHTML = parseInt(document.getElementById('0').innerHTML)
														+ parseInt(document.getElementById('1').innerHTML)
														+ parseInt(document.getElementById('2').innerHTML)
														+ parseInt(document.getElementById('3').innerHTML)
														+ parseInt(document.getElementById('4').innerHTML);
				document.getElementById('info-bar').onclick = function() {};
}
function Click(id) {
	flag[id] = true;
	document.getElementById(id).style.display = "block";
	for (i = 0; i < 5; i++) {
		buttons[i].onclick = function() {};
		if (i != id)
		buttons[i].style.backgroundColor = 'gray';
	}
	getnumber(id);
}
function init() {
	flag = [false, false, false, false, false];
	document.getElementById('big').innerHTML = "";
	reset = true;
	for (var i = 0; i < 5; i++) {
		buttons[i].Index = i;
		buttons[i].style.backgroundColor = 'rgba(48,63,159,1)';
		document.getElementById(i).style.display = "none";
		document.getElementById(i).innerHTML = "...";
		buttons[i].onclick = function() {
			Click(this.Index);
			}
		}
}

window.onload = function() {
	document.getElementById('at-plus-container').onmouseout=init;
	document.getElementById('green').onclick = function() {
		reset = false;
		Click(0);
	}
}