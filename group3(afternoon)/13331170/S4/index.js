
function mousePosition(ev) {
	if (ev.pageX || ev.pageY) {
		return {x: ev.pageX, y: ev.pageY};
	}
	return { 
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, 
		y:ev.clientY + document.body.scrollTop - document.body.clientTop 
	}; 
}

function judgeIn(position, mousePos) {
	if (mousePos.x >= position.left && mousePos.x <= position.right && mousePos.y >= position.top && mousePos.y <= position.bottom)
		return true;
	return false;
}

function deleteSpan(str) {
	var strs = str.split("<span");
	return strs[0];
}

function addSpan(str) {
	str += "<span class='unread'>...</span>"
	return str;
}

function addSpanByNum(str, num) {
	str += "<span class='unread'>"+num.toString()+"</span>"
	return str;
}

function disableAllRingListExceptThis(ringListNum) {
	var controlRing = document.getElementById("control-ring");
	var ringList = controlRing.children;
	var ringListLength = controlRing.childElementCount;
	for (var i = 0; i < ringListLength; i++) {
		if (i != ringListNum) ringList[i].className = ringList[i].className.split("button")[0] + "button" + "unactive";
	}
}

function disableThisRingList(ringListNum) {
	var controlRing = document.getElementById("control-ring");
	var ringList = controlRing.children;
	ringList[ringListNum].className = ringList[ringListNum].className.split("button")[0] + "button" + "unactive";
}

function enableRingList(ringListState) {
	var controlRing = document.getElementById("control-ring");
	var ringList = controlRing.children;
	var ringListLength = controlRing.childElementCount;
	for (var i = 0; i < ringListLength; i++) {
		if (ringListState[i] == -1) {
			ringList[i].className = ringList[i].className.split("button")[0] + "button " + "active";
		}
	}
}

function disableBitButtonNotChangeRingList(ringListState, randomList) {
	var info_bar = document.getElementById("info-bar");
	info_bar.style.background = "gray";
	var sum = 0;
	sum = parseInt(sum);
	for (var i = 0; i < ringListState.length; i++) {
		sum += parseInt(ringListState[i]);
	}
	info_bar.innerHTML = "<br>" + sum.toString();
}

function enableBitButton() {
	var info_bar = document.getElementById("info-bar");
	info_bar.style.background = "blue";
}

function checkBigButton(ringListState) {
	for (var i = 0; i < ringListState.length; i++) {
		if (ringListState[i] < 0) return false;
	}
	enableBitButton();
	return true;
}

function clearRandomListNum() {
	var ringListNumStr = document.getElementById("randomListNum");
	ringListNumStr.textContent = "";
}

function setRandomListNum(randomList) {
	var ringListNumStr = document.getElementById("randomListNum");
	var strTemp = "";
	for (var i = 0; i < randomList.length; i++) {
		switch(randomList[i]) {
			case 0:
				strTemp += 'A ';
				break;
			case 1:
				strTemp += 'B ';
				break;
			case 2:
				strTemp += 'C ';
				break;
			case 3:
				strTemp += 'D ';
				break;
			case 4:
			    strTemp += 'E ';
				break;
		}
	}
	ringListNumStr.textContent = strTemp;
}

function ringListClickByRobot(ringList, ringListState, ringListNum, randomList) {
	ringListSelectedNum = randomList[ringListNum];
	var ringListSelected = ringList[ringListSelectedNum];
	if (ringListState[ringListSelectedNum] != -1) {
		// alert("applied, please click another.");
		return;
	}
	for (var i = 0; i < ringListState.length; i++) {
		if (ringListState[i] == -2) {
			// alert("applying, please wait.");
			return;
		}
	}
	disableAllRingListExceptThis(ringListSelectedNum);
	ringListState[ringListSelectedNum] = -2;
	ringListSelected.innerHTML = deleteSpan(ringListSelected.innerHTML);
	ringListSelected.innerHTML = addSpan(ringListSelected.innerHTML);
	var _ajax = $.ajax({
    	url:"http://localhost:3000",
    	ataType:"jsonp"
	});
	_ajax.done(function(random_num) {
		if (ringListState[ringListSelectedNum] == -3) {
			ringListState[ringListSelectedNum] = -1;
			enableRingList(ringListState);
			return;
		}
    	ringListSelected.innerHTML = deleteSpan(ringListSelected.innerHTML);
    	ringListSelected.innerHTML = addSpanByNum(ringListSelected.innerHTML, random_num);
    	ringListState[ringListSelectedNum] = random_num;
    	disableThisRingList(ringListSelectedNum);
    	enableRingList(ringListState);
    	checkBigButton(ringListState);
    	if (ringListNum < ringListState.length-1) {
    		ringListClickByRobot(ringList, ringListState, ++ringListNum, randomList);
    	} else disableBitButtonNotChangeRingList(ringListState, randomList);
	});
	_ajax.fail(function(errData) {
    	console.log("got an error", errData);
	});
}

window.onload = function() {
	var ringListState = new Array(-1, -1, -1, -1, -1);
	resetControlRing();
	var controlRing = document.getElementById("control-ring");
	var ringList = controlRing.children;
	var ringListLength = controlRing.childElementCount;
	var info_bar = document.getElementById("info-bar");
	info_bar.onclick = function() {
		if (!checkBigButton(ringListState)) return;
		disableBitButton(ringListState);
	}
	var main_container = document.getElementById("button");
    main_container.onmouseleave = function(ev) {
    	var mousePos = mousePosition(ev);
    	var Position = main_container.getBoundingClientRect();
    	if(judgeIn(Position, mousePos)) return;
    	for (var i = 0; i < ringListState.length; i++) {
    		if (ringListState[i] == -2 || ringListState[i] == -3) ringListState[i] = -3;
    		else ringListState[i] = -1;
    	}
        resetControlRing();
        resetBigButton();
        enableRingList(ringListState);
        clearRandomListNum();
    };
    main_container.onclick = function() {
    	for (var i = 0; i < ringListState.length; i++) {
    		if (ringListState[i] == -1 || ringListState[i] == -3) continue;
    		return;
    	};
    	var randomList = [0, 1, 2, 3, 4];
		randomList.sort(function() {
			return Math.random()-0.5;
		});
		setRandomListNum(randomList);
    	ringListClickByRobot(ringList, ringListState, 0, randomList);
    }
};

function resetControlRing() {
	var controlRing = document.getElementById("control-ring");
	var ringList = controlRing.children;
	var ringListLength = controlRing.childElementCount;
	for (var i = 0; i < ringListLength; i++) {
		ringList[i].innerHTML = deleteSpan(ringList[i].innerHTML);
	}
}

function resetBigButton() {
	var info_bar = document.getElementById("info-bar");
	info_bar.style.background = "gray";
	info_bar.innerHTML = "";
}