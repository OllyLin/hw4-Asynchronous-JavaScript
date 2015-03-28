window.onload = function inited() {
	var lis = document.getElementsByTagName('li');
	var infoBar = document.getElementById('info-bar');
	var bottomPositioner = document.getElementById('bottom-positioner');
	for (var i = 0; i < lis.length; i++) {
		lis[i].onclick = function clickHandler(i) {
			return function() {
				if (lis[i].className.indexOf('disable') >= 0) return;
				lis[i].children[0].className = 'unread';
				lis[i].children[0].innerText = '···';
				for (var j = 0; j < lis.length; j++)
					if (lis[j].className.indexOf('disable') < 0) lis[j].className += '  disabled';
				ajaxHandler(lis[i]);
			}
		}(i);
	}
	infoBar.onclick = function calculateHandler() {
		if (infoBar.className = 'active') {
			var sum = 0;
			for (var i = 0; i < lis.length; i++)
				sum += parseInt(lis[i].children[0].innerText);
			infoBar.innerText = sum.toString();
			infoBar.className = 'sum';
		}
	}
	bottomPositioner.onmouseleave = function resetHandler() {
		for (var i = 0; i < lis.length; i++)
			if (lis[i].className.indexOf('disable') >= 0) {
				lis[i].className = lis[i].className.substring(0, lis[i].className.indexOf('  disabled'));
				lis[i].children[0].className = lis[i].children[0].innerText = '';
			}
		infoBar.className = infoBar.innerText = '';
	}
}

function ajaxHandler(li) {
	var xmlHttp;
	if (window.XMLHttpRequest)
		xmlHttp = new XMLHttpRequest();
	else
		xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			xmlStateChange(li, xmlHttp.responseText);
		}
	}
	xmlHttp.open("GET","/",true);
	xmlHttp.send();
}

function xmlStateChange(li, text) {
	var lis = document.getElementsByTagName('li');
	var finished = 1;
	for (var i = 0; i < lis.length; i++) {
		if (lis[i] == li)
			li.children[0].innerText = text;
		else if (lis[i].children[0].innerText == '')
			lis[i].className = lis[i].className.substring(0, lis[i].className.indexOf('  disabled'));
		else
			finished++;
	}
	if (finished == 5)
		document.getElementById('info-bar').className = 'active';
}
