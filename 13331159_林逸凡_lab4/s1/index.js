window.onload = function() {
	var buttons = document.getElementById('control-ring-container').getElementsByTagName('li');
	var sum = document.getElementById('info-bar');
	var calculator = document.getElementById('at-plus-container');
	var xhr = new XMLHttpRequest();

	for (var i = 0; i < buttons.length; i++) {     //激活每一个按钮
		enable(buttons[i]);
		buttons[i].addEventListener('click', function() {    //给每个按钮设置click的监听器，click时获取随机数
			if (this.classList.contains('enable')) {
				var randomNum;
				var num = this.children[1];
				var buttons = this.parentNode.children;
				for (var i = 0; i < buttons.length; i++) {
					if (buttons[i] != this) {
						disable(buttons[i]);
					}
				}
				console.log('click');
				num.classList.remove('hidden');
				num.classList.add('show');
				num.innerHTML = '...';
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4 && xhr.status == 200) {
						randomNum = xhr.responseText;
						num.innerHTML = randomNum;
						for (var i = 0; i < buttons.length; i++) {
							if (buttons[i].children[1].innerHTML == '...') {
								enable(buttons[i]);
							} else {
								disable(buttons[i]);
							}
						}
						if (allNumGet()) {
							var sum = document.getElementById('info-bar');
							sum.classList.remove('disable');
							sum.classList.add('enable');
						}
					}
				}
				xhr.open('GET', '/', true);
				xhr.send();
			}
		});
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
	    	xhr.abort();
	    	var sum = document.getElementById('info-bar');
			var buttons = document.getElementById('control-ring-container').getElementsByTagName('li');
			sum.classList.remove('enable');
			sum.classList.add('disable');
			sum.getElementsByClassName('page_comment')[0].innerHTML = '';
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].children[1].classList.remove('show');
				buttons[i].children[1].classList.add('hidden');
				buttons[i].children[1].innerHTML = '...';
				enable(buttons[i]);
			}
		}
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

function allNumGet() {    //求和
	var num = document.getElementById('control-ring-container').getElementsByTagName('li');
	for (var i = 0; i < num.length; i++) {
		if (num[i].children[1].innerHTML == '...') {
			return false;
		}
	}
	return true;
}

function getSum() {
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
