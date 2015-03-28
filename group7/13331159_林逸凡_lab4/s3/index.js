window.onload = function() {
	var buttons = document.getElementById('control-ring-container').getElementsByTagName('li');
	var sum = document.getElementById('info-bar');
	var calculator = document.getElementById('at-plus-container');
	var at_plus = document.getElementsByClassName('apb')[0];
	var xhrList = [];
	
	for (var i = 0; i < buttons.length; i++) {     //激活每一个按钮
		enable(buttons[i]);
		xhrList[i] = new XMLHttpRequest();
		buttons[i].addEventListener('click', function(i) {    //给每个按钮设置click的监听器，click时获取随机数
			return function(event) {
				var that = buttons[i];
				if (that.classList.contains('enable')) {
					var randomNum;
					var num = that.children[1];
					if (event.x) {
						for (var j = 0; j < buttons.length; j++) {
							if (buttons[j] != that) {
								disable(buttons[j]);
							}
						}
					}
					num.classList.remove('hidden');
					num.classList.add('show');
					num.innerHTML = '...';
					xhrList[i].onreadystatechange = function() {
						console.log(that);
						if (xhrList[i].readyState == 4 && xhrList[i].status == 200) {
							randomNum = xhrList[i].responseText;
							num.innerHTML = randomNum;
							for (var j = 0; j < buttons.length; j++) {
								if (buttons[j].children[1].innerHTML == '...') {
									enable(buttons[j]);
								} else {
									disable(buttons[j]);
								}
							}
							disable(buttons[i]);
							if (allNumGet()) {
								var sum = document.getElementById('info-bar');
								enable(sum);
								if (!event.x) {
									sum.click();
								}
							}
						}
					}
					xhrList[i].open('GET', '/t=' + Math.random(), true);
					xhrList[i].send();
				}
			};
		}(i));
	}

	calculator.addEventListener('mouseout', function(e) {     //给整个计算器设置mouseout的监听器，用于重置
	    if (!e) {
	        e = window.event;
	    }
	    var target = e.relatedTarget ? e.relatedTarget : e.toElement;
	    while (target && target != this) {
	        target = target.parentNode;
	    }
	    if (target != this) {
	    	var sum = document.getElementById('info-bar');
			var buttons = document.getElementById('control-ring-container').getElementsByTagName('li');
			sum.classList.remove('enable');
			sum.classList.add('disable');
			sum.getElementsByClassName('page_comment')[0].innerHTML = '';
			for (var i = 0; i < buttons.length; i++) {
				xhrList[i].abort();
				buttons[i].children[1].classList.remove('show');
				buttons[i].children[1].classList.add('hidden');
				buttons[i].children[1].innerHTML = '...';
				enable(buttons[i]);
			}
		}
	});

	at_plus.addEventListener('click', function() {     //给a+按钮设置click的监听器，click时点击所有按钮
		buttons[0].click();
		buttons[1].click();
		buttons[2].click();
		buttons[3].click();
		buttons[4].click();
	});

	sum.addEventListener('click', getSum);     //给大气泡设置click的监听器，click时求和
}

function disable(button) {     //灭活按钮
	button.classList.remove('enable');
	button.classList.add('disable');
}

function enable(button) {     //激活按钮
	button.classList.remove('disable');
	button.classList.add('enable');
}

function allNumGet() {    //判断是不是已经获得所有的数
	var num = document.getElementById('control-ring-container').getElementsByTagName('li');
	for (var i = 0; i < num.length; i++) {
		if (num[i].children[1].innerHTML == '...') {
			return false;
		}
	}
	return true;
}

function getSum() {   //求和
	if (this.classList.contains('enable')) {
		var output = this.getElementsByClassName('page_comment')[0];
		var num = document.getElementById('control-ring-container').getElementsByTagName('li');
		var sum = 0;
		for (var i = 0; i < num.length; i++) {
			sum += parseInt(num[i].children[1].innerHTML);
		}
		output.innerHTML = sum;
		this.classList.remove('enable');
		this.classList.add('disable');
	}
}
