function hasClass(ele, cls) {  
  return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
  
function addClass(ele, cls) {  
  if (!hasClass(ele, cls)) ele.className += " " + cls;  
}  
  
function removeClass(ele, cls) {  
  if (hasClass(ele, cls)) {  
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
      ele.className = ele.className.replace(reg, ' ');  
  }
}

function sendNum(span, xmlHttpReq, lis, i) {
	if (xmlHttpReq.readyState == 4 && xmlHttpReq.status == 200) {
    	span.innerHTML = xmlHttpReq.responseText;
    	for (var j = 0; j < lis.length; j++) {
    		if (hasClass(lis[j], "tempdisable")) {
    			removeClass(lis[j], "tempdisable");
    		}
    	}
    	addClass(lis[i], "disable");
    }
}

function getRandNum(i, lis) {
	temp = lis[i];
	if (!hasClass(temp, "disable") && !hasClass(temp, "tempdisable")) {
		span = temp.getElementsByTagName("span")[1];
		span.style.opacity = "1";
		span.innerHTML = "...";
		addClass(temp, "tempdisable");
		for (var j = 0; j < lis.length; j++) {
			if (!hasClass(lis[j], "disable") && lis[j] != temp) {
				addClass(lis[j], "tempdisable");
			}
		}
		var xmlHttpReq = null;
  		if (window.ActiveXObject) {
    		xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
  		} else if (window.XMLHttpRequest) {
      		xmlHttpReq = new XMLHttpRequest();
    	}

  		if (xmlHttpReq != null) {
    		xmlHttpReq.open("get", "/", true);
    		xmlHttpReq.send(null);
    		xmlHttpReq.onreadystatechange = function(span, xmlHttpReq, lis, i) {
    			return function() {
    				sendNum(span, xmlHttpReq, lis, i);
    			}
    		}(span, xmlHttpReq, lis, i);
  		}
	}
}

function getSum(lis, sumbar, sum) {
	var flag = 1;
	var s = 0;
	for (var i = 0; i < lis.length; i++) {
		if (!hasClass(lis[i], "disable")) {
			flag = 0;
		}
		var span = lis[i].getElementsByTagName("span")[1].innerHTML;
		s +=parseInt(span);
	}
	if (flag == 1) {
		sum.innerHTML = s.toString();
		removeClass(sumbar, "enable");
	}
}

function randomAndSum() {
	lis = document.getElementsByTagName("li");
	sumbar = document.getElementById("info-bar");
	sum = document.getElementById("sum");
	for (var i = 0; i < lis.length; i++) {
		if (!hasClass(lis[i], "disable")) {
			span = lis[i].getElementsByTagName("span")[1];
			span.style.opacity = "0";
		}
	}
	for (var i = 0; i < lis.length; i++) {
		lis[i].onclick = function(i, lis) {
			return function() {
				getRandNum(i, lis);
			};
		}(i, lis);
	}
	sumbar.onclick = function(lis, sumbar, sum) {
		return function() {
			getSum(lis, sumbar, sum);
		};
	}(lis, sumbar, sum);
}

function clear() {
	var lis = document.getElementsByTagName("li");
	for (var i = 0; i < lis.length; i++) {
		var span = lis[i].getElementsByTagName("span")[1];
		span.innerHTML = "";
		span.style.opacity = "0";
		if (hasClass(lis[i], "disable")) removeClass(lis[i], "disable");
		if (hasClass(lis[i], "tempdisable")) removeClass(lis[i], "tempdisable");
	}
	var sum = document.getElementById("sum");
	var sumbar = document.getElementById("info-bar");
	if (hasClass(sumbar, "enable")) removeClass(sumbar, "enable");
	sum.innerHTML ="";	
}

function buttonMouseOut() {
  	var button = document.getElementById("button");
  	button.onmouseout = function(e) {
    	e = window.event || e;
    	var s = e.toElement || e.relatedTarget;
    	if(document.all) {
      		if (!this.contains(s)) {
        		clear();
      		}
    	} else {
        	var reg = this.compareDocumentPosition(s);
        	if (!(reg == 20 || reg == 0)) {
          		clear();
        	}
      	}
  	}
}

window.onload = function() {
	randomAndSum();
	buttonMouseOut(); 
}