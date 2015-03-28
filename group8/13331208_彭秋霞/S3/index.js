
window.onload = function() {
	var done = [];
	var btnGroup = [];
	getAllButton(btnGroup, done);
	var result = new resultBox(document.getElementById('resultBox'), document.getElementById('result'), btnGroup);
	result.setClickEvent();
	var clicked = false;
	document.getElementById('at-plus-container').onmouseleave = function() {
		clicked = false;
		clearAllPattern(btnGroup, result, done);
	};
	document.getElementById('atplusbtn').onclick = function() {
		if (clicked == true)
			return;
		btnGroup[0].button.click();
		btnGroup[1].button.click();
		btnGroup[2].button.click();
		btnGroup[3].button.click();
		btnGroup[4].button.click();
		clicked = true;
	};
}
var interactiveButton = function(button, textBox, btnGroup, done) {
	this.button = button;
	this.textBox = textBox;
	this.btnGroup = btnGroup;
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
    		document.getElementById('resultBox').click();
    	}
  	}
	xmlhttp.open("GET","/"+textId,true);
	xmlhttp.send();
}
function getAllButton(group, done) {
	var btns = document.getElementsByName('button');
	var boxes = document.getElementsByName('textbox');
	for (var i = 0; i < btns.length; i++) {
		var cur = new interactiveButton(btns[i], boxes[i], group, done);
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
