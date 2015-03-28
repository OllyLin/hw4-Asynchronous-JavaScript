
window.onload = function(){
	document.getElementById('at-plus-container').onmouseleave = function(){clearAll();};
	var bubbles = document.getElementsByTagName('li');
		
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].active = 1;
		bubbles[i].flag = 1;
	}
	bubbles[0].onclick = function(){Clicked(0)};
	bubbles[1].onclick = function(){Clicked(1)};
	bubbles[2].onclick = function(){Clicked(2)};
	bubbles[3].onclick = function(){Clicked(3)};
	bubbles[4].onclick = function(){Clicked(4)};
}

function Clicked(index) {
	var bubbles = document.getElementsByTagName("li");
	if (bubbles[index].active == 1 && bubbles[index].flag == 1) {
		bubbles[index].active = 0;
		bubbles[index].flag = 0;
		otherBubbleDisabled(index);
		appearRedCircle(index,"...");
		randomNumber(index); // 取随机数
	} else {
		return;
	}
}


// 随机数
function randomNumber(index){
	var bubbles = document.getElementsByTagName('li');
	var xmlhttp = null;
	xmlhttp = new XMLHttpRequest();
	if (xmlhttp != null) {
		xmlhttp.onreadystatechange = function(){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var num = xmlhttp.responseText;
				appearRedCircle(index, String(num));
				otherBubbleEnabled();
				bubbles[index].style.backgroundColor = "gray";
				if (allClicked()) {
					bigBottonActive();
				}
			}
		};
		xmlhttp.open("get","http://localhost:3000",true);
		xmlhttp.send();
	}
}
// 出现红色按钮
function appearRedCircle(index,string){
	var bubbles = document.getElementsByTagName('li');
	var spa = bubbles[index].getElementsByTagName("span")[1];
	if (spa.outerHTML == "<span></span>") {
		var tmp = "<span class='red'>" + string + "</span>";
		spa.style.backgroundColor = "red";
		bubbles[index].getElementsByTagName("span")[1].outerHTML = tmp;
	} else {
		var tmp = "<span class='red'>" + string + "</span>";
		bubbles[index].getElementsByTagName("span")[1].outerHTML = tmp;
	}
	
}
// 其它按钮灭活
function otherBubbleDisabled(index){
	var bubbles = document.getElementsByTagName('li');
	for (var i = 0; i < bubbles.length; i++) {
		if (i == index) {
			continue;
		} else {
			bubbles[i].style.backgroundColor = "gray";
			bubbles[i].flag = 0;
		}
	}
}

// 其它按钮激活
function otherBubbleEnabled(){
	var bubbles = document.getElementsByTagName('li');
	for (var i = 0; i < bubbles.length; i++) {
		if (bubbles[i].active == 1) {
			bubbles[i].flag = 1;
			bubbles[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
		}
	}
}

// 是否全部已点击
function allClicked(){
	var i = 0;
	var bubbles = document.getElementsByTagName('li');
	for (; i < bubbles.length; i++) {
		if (bubbles[i].active == 1) {
			break;
		}
	}
	if (i == 5){
		return true;
	} else {
		return false;
	}
}
// 激活大按钮
function bigBottonActive(){
	var big = document.getElementById("info-bar").getElementsByTagName("div");
	big[0].style.backgroundColor = "rgba(48, 63, 159, 1)";
	big[0].onclick = function(){sum();};
}
// 求和 + 显示数字
function sum(){
	var sum = 0;
	var bubbles = document.getElementsByTagName("li");
	for (var i = 0; i < bubbles.length; i++) {
		var tmp = bubbles[i].getElementsByTagName("span")[1].innerHTML;
		tmp = parseInt(tmp);
		sum = sum + tmp;
	}
	var tmp =String(sum);
	document.getElementsByTagName("p")[0].innerHTML = tmp;
}

function clearAll() {
    location.reload();
}
