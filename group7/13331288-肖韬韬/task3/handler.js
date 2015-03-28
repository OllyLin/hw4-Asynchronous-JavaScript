window.onload = function inited() {
	var lis = document.getElementsByTagName('li');
	var infoBar = document.getElementById('info-bar');
	var atButton = document.getElementById('at-plus-container');
	for (var i = 0; i < lis.length; i++) {
		lis[i].onclick = function clickHandler(i) {
			return function() {
				// if (lis[i].className.indexOf('disable') >= 0) return;
				lis[i].children[0].className = 'unread';
				lis[i].children[0].innerText = '···';
				for (var j = 0; j < lis.length; j++)
					if (lis[j].className.indexOf('disable') < 0) lis[j].className += '  disabled';
				ajaxHandler(lis, i);
			}
		}(i);
	}
	infoBar.onclick = function calculateHandler() {
		if (infoBar.className = 'active') {
			var sum = 0;
			for (var i = 0; i < lis.length; i++)
				sum += parseInt(lis[i].children[0].innerText);
			if (!isNaN(sum)) infoBar.innerText = sum.toString();
			infoBar.className = 'sum';
		}
	}
	infoBar.onmouseleave = function resetHandler() {
		for (var i = 0; i < lis.length; i++)
			if (lis[i].className.indexOf('disable') >= 0) {
				lis[i].className = lis[i].className.substring(0, lis[i].className.indexOf('  disabled'));
				lis[i].children[0].className = lis[i].children[0].innerText = '';
			}
		infoBar.className = infoBar.innerText = '';
	}
	atButton.onclick = function clickInOrder(event) {
		for (var i = 0; i < lis.length; i++)
			lis[i].onclick(i);
	}
}

function ajaxHandler(lis, i) {
	var xmlHttp;
	if (window.XMLHttpRequest)
		xmlHttp = new XMLHttpRequest();
	else
		xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			xmlStateChange(lis[i], xmlHttp.responseText);
		}
	}
	xmlHttp.open("GET","/key="+i.toString(),true);
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
	if (finished == 5) {
		// document.getElementById('info-bar').className = 'active';
		document.getElementById('info-bar').onclick();
	}
}
