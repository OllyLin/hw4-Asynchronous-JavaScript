
window.onload = function() {
	var done = [];
	var clicked = false;
	document.getElementById('atplusbtn').onclick = function(clicked, done) {
		return function() {
			if (clicked == true)
				return;
			var letters = ['A', 'B', 'C', 'D', 'E'];
			var order = [0, 1, 2, 3, 4];
			var nextBtn = [];
			getOrder(order, letters, nextBtn);
			var btnGroup = [];
			getAllButton(btnGroup, nextBtn, done);
			var result = new resultBox(document.getElementById('resultBox'), document.getElementById('result'), btnGroup);
			result.setClickEvent();
			document.getElementById('at-plus-container').onmouseleave = function() {
				clicked = false;
				clearAllPattern(btnGroup, result, done);
			};
			btnGroup[order[0]].button.click();
			clicked = true;
		}
	}(clicked, done);
}

var record = function(order, btnpos, letter) {
	this.order = order;
	this.btnpos = btnpos;
	this.letter = letter;
}

function getOrder(order, letters, nextBtn) {
	order.sort(function(r1, r2) {
		return Math.random()>0.5 ? -1 : 1;
	});
	var str = '';
	for (var j = 0; j < order.length; j++) {
		str = str+letters[order[j]]+' ';
	}
	document.getElementById('order').textContent = str;
	order.push(-1);
	for (var j = 0; j < 5; j++) {
		nextBtn[order[j]] = order[j+1];
	}	
}
var interactiveButton = function(button, textBox, btnGroup, nextBtn, done) {
	this.button = button;
	this.textBox = textBox;
	this.btnGroup = btnGroup;
	this.nextBtn = nextBtn;
	this.done = done;
	this.active = true;
	this.setClickEvent = function() {
		this.button.onclick = function(curBtn) {
			return function() {
				if (!curBtn.active)
					return;
				if (curBtn.done.indexOf(curBtn.button.getAttribute("id")) != -1)
					return;
				done.push(curBtn.button.getAttribute("id"));
				curBtn.textBox.textContent = '...';
				curBtn.textBox.style.visibility = 'visible';
				disableOtherButton(curBtn.button.getAttribute("id"), curBtn.btnGroup);
				getRandomNum(curBtn.textBox.getAttribute("id"), curBtn.button.getAttribute("id"), curBtn.btnGroup, curBtn.nextBtn);
			};
		}(this);
	};
}
function disableOtherButton(btnId, btnGroup) {
	for (var i = 0; i < btnGroup.length; i++) {
		if (btnGroup[i].button.getAttribute("id") == btnId) {
			btnGroup[i].active = true;
			btnGroup[i].button.style.backgroundColor = '#2146A1';
			continue;
		}
		btnGroup[i].active = false;
		btnGroup[i].button.style.backgroundColor = '#7E7E7E';
	}
}
function enableOtherButton(btnId, btnGroup) {
	for (var i = 0; i < btnGroup.length; i++) {
		if (btnGroup[i].button.getAttribute("id") == btnId) {
			btnGroup[i].active = false;
			btnGroup[i].button.style.backgroundColor = '#7E7E7E';
			continue;
		}
		btnGroup[i].active = true;
		btnGroup[i].button.style.backgroundColor = '#2146A1';
	}
}
function getRandomNum(textId, btnId, btnGroup, nextBtn) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    		document.getElementById(textId).textContent = xmlhttp.responseText;
    		enableOtherButton(btnId, btnGroup);
    		if (nextBtn >= 0 && nextBtn <= 4) {
    			btnGroup[nextBtn].button.click();
    		} else {
    			document.getElementById('resultBox').click();
    		}
    	}
  	}
	xmlhttp.open("GET","/",true);
	xmlhttp.send();
}
function getAllButton(group, nextBtn, done) {
	var btns = document.getElementsByName('button');
	var boxes = document.getElementsByName('textbox');
	for (var i = 0; i < btns.length; i++) {
		var cur = new interactiveButton(btns[i], boxes[i], group, nextBtn[i], done);
		cur.setClickEvent();
		group.push(cur);
	}
}
var resultBox = function(box, textBox, btnGroup) {
	this.box = box;
	this.textBox = textBox;
	this.btnGroup = btnGroup;
	this.active = 0;
	this.setClickEvent = function() {
		this.box.onclick = function(curBox) {
			return function() {
				if (curBox.active == 2)
					return;
				if (checkAllButton(curBox.btnGroup))
					curBox.active = 1;
				if (!curBox.active)
					return;
				curBox.textBox.textContent = sum(curBox.btnGroup);
				curBox.active = 2;
			};
		}(this);
	};
}
function checkAllButton(btnGroup) {
	for (var i = 0; i < btnGroup.length; i++) {
		if (btnGroup[i].textBox.textContent == '...') {
			return false;
		}
	}
	return true;
}
function sum(btnGroup) {
	var sum = 0;
	for (var i = 0; i < btnGroup.length; i++) {
		sum += parseInt(btnGroup[i].textBox.textContent);
	}
	return sum;
}
function clearAllPattern(btnGroup, result, done) {
	for (var i = 0; i < btnGroup.length; i++) {
		btnGroup[i].active = true;
		btnGroup[i].textBox.textContent = '...';
		btnGroup[i].textBox.style.visibility = 'hidden';
		btnGroup[i].button.style.backgroundColor = '#2146A1';
	}
	done.splice(0);
	result.textBox.textContent = '';
	result.active = 0;
}
