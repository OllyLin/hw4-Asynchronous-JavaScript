/*
*    Filename: index.js
*    Description: NULL.
*    Last modified: 2015-03-28 10:45
*
*    Created by 陈炜健 on 2015-03-26
*    Student ID: 13331018
*    Email: eleveneat@gmail.com
*    Copyright (C) 2014 All rights reserved.
*/

window.onload = function() {
	var buttons = document.getElementsByClassName("buttons");
	makeApbClickable();
}

var handlerName = [aHandler, bHandler, cHandler, dHandler, eHandler];

function makeAllButtonsClickable() {
	var buttons = document.getElementsByClassName("buttons");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', handlerName[i]);
	}
	var bottomPositioner = document.getElementById("bottom-positioner");
	bottomPositioner.addEventListener('mouseenter', clearButtons);
}

function makeApbClickable() {
	var apb = document.getElementById("apb");
	apb.addEventListener('click', autoExecute);
}

function autoExecute() {
	makeAllButtonsClickable();
  var buttons = document.getElementsByClassName("buttons");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].click();
  }
}

function clearButtons(event) {
	var buttons = document.getElementsByClassName("buttons");
	var info = document.getElementsByClassName("info")[0];
	var infoSum = document.getElementById("sum");
	infoSum.innerHTML = ""; // 清空info的数字
	for (var i = 0; i < buttons.length; i++) {
		var redBackground = buttons[i].getElementsByClassName("red-background")[0];
		if (redBackground) {
			buttons[i].className = buttons[i].className.replace(/ disabled-buttons/g, ""); // 使背景变回激活时的样式
			buttons[i].removeChild(buttons[i].firstChild);
		} else {
			buttons[i].removeEventListener('click', handlerName[i]);
		}
	}
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

function aHandler(event) {
	this.innerHTML = "<span class=\"red-background\"><span class=\"text\">...</span></span>" + this.innerHTML; // 增加小红圈
	var text = this.firstChild.firstChild; // 得到该button下class为text的对象
	var buttons = document.getElementsByClassName("buttons"); // 得到所有button对象
	this.removeEventListener('click', aHandler); // 移除本身的点击事件处理器

	var client = new XMLHttpRequest();
	client.open("GET","http://localhost:3000/1",true);
	client.onreadystatechange = function() {
        if (client.readyState == 4) {
            if (client.status == 200) {
               document.getElementById("a-button").className += " disabled-buttons"; // 使背景变灰，字体变白
               text.innerHTML = client.responseText;
               var activeButtonsNum = 0; // 已经被点击的button数目
               for (var i = 0; i < buttons.length; i++) { // 判断所有buttons的text是否为数字
               		var buttonText = buttons[i].getElementsByClassName("text")[0].innerHTML;
               		if (buttonText != "...")
               			activeButtonsNum++;
               }
               if (5 == activeButtonsNum) { // 判断是否所有的button已经被点击了
                   var info = document.getElementsByClassName("info")[0];
                   info.addEventListener('click', sum);
                   info.click();
               }
            }
        }
    };
    client.send(null);
}

function bHandler(event) {
	this.innerHTML = "<span class=\"red-background\"><span class=\"text\">...</span></span>" + this.innerHTML; // 增加小红圈
	var text = this.firstChild.firstChild; // 得到该button下class为text的对象
	var buttons = document.getElementsByClassName("buttons"); // 得到所有button对象
	this.removeEventListener('click', bHandler); // 移除本身的点击事件处理器

	var client = new XMLHttpRequest();
	client.open("GET","http://localhost:3000/2",true);
	client.onreadystatechange = function() {
        if (client.readyState == 4) {
            if (client.status == 200) {
               document.getElementById("b-button").className += " disabled-buttons"; // 使背景变灰，字体变白
               text.innerHTML = client.responseText;
               var activeButtonsNum = 0; // 已经被点击的button数目
               for (var i = 0; i < buttons.length; i++) { // 判断所有buttons的text是否为数字
                  var buttonText = buttons[i].getElementsByClassName("text")[0].innerHTML;
                  if (buttonText != "...")
                    activeButtonsNum++;
               }
               if (5 == activeButtonsNum) { // 判断是否所有的button已经被点击了
                   var info = document.getElementsByClassName("info")[0];
                   info.addEventListener('click', sum);
                   info.click();
               }
            }
        }
    };
    client.send(null);
}

function cHandler(event) {
	this.innerHTML = "<span class=\"red-background\"><span class=\"text\">...</span></span>" + this.innerHTML; // 增加小红圈
	var text = this.firstChild.firstChild; // 得到该button下class为text的对象
	var buttons = document.getElementsByClassName("buttons"); // 得到所有button对象
	this.removeEventListener('click', cHandler); // 移除本身的点击事件处理器

	var client = new XMLHttpRequest();
	client.open("GET","http://localhost:3000/3",true);
	client.onreadystatechange = function() {
        if (client.readyState == 4) {
            if (client.status == 200) {
               document.getElementById("c-button").className += " disabled-buttons"; // 使背景变灰，字体变白
               text.innerHTML = client.responseText;
               var activeButtonsNum = 0; // 已经被点击的button数目
               for (var i = 0; i < buttons.length; i++) { // 判断所有buttons的text是否为数字
                  var buttonText = buttons[i].getElementsByClassName("text")[0].innerHTML;
                  if (buttonText != "...")
                    activeButtonsNum++;
               }
               if (5 == activeButtonsNum) { // 判断是否所有的button已经被点击了
                   var info = document.getElementsByClassName("info")[0];
                   info.addEventListener('click', sum);
                   info.click();
               }
            }
        }
    };
    client.send(null);
}

function dHandler(event) {
	this.innerHTML = "<span class=\"red-background\"><span class=\"text\">...</span></span>" + this.innerHTML; // 增加小红圈
	var text = this.firstChild.firstChild; // 得到该button下class为text的对象
	var buttons = document.getElementsByClassName("buttons"); // 得到所有button对象
	this.removeEventListener('click', dHandler); // 移除本身的点击事件处理器

	var client = new XMLHttpRequest();
	client.open("GET","http://localhost:3000/4",true);
	client.onreadystatechange = function() {
        if (client.readyState == 4) {
            if (client.status == 200) {
               document.getElementById("d-button").className += " disabled-buttons"; // 使背景变灰，字体变白
               text.innerHTML = client.responseText;
               var activeButtonsNum = 0; // 已经被点击的button数目
               for (var i = 0; i < buttons.length; i++) { // 判断所有buttons的text是否为数字
                  var buttonText = buttons[i].getElementsByClassName("text")[0].innerHTML;
                  if (buttonText != "...")
                    activeButtonsNum++;
               }
               if (5 == activeButtonsNum) { // 判断是否所有的button已经被点击了
                   var info = document.getElementsByClassName("info")[0];
                   info.addEventListener('click', sum);
                   info.click();
               }
            }
        }
    };
    client.send(null);
}

function eHandler(event) {
	this.innerHTML = "<span class=\"red-background\"><span class=\"text\">...</span></span>" + this.innerHTML; // 增加小红圈
	var text = this.firstChild.firstChild; // 得到该button下class为text的对象
	var buttons = document.getElementsByClassName("buttons"); // 得到所有button对象
	this.removeEventListener('click', eHandler); // 移除本身的点击事件处理器

	var client = new XMLHttpRequest();
	client.open("GET","http://localhost:3000/5",true);
	client.onreadystatechange = function() {
        if (client.readyState == 4) {
            if (client.status == 200) {
               document.getElementById("e-button").className += " disabled-buttons"; // 使背景变灰，字体变白
               text.innerHTML = client.responseText;
               var activeButtonsNum = 0; // 已经被点击的button数目
               for (var i = 0; i < buttons.length; i++) { // 判断所有buttons的text是否为数字
                  var buttonText = buttons[i].getElementsByClassName("text")[0].innerHTML;
                  if (buttonText != "...")
                    activeButtonsNum++;
               }
               if (5 == activeButtonsNum) { // 判断是否所有的button已经被点击了
                   var info = document.getElementsByClassName("info")[0];
                   info.addEventListener('click', sum);
                   info.click();
               }
            }
        }
        
    };
    client.send(null);
}
