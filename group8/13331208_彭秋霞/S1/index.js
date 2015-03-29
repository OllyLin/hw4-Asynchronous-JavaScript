
window.onload = function() {
	var btnGroup = [];
	getAllButton(btnGroup);
	var result = new resultBox(document.getElementById('resultBox'), document.getElementById('result'), btnGroup);
	result.setClickEvent();
	document.getElementById('at-plus-container').onmouseleave = function() {
		clearAllPattern(btnGroup, result);
	};
}
var interactiveButton = function(button, textBox, btnGroup) {
	this.button = button;
	this.textBox = textBox;
	this.btnGroup = btnGroup;
	this.active = true;
	this.setClickEvent = function() {
		this.button.onclick = function(curBtn) {
			return function() {
				if (!curBtn.active)
					return;
				curBtn.textBox.textContent = '...';
				curBtn.textBox.style.visibility = 'visible';
				disableOtherButton(curBtn.button.getAttribute("id"), curBtn.btnGroup);
				getRandomNum(curBtn.textBox.getAttribute("id"), curBtn.button.getAttribute("id"), curBtn.btnGroup);
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
function getRandomNum(textId, btnId, btnGroup) {
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
    	}
  	}
	xmlhttp.open("GET","/",true);
	xmlhttp.send();
}
function getAllButton(group) {
	var btns = document.getElementsByName('button');
	var boxes = document.getElementsByName('textbox');
	for (var i = 0; i < btns.length; i++) {
		var cur = new interactiveButton(btns[i], boxes[i], group);
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
function clearAllPattern(btnGroup, result) {
	for (var i = 0; i < btnGroup.length; i++) {
		btnGroup[i].active = true;
		btnGroup[i].textBox.textContent = '...';
		btnGroup[i].textBox.style.visibility = 'hidden';
		btnGroup[i].button.style.backgroundColor = '#2146A1';
	}
	result.textBox.textContent = '';
	result.active = 0;
}
