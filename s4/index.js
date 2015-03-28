window.onload = function() {
	var buttons = document.getElementById('control-ring-container').getElementsByTagName('li');
	var sum = document.getElementById('info-bar');
	var calculator = document.getElementById('at-plus-container');
	var at_plus = document.getElementsByClassName('apb')[0];
	var xhr = new XMLHttpRequest();

	var sequence = [0,1,2,3,4];
	var choice = 0;
	sequence.sort(function(){return Math.random()>0.5?-1:1;});
	alert(sequence);

	for (var i = 0; i < buttons.length; i++) {     //激活每一个按钮
		enable(buttons[i]);
		buttons[i].addEventListener('click', function(i) {    //给每个按钮设置click的监听器，click时获取随机数
			return function() {
				choice += 1;
				var that = this;
				if (that.classList.contains('enable')) {
					var randomNum;
					var num = this.children[1];
					for (var j = 0; j < buttons.length; j++) {
						if (buttons[j] != this) {
							disable(buttons[j]);
						}
					}
					num.classList.remove('hidden');
					num.classList.add('show');
					num.innerHTML = '...';
					xhr.onreadystatechange = function() {
						if (xhr.readyState == 4 && xhr.status == 200) {
							randomNum = xhr.responseText;
							num.innerHTML = randomNum;
							for (var j = 0; j < buttons.length; j++) {
								if (buttons[j].children[1].innerHTML == '...') {
									enable(buttons[j]);
								} else {
									disable(buttons[j]);
								}
							}
							if (allNumGet()) {
								var sum = document.getElementById('info-bar');
								enable(sum);
								sum.click();
							} else {     //点击下一个button
								buttons[sequence[choice]].click();
							}
						}
					}
					xhr.open('GET', '/', true);
					xhr.send();
				}
			}
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
	    	xhr.abort();
	    	choice = 0;
	    	sequence.sort(function(){return Math.random()>0.5?-1:1;}); 
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

	at_plus.addEventListener('click', function() {     //给a+按钮设置click的监听器，click时从第一个按钮开始按
		buttons[sequence[choice]].click();
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

function allNumGet() {    //判断是不是已经获得所有数据
	var num = document.getElementById('control-ring-container').getElementsByTagName('li');
	for (var i = 0; i < num.length; i++) {
		if (num[i].children[1].innerHTML == '...') {
			return false;
		}
	}
	return true;
}

function getSum() {     //求和
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
