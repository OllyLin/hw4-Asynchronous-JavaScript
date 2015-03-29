var init = function(circles, info_bar, icon) {
	var listState = [];
	// listState['A','B','C','D','E']， 用于记录对应li是否被点击过;
	for (var i = 0; i < circles.length; i++) {
		// 初始化li的内容为“A”, “B”, “C”, “D”, “E”
		circles[i].innerHTML = circles[i].innerHTML[0];
		listState[circles[i].innerHTML[0]] = 0;
	}
	enableAll(circles, listState);

	info_bar.innerHTML = "";
	removeClass(info_bar, "clickable");
	info_bar.onclick = function() {
		handleBar(this, circles, icon);
	}

	addClass(icon, "clicked");

	return listState;
}

// 使所有未被点击过的li可以被被点击
var enableAll = function(circles, listState) {
	for (var i = 0; i < circles.length; i++) {
		if (listState[circles[i].innerHTML[0]] == 0){
			addClass(circles[i], "clickable");
		}
	}
}

var sendAjax = function(count, order, allLi, listState) {
	disableOthers(allLi[order[count]], allLi);
	allLi[order[count]].innerHTML += '<span class="unread" style="font-size:5px">..</span>';
	// 防止正在获取的时候点击第二次
	if (listState[allLi[order[count]].innerHTML[0]] == 0) {
		listState[allLi[order[count]].innerHTML[0]] = 1;
		var XMLHttpReq = new XMLHttpRequest();
		XMLHttpReq.open("get", '/', true);
		XMLHttpReq.onreadystatechange = function() {
			if (XMLHttpReq.readyState == 4) {
		        if (XMLHttpReq.status == 200) {
		            var text = XMLHttpReq.responseText;
		  			var span = allLi[order[count]].getElementsByTagName("span")[0];
		            if (!!span) {
		            	span.innerHTML = text;
		  				enableAll(allLi, listState);
		    			removeClass(allLi[order[count]], "clickable");
		    			if (count == 4) {
		    				var bar = document.getElementById("info-bar");
		    				addClass(bar, "clickable");
		    				// 设置延迟方便观察
		    				var tem = setTimeout(function() {
		    					handleBar(bar, allLi, document.getElementsByClassName("icon")[0])
		    				}, 800);
		    			}
		    			if (count < 4) {
		    				count++;
		    				// 设置延迟方便观察
		    				var tem = setTimeout(function() {
		    					sendAjax(count, order, allLi, listState);
		    				}, 400);
		    			}
		    		}
		        }
		    }
		}
	    XMLHttpReq.send(null);
	}
}

var disableOthers = function(nowLi, allLi) {
	for (var i = 0; i < allLi.length; i++) {
		if (nowLi != allLi[i]) {
			removeClass(allLi[i], "clickable");
		}
	}
}

var handleBar = function(info_bar, circles, icon) {
	if (hasClass(info_bar, "clickable")) {
		var tem = 0;
		for (var i = 0; i < circles.length; i++) {
			tem += parseInt(circles[i].getElementsByTagName("span")[0].innerHTML);
		}
		info_bar.innerHTML += "<br>"+tem;
	}
	removeClass(info_bar, "clickable");
	addClass(icon, "clicked");
}

// 获取下一个随机产生的数字
var getRandom = function(order) {
	var tem = [], i = 0;
	var next;
	for (var ele in order) {
		tem[order[ele]] = 1;
	}
	// 到出现已有列表中不存在的数字为止
	do {
		next = Math.round(Math.random()*4);
	} while (tem[next]);
	return next;
}

// 获取随机产生的点击顺序
var getOrder = function() {
	var order = [];
	do {
		order.push(getRandom(order));
	} while (order.length < 5);
	return order;
}


// 添加、删除、判断是否有class
function addClass(ele, val) {
	if (!hasClass(ele, val))
		ele.className = ele.className+" "+val;
}

function removeClass(ele, val) {
	if (hasClass(ele, val)) {
		var reg = new RegExp('(\\s|^)'+val+'(\\s|$)');
       	ele.className = ele.className.replace(reg, '');
	}
}

function hasClass(ele, val) {
	if (ele.className && ele.className.match(new RegExp('(\\s|^)'+val+'(\\s|$)')))
		return true;
	else
		return false;
}


window.onload = function() {
	var control_ring = document.getElementById("control-ring");
	var circles = control_ring.getElementsByTagName("li");
	var bottom_positioner = document.getElementById("bottom-positioner");
	var info_bar = document.getElementById("info-bar");
	var icon = document.getElementsByClassName("icon")[0];
	addClass(icon, "clicked");

	init(circles, info_bar, icon);

	bottom_positioner.onmouseleave = function() {
		init(circles, info_bar, icon);
	}

	icon.onclick = function() {
		if (hasClass(this, "clicked")) {
			var listState = init(circles, info_bar, icon);
			removeClass(this, "clicked");
			
			var order = getOrder();
			var tem = ['A', 'B','C', 'D', 'E'];
			var theList = [];
			for (var i = 0; i < 5; i++) theList.push(tem[order[i]]);
			info_bar.innerHTML = theList.join("、");
			sendAjax(0, order, circles, listState);
		}
	}
}
