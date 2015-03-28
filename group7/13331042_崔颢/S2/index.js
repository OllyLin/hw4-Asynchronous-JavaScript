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
		handleInfobar(this, circles, icon);
	}

	addClass(icon, "clicked");

	return listState;
}

var handleInfobar = function(info_bar, circles, icon) {
	if (hasClass(info_bar, "clickable")) {
		var tem = 0;
		for (var i = 0; i < circles.length; i++) {
			tem += parseInt(circles[i].getElementsByTagName("span")[0].innerHTML);
		}
		info_bar.innerHTML = tem;
	}
	removeClass(info_bar, "clickable");
	addClass(icon, "clicked");
}

// 使所有未被点击过的li可以被被点击
var enableAll = function(circles, listState) {
	for (var i = 0; i < circles.length; i++) {
		if (listState[circles[i].innerHTML[0]] == 0){
			addClass(circles[i], "clickable");
		}
	}
}

var sendAjax = function(count, allLi, listState) {
	disableOthers(allLi[count], allLi);
	// 防止正在获取的时候点击第二次
	if (listState[allLi[count].innerHTML[0]] == 0) {
		allLi[count].innerHTML += '<span class="unread" style="font-size:5px">..</span>';
		listState[allLi[count].innerHTML[0]] = 1;
		var XMLHttpReq = new XMLHttpRequest();
		XMLHttpReq.open("get", '/', true);
		XMLHttpReq.onreadystatechange = function() {
			if (XMLHttpReq.readyState == 4) {
		        if (XMLHttpReq.status == 200) {
		            var text = XMLHttpReq.responseText;
		  			var span = allLi[count].getElementsByTagName("span")[0];
		            if (!!span) {
		            	span.innerHTML = text;
		  				enableAll(allLi, listState);
		    			removeClass(allLi[count], "clickable");
		    			if (count == 4) {
		    				var bar = document.getElementById("info-bar");
		    				addClass(bar, "clickable");
		    				// 设置延迟方便观察
		    				var tem = setTimeout(function() {
		    					handleInfobar(bar, allLi, document.getElementsByClassName("icon")[0])
		    				}, 800);
		    			}
		    			// 顺序自动执行
		    			if (count != 4) {
		    				count++;
		    				// 设置延迟方便观察
		    				var tem = setTimeout(function() {
		    					sendAjax(count, allLi, listState);
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
			removeClass(this, "clicked")
			sendAjax(0, circles, listState);
		}
	}
}
