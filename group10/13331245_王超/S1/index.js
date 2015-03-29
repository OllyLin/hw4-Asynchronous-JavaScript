window.onload = function() {
	CreatClickBubbles();
	document.getElementById('info-bar').onclick = null;
	document.getElementById('info-bar').style.background = "gray";
	document.getElementById('at-plus-container').onmouseleave = function() {
		clearAll();
	};
}

function clearAll() {
	location.reload();
}

function CreatClickBubbles() {
	var bubbles = document.getElementsByClassName('bubble');
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].lastChild.style.display = 'none';
		bubbles[i].onclick = function() {
			BubbleClickHandler(this);
		};
	}
}

function BubbleClickHandler(Ibubble) {
	Ibubble.lastChild.style.display = 'block';
	Ibubble.lastChild.innerHTML = '...';
	Ibubble.onclick = null;
	DisableOtherBubbles();
	AjaxGet(Ibubble);
}

function AjaxGet(Ibubble) {
	var xmlHttp;
	if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	}
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState==4 && xmlHttp.status==200) {
			Ibubble.lastChild.innerHTML = xmlHttp.responseText;
			Ibubble.style.background = 'gray';
			EnableOtherBubbles();
		}
	}
	xmlHttp.open("GET","/",true);
	xmlHttp.send(null);
}

function DisableOtherBubbles() {
	var bubbles = document.getElementsByClassName('bubble');
	for (var i = 0; i < bubbles.length; i++) {
		if (bubbles[i].lastChild.style.display == 'none') {
			bubbles[i].onclick = null;
			bubbles[i].style.background = 'gray';
		}
	}
}

function EnableOtherBubbles() {
	var flag = true;
	var bubbles = document.getElementsByClassName('bubble');
	for (var i = 0; i < bubbles.length; i++) {
		if (bubbles[i].lastChild.style.display == 'none') {
			flag = false;
			bubbles[i].style.background = 'rgba(48,63,159,1)';
			bubbles[i].onclick = function() {
				BubbleClickHandler(this);
			}
		}
	}
	if (flag) {
		document.getElementById('info-bar').style.background = 'rgba(48,63,159,1)';
		document.getElementById('info-bar').onclick = function() {
			SumHandle(this);
		}
	}
}

function SumHandle(BigBubble) {
	var bubbles = document.getElementsByClassName('bubble');
	var sum = 0;
	for (var i = 0; i < bubbles.length; i++) {
		 sum += Number(bubbles[i].lastChild.innerHTML);
	}
	document.getElementById('Sum').innerHTML = String(sum);
	BigBubble.style.background = 'gray';
	BigBubble.onclick = null;
}
