window.onload = function() {
	reset();
	
	//为大气泡绑定事件
	var info = document.getElementById('info-bar');
	info.addEventListener('click', info_event, false);

	//为所有按钮绑定事件
	var buttons = document.getElementsByClassName('button');
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener("click", function() {button_event(this, info)}, false);
	}

	/*
	如果对整个button的div使用mouseout或者mouseleave来绑定事件，就会有时点击按钮时会触发这个reset事件，快速点击
	A-E这五个按钮会更加明显触发这个bug。解决方法如下:
	*/

	/*
	为@+绑定事件,只有当它完成了样式transition的事件后才能触发reset事件
	这样一来就可以避免mouseout或者mouseleave的bug
	*/
	var apb = document.getElementsByClassName('apb')[0];
	apb.addEventListener('transitionend', reset, false);
}

//把对应的标签灭活
function disable(temps) {
	if (Array.isArray(temps)) {
		for (var i = 0; i < temps.length; i++) {
			temps[i].classList.remove('enable');
			temps[i].classList.add('disable');
		}
	} else {
		temps.classList.remove('enable');
		temps.classList.add('disable');
	}
}

//把对应的标签激活
function enable(temps) {
	if (Array.isArray(temps)) {
		for (var i = 0; i < temps.length; i++) {
			temps[i].classList.remove('disable');
			temps[i].classList.add('enable');
		}
	} else {
		temps.classList.remove('disable');
		temps.classList.add('enable');
	}
}

//把对应的按钮数字区域隐藏
function hide(buttons) {
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].children[0].style.display = "none";
		buttons[i].children[0].innerHTML = "...";
	}
}

//把对应的按钮数字区域显示
function show(button) {
	button.children[0].style.display = "block";
}

//判断是否所有按钮是否都得到了数字
function is_get_all() {
	var buttons = document.getElementsByClassName('button');
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].children[0].innerHTML === '...') return false;
	}
	return true;
}

//重置计算器
function reset() {
	var info = document.getElementById('info-bar');
	disable(info);
	var sum = document.getElementsByClassName('mysum')[0];
	sum.innerHTML = '';
	var buttons = document.getElementsByClassName('button');

	//通过调用数组的slice方法把buttons形成数组
	buttons = [].slice.call(buttons);
	enable(buttons);
	hide(buttons);
}

//计算出所有数字的总和
function sum_of_number() {
	if (!is_get_all()) return 0;
	var buttons = document.getElementsByClassName('button');
	var result = 0;
	for (var i = 0; i < buttons.length; i++) {
		result += Number(buttons[i].children[0].innerHTML);
	}
	return result;
}

//大气泡事件
function info_event() {
	var info = document.getElementById('info-bar');
	var sum = document.getElementsByClassName('mysum')[0];
	if (!is_get_all()||info.classList.contains('disable')) {
		return;
	}
	sum.innerHTML = sum_of_number();
	disable(info);
}

//当服务器返回成功时的操作
function success(temp, button, xmlhttp) {
	button.children[0].innerHTML = xmlhttp.responseText;

	//激活剩余未获得数字的按钮
	enable(temp);

	//灭活本身
	disable(button);

	//若所有按钮都得到了数字，激活大气泡
	if (is_get_all()) {
		enable(options.info);
	}

}

//按钮事件
function button_event(button, info) {

	var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsot.XMLHTTP');

	//如果此时按钮处于正在获取数据或者灭活状态则不允许进行这个事件.
	if (button.children[0].style.display === 'block') return;
	if (button.classList.contains('disable')) return;
	show(button);

	var temp = new Array();
	var buttons = document.getElementsByClassName('button');
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i] !== button&&buttons[i].classList.contains('enable')) {
			temp.push(buttons[i]);
		}
	}

	//灭活其他未获得数字的按钮
	disable(temp);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				button.children[0].innerHTML = xmlhttp.responseText;

				//激活剩余未获得数字的按钮
				enable(temp);

				//灭活本身
				disable(button);

				//若所有按钮都得到了数字，激活大气泡
				if (is_get_all()) {
					enable(info);
				}
			}
		}
	}
	xmlhttp.open("GET", "/", true);
	xmlhttp.send();
}

