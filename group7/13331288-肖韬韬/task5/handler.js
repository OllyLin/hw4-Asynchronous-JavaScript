window.onload = function inited() {
	var lis = document.getElementsByTagName('li');
	var infoBar = document.getElementById('info-bar');
	var atButton = document.getElementById('at-plus-container');
	var bottomPositioner = document.getElementById('bottom-positioner');
	var buttonList = [0, 1, 2, 3, 4];
	buttonList.sort(function(a, b) {
		return Math.random() > 0.5 ? 1 : -1;
	});

	infoBar.onclick = function calculateHandler() {
		var sum = 0;
		for (var i = 0; i < lis.length; i++)
			sum += parseInt(lis[i].children[0].innerText);
		if (!isNaN(sum))
			infoBar.innerText += '楼主异步调用战斗力感人，目测不超过'+sum.toString();
	}

	bottomPositioner.onmouseleave = function resetHandler() {
		for (var i = 0; i < lis.length; i++)
			if (lis[i].className.indexOf('disable') >= 0) {
				lis[i].className = lis[i].className.substring(0, lis[i].className.indexOf('  disabled'));
				lis[i].children[0].className = lis[i].children[0].innerText = '';
			}
		infoBar.className = infoBar.innerText = '';
		buttonList.sort(function(a, b) {
			return Math.random() > 0.5 ? 1 : -1;
		});
	}

	atButton.onclick = function clickTogether(event) {
		if (infoBar.className == 'sum') return;
		infoBar.className = 'sum';
		for (var i = 0; i < buttonList.length; i++)
			infoBar.innerText += lis[buttonList[i]].id;
		infoBar.innerText += '\n';
		lis[buttonList[0]].Handler(buttonList, 0, 0);
	}

	lis[0].Handler = function(buttonList, i, currentSum) {
		var liA = this;
		liA.children[0].className = 'unread';
		liA.children[0].innerText = '···';
		var xmlHttp;
		if (window.XMLHttpRequest)
			xmlHttp = new XMLHttpRequest();
		else
			xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				liA.children[0].innerText = xmlHttp.responseText;
				try {
					if (Math.random()*1000 < 800)
						infoBar.innerText += '这是个天大的秘密\n';
					else throw '这不是个天大的秘密\n';
				} catch(e) {
					infoBar.innerText += e;
				}
				liA.className += '  disabled';
				if (i++ < 4)
					lis[buttonList[i]].Handler(buttonList, i, currentSum+parseInt(xmlHttp.responseText));
				else if (i == 5)
					infoBar.onclick();
			}
		}
		xmlHttp.open("GET", "/key="+liA.id.toString(), true);
		xmlHttp.send();
	}

	lis[1].Handler = function(buttonList, i, currentSum) {
		var liB = this;
		liB.children[0].className = 'unread';
		liB.children[0].innerText = '···';
		var xmlHttp;
		if (window.XMLHttpRequest)
			xmlHttp = new XMLHttpRequest();
		else
			xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				liB.children[0].innerText = xmlHttp.responseText;
				try {
					if (Math.random()*1000 < 800)
						infoBar.innerText += '我不知道\n';
					else throw '我知道\n';
				} catch(e) {
					infoBar.innerText += e;
				}
				liB.className += '  disabled';
				if (i++ < 4)
					lis[buttonList[i]].Handler(buttonList, i, currentSum+parseInt(xmlHttp.responseText));
				else if (i == 5)
					infoBar.onclick();
			}
		}
		xmlHttp.open("GET", "/key="+liB.id.toString(), true);
		xmlHttp.send();
	}

	lis[2].Handler = function(buttonList, i, currentSum) {
		var liC = this;
		liC.children[0].className = 'unread';
		liC.children[0].innerText = '···';
		var xmlHttp;
		if (window.XMLHttpRequest)
			xmlHttp = new XMLHttpRequest();
		else
			xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				liC.children[0].innerText = xmlHttp.responseText;
				try {
					if (Math.random()*1000 < 800)
						infoBar.innerText += '你不知道\n';
					else throw '你知道\n';
				} catch(e) {
					infoBar.innerText += e;
				}
				liC.className += '  disabled';
				if (i++ < 4)
					lis[buttonList[i]].Handler(buttonList, i, currentSum+parseInt(xmlHttp.responseText));
				else if (i == 5)
					infoBar.onclick();
			}
		}
		xmlHttp.open("GET", "/key="+liC.id.toString(), true);
		xmlHttp.send();
	}

	lis[3].Handler = function(buttonList, i, currentSum) {
		var liD = this;
		liD.children[0].className = 'unread';
		liD.children[0].innerText = '···';
		var xmlHttp;
		if (window.XMLHttpRequest)
			xmlHttp = new XMLHttpRequest();
		else
			xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				liD.children[0].innerText = xmlHttp.responseText;
				try {
					if (Math.random()*1000 < 800)
						infoBar.innerText += '他不知道\n';
					else throw '他知道\n';
				} catch(e) {
					infoBar.innerText += e;
				}
				liD.className += '  disabled';
				if (i++ < 4)
					lis[buttonList[i]].Handler(buttonList, i, currentSum+parseInt(xmlHttp.responseText));
				else if (i == 5)
					infoBar.onclick();
			}
		}
		xmlHttp.open("GET", "/key="+liD.id.toString(), true);
		xmlHttp.send();
	}

	lis[4].Handler = function(buttonList, i, currentSum) {
		var liE = this;
		liE.children[0].className = 'unread';
		liE.children[0].innerText = '···';
		var xmlHttp;
		if (window.XMLHttpRequest)
			xmlHttp = new XMLHttpRequest();
		else
			xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				liE.children[0].innerText = xmlHttp.responseText;
				try {
					if (Math.random()*1000 < 800)
						infoBar.innerText += '才怪\n';
					else throw '才不怪\n';
				} catch(e) {
					infoBar.innerText += e;
				}
				liE.className += '  disabled';
				if (i++ < 4)
					lis[buttonList[i]].Handler(buttonList, i, currentSum+parseInt(xmlHttp.responseText));
				else if (i == 5)
					infoBar.onclick();
			}
		}
		xmlHttp.open("GET", "/key="+liE.id.toString(), true);
		xmlHttp.send();
	}
}
