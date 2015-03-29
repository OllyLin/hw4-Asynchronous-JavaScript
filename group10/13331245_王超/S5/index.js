window.onload = function() {
	var bubbles = document.getElementsByClassName('bubble');
	CreatClickBubbles(bubbles);
	document.getElementById('info-bar').onclick = null;
	document.getElementById('info-bar').style.background = "gray";
	document.getElementById('at-plus-container').onmouseleave = function() {
		clearAll();
	};
	document.getElementsByClassName('apb')[0].onclick = function() {
		RobotHandle(bubbles);
	}
}

function clearAll() {
	location.reload();
}

function CreatClickBubbles(bubbles) {
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].lastChild.style.display = 'none';
		bubbles[i].onclick = function(index) {
			return function() {
				BubbleClickHandler(bubbles[index], bubbles);
			}
		}(i);
	}
}

function BubbleClickHandler(Ibubble, bubbles) {
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

function BigBubbleHandle(currentSum) {
	document.getElementById('Sum').innerHTML = currentSum;
	document.getElementById('messages').innerHTML = '楼主异步调用战斗力感人，目测不超过' + currentSum;
	var BigBubble = document.getElementById('info-bar');
	BigBubble.style.background = 'gray';
	BigBubble.onclick = null;
}

function RobotHandle(bubbles) {
	var random = [0,1,2,3,4];
	random.sort(function() {
        return Math.random() - 0.5;
    });
    for (var i = 0; i < 5; i++) {
        document.getElementById('random').innerHTML += String.fromCharCode(random[i] + 65);
    }
    document.getElementsByClassName('apb')[0].onclick = null;
    clickNextBotton(0, 0, random);
}

function clickNextBotton(currentSum, index, random) {
	if (index === 5) {
		BigBubbleHandle(currentSum);
		return;
	}
	switch(random[index]) {
		case 0:
			aHandler(currentSum, index, random, function(nextIndex, sum) {
				clickNextBotton(sum, nextIndex, random);
			});
			break;
		case 1:
			bHandler(currentSum, index, random, function(nextIndex, sum) {
				clickNextBotton(sum, nextIndex, random);
			});
			break;
		case 2:
			cHandler(currentSum, index, random, function(nextIndex, sum) {
				clickNextBotton(sum, nextIndex, random);
			});
			break;
		case 3:
			dHandler(currentSum, index, random, function(nextIndex, sum) {
				clickNextBotton(sum, nextIndex, random);
			});
			break;
		case 4:
			eHandler(currentSum, index, random, function(nextIndex, sum) {
				clickNextBotton(sum, nextIndex, random);
			});
			break;
	}
}

function failedToHandle() {
	if (Math.random() < 0.5) {
		return true;
	} else {
		return false;
	}
}

function RobotAjaxGet(Ibubble, callee) {
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
			callee(Number(Ibubble.lastChild.innerHTML));
		}
	}
	xmlHttp.open("GET","/",true);
	xmlHttp.send(null);
}

function aHandler(currentSum, index, random, callee) {
    var bubbles = document.getElementsByClassName('bubble');
    bubbles[0].lastChild.style.display = 'block';
	bubbles[0].lastChild.innerHTML = '...';
	bubbles[0].onclick = null;
	DisableOtherBubbles();
	messages = document.getElementById('messages');
    if (failedToHandle()) {
        messages.innerHTML = '这不是个天大的秘密';
        callee(index, currentSum);
    } else {
        messages.innerHTML = '这是个天大的秘密';
        RobotAjaxGet(bubbles[0], function(number) {
        	callee(index+1, number+currentSum);
        });
    }
}

function bHandler(currentSum, index, random, callee) {
    var bubbles = document.getElementsByClassName('bubble');
    bubbles[1].lastChild.style.display = 'block';
	bubbles[1].lastChild.innerHTML = '...';
	bubbles[1].onclick = null;
	DisableOtherBubbles();
	messages = document.getElementById('messages');
    if (failedToHandle()) {
        messages.innerHTML = '我知道';
        callee(index, currentSum);
    } else {
        messages.innerHTML = '我不知道';
        RobotAjaxGet(bubbles[1], function(number) {
        	callee(index+1, number+currentSum);
        });
    }
}

function cHandler(currentSum, index, random, callee) {
    var bubbles = document.getElementsByClassName('bubble');
    bubbles[2].lastChild.style.display = 'block';
	bubbles[2].lastChild.innerHTML = '...';
	bubbles[2].onclick = null;
	DisableOtherBubbles();
	messages = document.getElementById('messages');
    if (failedToHandle()) {
        messages.innerHTML = '你知道';
        callee(index, currentSum);
    } else {
        messages.innerHTML = '你不知道';
        RobotAjaxGet(bubbles[2], function(number) {
        	callee(index+1, number+currentSum);
        });
    }
}

function dHandler(currentSum, index, random, callee) {
    var bubbles = document.getElementsByClassName('bubble');
    bubbles[3].lastChild.style.display = 'block';
	bubbles[3].lastChild.innerHTML = '...';
	bubbles[3].onclick = null;
	DisableOtherBubbles();
	messages = document.getElementById('messages');
    if (failedToHandle()) {
        messages.innerHTML = '他知道';
        callee(index, currentSum);
    } else {
        messages.innerHTML = '他不知道';
        RobotAjaxGet(bubbles[3], function(number) {
        	callee(index+1, number+currentSum);
        });
    }
}

function eHandler(currentSum, index, random, callee) {
    var bubbles = document.getElementsByClassName('bubble');
    bubbles[4].lastChild.style.display = 'block';
	bubbles[4].lastChild.innerHTML = '...';
	bubbles[4].onclick = null;
	DisableOtherBubbles();
	messages = document.getElementById('messages');
    if (failedToHandle()) {
        messages.innerHTML = '正常';
        callee(index, currentSum);
    } else {
        messages.innerHTML = '才怪';
        RobotAjaxGet(bubbles[4], function(number) {
        	callee(index+1, number+currentSum);
        });
    }
}