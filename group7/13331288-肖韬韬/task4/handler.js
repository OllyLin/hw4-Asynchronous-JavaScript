window.onload = function inited() {
	var lis = document.getElementsByTagName('li');
	var infoBar = document.getElementById('info-bar');
	var buttonList = [0, 1, 2, 3, 4];
	buttonList.sort(function(a, b) {
		return Math.random() > 0.5 ? 1 : -1;
	});

	infoBar.onclick = function calculateHandler() {
		var sum = 0;
		for (var i = 0; i < lis.length; i++)
			sum += parseInt(lis[i].children[0].innerText);
		if (!isNaN(sum))
			infoBar.innerText += 'Sum:'+sum.toString();
	}

	infoBar.onmouseleave = function resetHandler() {
		for (var i = 0; i < lis.length; i++)
			if (lis[i].className.indexOf('disable') >= 0) {
				lis[i].className = lis[i].className.substring(0, lis[i].className.indexOf('  disabled'));
				lis[i].children[0].className = lis[i].children[0].innerText = '';
			}
		infoBar.className = infoBar.innerText = '';
	}

	var atButton = document.getElementById('at-plus-container');
	atButton.onclick = function clickTogether(event) {
		infoBar.className = 'sum';
		for (var i = 0; i < buttonList.length; i++)
			infoBar.innerText += lis[buttonList[i]].id;
		infoBar.innerText += '\n';
		clickHandler(0, lis, buttonList);
	}
}

function clickHandler(i, lis, buttonList) {
	lis[buttonList[i]].children[0].className = 'unread';
	lis[buttonList[i]].children[0].innerText = '···';
	for (var j = 0; j < lis.length; j++)
		if (lis[j].className.indexOf('disable') < 0) lis[j].className += '  disabled';
	ajaxHandler(lis, i, buttonList);
}

function ajaxHandler(lis, i, buttonList) {
	var xmlHttp;
	if (window.XMLHttpRequest)
		xmlHttp = new XMLHttpRequest();
	else
		xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			xmlStateChange(lis[buttonList[i]], xmlHttp.responseText);
			if (i++ < buttonList.length-1)
				clickHandler(i, lis, buttonList);
		}
	}
	xmlHttp.open("GET","/key="+i.toString(),true);
	xmlHttp.send();
}

function xmlStateChange(li, text) {
	var lis = document.getElementsByTagName('li');
	var finished = 0;
	for (var i = 0; i < lis.length; i++) {
		if (lis[i] == li)
			li.children[0].innerText = text;
		else if (lis[i].children[0].innerText == '')
			lis[i].className = lis[i].className.substring(0, lis[i].className.indexOf('  disabled'));
		if (lis[i].children[0].innerText != '')
			finished++;
	}
	if (finished == 5)
		document.getElementById('info-bar').onclick();
}
