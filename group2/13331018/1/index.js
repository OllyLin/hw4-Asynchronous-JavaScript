/*
*    Filename: index.js
*    Description: NULL.
*    Last modified: 2015-03-28 01:43
*
*    Created by 陈炜健 on 2015-03-26
*    Student ID: 13331018
*    Email: eleveneat@gmail.com
*    Copyright (C) 2014 All rights reserved.
*/

window.onload = function() {
	var buttons = document.getElementsByClassName("buttons");
	makeAllButtonsClickable(buttons);
}

function makeAllButtonsClickable(buttons) {
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', getRandomNum);
	}
	var bottomPositioner = document.getElementById("bottom-positioner");
	bottomPositioner.addEventListener('mouseenter', clearButtons);
}

function clearButtons(event) {
	var buttons = document.getElementsByClassName("buttons");
	var info = document.getElementsByClassName("info")[0];
	var infoSum = document.getElementById("sum");
	infoSum.innerHTML = ""; // 清空info的数字
	info.style.backgroundColor = "rgba(127, 127, 127, 1)"; // 使大气泡的颜色变为灰色
	for (var i = 0; i < buttons.length; i++) {
		var redBackground = buttons[i].getElementsByClassName("red-background")[0];
		if (redBackground) {
			buttons[i].className = buttons[i].className.replace(/ disabled-buttons/g, ""); // 使背景变回激活时的样式
			buttons[i].removeChild(buttons[i].firstChild);
			buttons[i].addEventListener('click', getRandomNum); // 移除点击事件处理器
		}
	}
}

function getRandomNum(event) {
	this.innerHTML = "<span class=\"red-background\"><span class=\"text\">...</span></span>" + this.innerHTML; // 增加小红圈
	var text = this.firstChild.firstChild; // 得到该button下class为text的对象
	var buttons = document.getElementsByClassName("buttons"); // 得到所有button对象
	disableOtherButtons(buttons); // 使其他未点击的按钮变灰
	this.removeEventListener('click', getRandomNum); // 移除本身的点击事件处理器
	this.className += " disabled-buttons"; // 使背景变灰，字体变白

	var client = new XMLHttpRequest();
	client.open("GET","http://localhost:3000/",true);
	client.onreadystatechange = function() {
        if(client.readyState == 4){
            if(client.status == 200){
               text.innerHTML = client.responseText;
               var activeButtonsNum = 0; // 已经被点击的button数目
               for (var i = 0; i < buttons.length; i++) {
               		var redBackground = buttons[i].getElementsByClassName("red-background")[0];
               		if (redBackground)
               			activeButtonsNum++;
               }
               if (5 == activeButtonsNum) { // 判断是否所有的button已经被点击了
                   var info = document.getElementsByClassName("info")[0];
                   info.style.backgroundColor = "rgba(48, 63, 159, 1)"; // 改变大气泡的颜色为蓝色
                   info.addEventListener('click', sum);
               }
            }
        }
        enableOtherButtons(buttons);
    };
    client.send(null);
}

function sum(event) {
	var buttons = document.getElementsByClassName("buttons");
	var count = 0;
	for (var i = 0; i < buttons.length; i++) { // 求出所有button数字的总和
		count += parseInt(buttons[i].getElementsByClassName("text")[0].innerHTML);
	}
	var infoSum = document.getElementById("sum");
	infoSum.innerHTML = count;
}

function disableOtherButtons(buttons) {
	for (var i = 0; i < buttons.length; i++) {
		var redBackground = buttons[i].getElementsByClassName("red-background")[0];
		if (!redBackground) {
			buttons[i].className += " disabled-buttons"; // 使背景变灰，字体变白
			buttons[i].removeEventListener('click', getRandomNum); // 移除点击事件处理器
		}
	}
}

function enableOtherButtons(buttons) {
	for (var i = 0; i < buttons.length; i++) {
		var redBackground = buttons[i].getElementsByClassName("red-background")[0];
		if (!redBackground) {
			buttons[i].className = buttons[i].className.replace(/ disabled-buttons/g, ""); // 使背景变回激活时的样式
			buttons[i].addEventListener('click', getRandomNum); // 添加点击事件处理器
		}
	}
}
