// 初始化
var init = function(circles, info_bar) {
	var listState = [];
	// listState['A','B','C','D','E']， 用于记录对应li是否被点击过;
	for (var i = 0; i < circles.length; i++) {
		// 初始化li的内容为“A”, “B”, “C”, “D”, “E”
		circles[i].innerHTML = circles[i].innerHTML[0];
		listState[circles[i].innerHTML[0]] = 0;
	}
	enableAll(circles, listState);
	
	for (var i = 0; i < circles.length; i++) {
		circles[i].onclick = function() {
			if (hasClass(this, "clickable")) {
				listState = sendAjax(this, circles, listState);
			}
		}
	}

	// 处理大圆
	info_bar.innerHTML = "";
	removeClass(info_bar, "clickable");
	info_bar.onclick = function() {
		if (hasClass(this, "clickable")) {
			// 记录所有circle里数字的总和
			var tem = 0;
			for (var i = 0; i < circles.length; i++) {
				tem += parseInt(circles[i].getElementsByTagName("span")[0].innerHTML);
			}
			this.innerHTML = tem;
		}
		removeClass(info_bar, "clickable");
	}
}

// 使所有未被点击过的li可以被被点击
var enableAll = function(circles, listState) {
	for (var i = 0; i < circles.length; i++) {
		if (listState[circles[i].innerHTML[0]] == 0){
			addClass(circles[i], "clickable");
		}
	}
}

var sendAjax = function(nowLi, allLi, listState) {
	disableOthers(nowLi, allLi);
	// 防止正在获取的时候点击第二次
	if (listState[nowLi.innerHTML[0]] == 0) {
		nowLi.innerHTML += '<span class="unread" style="font-size:5px">..</span>';
		listState[nowLi.innerHTML[0]] = 1;
		var XMLHttpReq = new XMLHttpRequest();
		XMLHttpReq.open("get", '/', true);
		XMLHttpReq.onreadystatechange = function() {
			if (XMLHttpReq.readyState == 4) {
		        if (XMLHttpReq.status == 200) {
		            var text = XMLHttpReq.responseText;
		            var span = nowLi.getElementsByTagName("span")[0];
		            // 防止正在获取数字的过程中onmouseleave
		            if (!!span) {
		            	span.innerHTML = text;
		  				nowLi.getElementsByTagName("span")[0].innerHTML = text;
		  				// 使其他circle恢复可被点击状态
		  				enableAll(allLi, listState);
		  				// 当前circle不可再点击
		    			removeClass(nowLi, "clickable");
		    			judgeFinish(listState);
		    		}
		        }
		    }
		}
	    XMLHttpReq.send(null);
	}
	return listState;
}

// 除了nowLi之外的其他circle都disabled
var disableOthers = function(nowLi, allLi) {
	for (var i = 0; i < allLi.length; i++) {
		if (nowLi != allLi[i]) {
			removeClass(allLi[i], "clickable");

		}
	}
}

// 判断是否所有都点击过一遍
var judgeFinish = function(listState) {
	var flag = 0;
	for (var ele in listState) {
		if (listState[ele] == 0) {
			flag = 1;
			break;
		}
	}
	// 若所有circle都被点击过，激活大circle
	if (flag == 0) {
		addClass(document.getElementById("info-bar"), "clickable");
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

	init(circles, info_bar);

	// 鼠标离开“@+”时重置所有
	bottom_positioner.onmouseleave = function() {
		init(circles, info_bar);
	}
}
