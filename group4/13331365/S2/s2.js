var sum = 0;
var count = 0;

window.onload = function() {
	var atplus = document.getElementById("at-plus-container");
	var numlist = document.getElementsByClassName('num');
	var icon = document.getElementsByClassName('icon')[0];

	for (var i = 0 ; i < numlist.length ; i++) {
		numlist[i].style.display = 'none';
	}

	atplus.onmouseleave = reset;
	icon.onclick = allStart;
}

// ------借鉴：原生JS实现添加类、删除类函数------
function hasClass(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
  
function addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
}  
  
function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ');  
    }
}
// -------------------------------------

function allStart() {
	var buttons = document.getElementsByClassName('button');
	getNum(buttons[0]);
}

function getNum(obj) {
	var mythis = obj;
	if (mythis != null) {
		if (!hasClass(mythis, 'clicked') && !hasClass(mythis, 'disable')) {
			count++; // 记录多少个已经被点击
			mythis.childNodes[0].style.display = 'inline';
			var buttons = document.getElementsByClassName('button');
			for (var i = 0 ; i < buttons.length ; i++) {
				addClass(buttons[i], 'disable');
				//变成灰色
				if (buttons[i] != this) {
					buttons[i].style.backgroundColor = 'rgba(0,0,20,.6)';
				}
			}
			addClass(mythis, 'clicked');

			var xhr = new XMLHttpRequest();
		    xhr.open("GET", "http://localhost:3000/", true);
		    xhr.onreadystatechange = function() {
		    	var atplus = document.getElementById("at-plus-container"); 
		    	if (xhr.readyState == 4 && xhr.status == 200) {
			    	mythis.childNodes[0].innerHTML = xhr.responseText;
					sum = sum + parseInt(xhr.responseText);
					for (var i = 0 ; i < buttons.length ; i++) {
						if (!hasClass(buttons[i], 'clicked') && hasClass(buttons[i], 'disable')) {
							removeClass(buttons[i], 'disable');
			    			buttons[i].style.backgroundColor = 'rgba(48, 63, 159, 1)';
						} else if (hasClass(buttons[i], 'clicked')) {
							buttons[i].style.backgroundColor = 'rgba(0,0,20,.6)';
						}
					}
					//激活大气泡
					if (count == 5) {
						document.getElementsByClassName('info')[0].style.backgroundColor = 'rgba(48,63,159,1)';
					}
			    	getNum(mythis.nextSibling.nextSibling);
				}
			}
		    xhr.send(null);  // 没有这句话会有问题
		}
	} else {
		getSum();
	}
}
function getSum() {
	if (count == 5) {
		document.getElementsByClassName("sum")[0].innerHTML = String(sum);
		this.style.backgroundColor = 'rgba(0,0,20,.6)';
	}
}
function reset() {
	var atplus = document.getElementById("at-plus-container");
	var numlist = document.getElementsByClassName('num');
	for (var i = 0; i < numlist.length; i++) {
		numlist[i].innerHTML = '...';
		numlist[i].style.display = 'none';
		removeClass(numlist[i].parentNode, "disable");
		removeClass(numlist[i].parentNode, "clicked");
		numlist[i].parentNode.style.backgroundColor = 'rgba(48,63,159,1)';
	}
	var bubble = document.getElementsByClassName('info')[0];
	bubble.style.backgroundColor = 'rgba(0,0,20,.6)';
	var s = document.getElementsByClassName('sum')[0];
	s.innerHTML = '';
	sum = count = 0;
}