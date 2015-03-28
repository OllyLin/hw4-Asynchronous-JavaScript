window.onload = function() {
	var atplus = document.getElementById("at-plus-container");
	var numlist = document.getElementsByClassName('num');
	var bubble = document.getElementsByClassName('info')[0];
	for (var i = 0; i < numlist.length; i++) {
		numlist[i].style.display = 'none';
		numlist[i].parentNode.onclick = atoeHandler;
	}
	bubble.onclick = bubbleHandler;

	atplus.onmouseleave = reset;
}
// ------原生JS实现添加类、删除类函数------
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
var count = 0;
var sum = 0;
function atoeHandler() {
	var that = this.childNodes[0];  // 保存住this的span元素
	var that2 = this;  // 保存住this
	var atplus = document.getElementById("at-plus-container");
	atplus.stopajax = false;
	var icontest = document.getElementsByClassName('button');
	if (!hasClass(that.parentNode, "clicked") && !hasClass(that.parentNode, "cannotclick")) {
		for (var i = 0; i < icontest.length; i++) {
			if (icontest[i] != this) {
				icontest[i].style.backgroundColor = 'rgba(0,0,20,.6)';
				addClass(icontest[i], "cannotclick"); // 让这个图标暂时变成点击之后没效果
			}
		}
		that.style.display = 'inline';
		addClass(that.parentNode, "clicked");  // 表明该图标已经点击过

	    var xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://localhost:3000/", true);
	    xhr.onreadystatechange = function() {
	    	var atplus = document.getElementById("at-plus-container"); 
	    	if (xhr.readyState == 4 && xhr.status == 200) {  // 一定要有这句话
		    	if (atplus.stopajax == true) return;
		    	that.innerHTML = xhr.responseText;
		    	var n = parseInt(xhr.responseText);
		    	that.parentNode.style.backgroundColor = 'rgba(0,0,20,.6)';
		    	if (!isNaN(n)) sum += n;
		    	count++;
		    	// console.log(count);
		    	// console.log(sum);
		    	if (count == 5) {
		    		var bubble = document.getElementsByClassName('info')[0];
					bubble.style.backgroundColor = 'rgba(48,63,159,1)';
					bubble.style.transition = 'all 0.6s'
		    	}
				for (var i = 0; i < icontest.length; i++) {
					if (icontest[i] != that2 && !hasClass(icontest[i], "clicked")) {
						icontest[i].style.backgroundColor = 'rgba(48,63,159,1)';
						removeClass(icontest[i], "cannotclick"); // 让这个图标恢复可以点击
					}
				}
			}
		}
	    xhr.send(null);  // 没有这句话会有问题
	}
}

function bubbleHandler() {
	if (count == 5) {
		document.getElementsByClassName("sum")[0].innerHTML = sum;
		this.style.backgroundColor = 'rgba(0,0,20,.6)';
	}
}

function reset() {
	var atplus = document.getElementById("at-plus-container");
	atplus.stopajax = true;
	var numlist = document.getElementsByClassName('num');
	for (var i = 0; i < numlist.length; i++) {
		numlist[i].innerHTML = '...';
		numlist[i].style.display = 'none';
		removeClass(numlist[i].parentNode, "cannotclick");
		removeClass(numlist[i].parentNode, "clicked");
		numlist[i].parentNode.style.backgroundColor = 'rgba(48,63,159,1)';
	}
	var bubble = document.getElementsByClassName('info')[0];
	bubble.style.backgroundColor = 'rgba(0,0,20,.6)';
	var s = document.getElementsByClassName('sum')[0];
	s.innerHTML = '';
	sum = count = 0;
	location.reload();
}
