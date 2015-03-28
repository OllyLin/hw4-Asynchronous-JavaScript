/* 13331078 hujiangchuan */
$ = function(id) {
	return document.getElementById(id);
}
$$ = function(className) {
	return document.getElementsByClassName(className);
}

window.onload = function() {
	reset();
	var menuArea = $('button');
	menuArea.onmouseleave = reset;
}

function connectServer(callback) {
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
    } else return;
	xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open('GET', '../server', true);
    xmlhttp.send();
}

function ButtonsInit() {
	var buttons = $$('button');
	for(var i = 0; i < buttons.length; ++i) {
		buttons[i].bannedforever = 0;
		buttons[i].disabled = false;
		buttons[i].classList.remove('banned');
		buttons[i].onclick = function(i) {
			return function() {
				if (this.disabled) {return};
				bannedButtons(this, buttons);
				this.childNodes[1].innerHTML = '...';
				this.childNodes[1].style.visibility = 'visible';
				connectServer(function(data) {
					buttons[i].childNodes[1].innerHTML = data;
					bannedButtons(null, buttons);
					enableButtons(buttons);
					checkInfoIsReady(buttons);
					robot();
				});
			}
		}(i);
	}
}

function bannedButtons(except, buttons) {
	for(var i = 0; i < buttons.length; ++i) {
		buttons[i].classList.add('banned');
		buttons[i].disabled = true;
	}
	if (except != null && except.bannedforever == 0) {
		except.classList.remove('banned');
		except.bannedforever = 1;
	}
}

function enableButtons(buttons) {
	for(var i = 0; i < buttons.length; ++i) {
		if (buttons[i].bannedforever == 0) {
			buttons[i].classList.remove('banned');
			buttons[i].disabled = false;
		}
	}
}

function getSum(tips) {
	var sum = 0;
	for(var i = 0; i < tips.length; ++i) {
		sum += parseInt(tips[i].innerHTML);
	}
	$('result').innerHTML = sum;
}

function checkInfoIsReady(buttons) {
	var info = $$('info')[0];
	for(var i = 0; i < buttons.length; ++i) {
		if (buttons[i].disabled == false) {
			return;
		}
	}
	info.disabled = false;
	info.classList.remove('banned');
	robot(5);
}

function reset() {
	var tips = $$('tip');
	for(var i = 0; i < tips.length; ++i) {
		tips[i].style.visibility = 'hidden';
		tips[i].innerHTML = '';
	}
	var info = $$('info')[0];
	info.disabled = true;
	info.classList.add('banned');
	info.onclick = function() {
		if (info.disabled) {return;}
		getSum(tips);
		this.disabled = true;
		this.classList.add('banned');
	}
	$('result').innerHTML = '';
	ButtonsInit();

	var arr = [];
	for(var i = 0; i < 5; ++i) {  //65 -> A
		arr[i] = String.fromCharCode(65 + i);
	}
	arr.sort( function() {return 0.5 - Math.random();} );
	$('order').order = arr;
	$('order').index = 0;
	$('order').innerHTML = arr.join();
	$('order').style.visibility = 'hidden';

	$$('icon')[0].disabled = false;
	$$('icon')[0].onclick = function() {    //in random order
		$('order').style.visibility = 'visible';
		if (this.disabled == false) {
			$$('icon')[0].disabled = true;
			robot();
		}
	}
}

function robot() {
	if($$('icon')[0].disabled == true) {
		if ($('order').index == 5) {
			$$('info')[0].click();
		} else {
			var index = $('order').order[$('order').index++].charCodeAt()-65;
			if ($$('button')[index].bannedforever == 1){
				robot();
			}
			$$('button')[index].click();
		}
	}
}
