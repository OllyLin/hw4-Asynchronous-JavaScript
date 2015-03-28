function addmessage(){
	var message1 = document.createElement('p');
	message1.style.position = 'absolute';
	message1.style.top = '-256px';
	message1.style.left = '-20px';
	message1.style.fontSize = '20px';
	message1.style.color = '#00FFCC';
	message1.style.width = '125px';
	message1.style.height = '60px';
	document.getElementById('bottom-positioner').insertBefore(message1, document.getElementById('button'));
	var message2 = document.createElement('p');
	message2.style.position = 'absolute';
	message2.style.top = '-276px';
	message2.style.left = '-20px';
	message2.style.fontSize = '20px';
	message2.style.color = '#00FFCC';
	document.getElementById('bottom-positioner').insertBefore(message2, document.getElementById('button'));
}

function ableBigButton(){
	var buttons = document.getElementsByClassName('button');
	for(var i = 0; i < buttons.length; i++){
		if(buttons[i].style.background == 'blue'){
			return ;
		}
	}
	document.getElementById('info-bar').style.background = 'blue';
}

function clickButton(i, sum, array){
	if(i == 5) bubbleHandler(sum);
	else if (array[i] == 0) aHandler(i, sum, array);
	else if (array[i] == 1) bHandler(i, sum, array);
	else if (array[i] == 2) cHandler(i, sum, array);
	else if (array[i] == 3) dHandler(i, sum, array);
	else if (array[i] == 4) eHandler(i, sum, array);
}

function failed(){
	return Math.random() > 0.5;
}

function showNumber(that, num, i, sum, array){
	if(that.clicked){
		that.getElementsByClassName('unread')[0].innerHTML = num;
		that.style.background = 'gray';
		sum += parseInt(num);
		ableBigButton();
		if (array.length > 1)
			clickButton(i + 1, sum, array);
	}
}

function request(that, i, sum, array){
	var buttons = document.getElementsByClassName('button');
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}
	else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			for(var j = 0; j < buttons.length; j++){
				if(!buttons[j].clicked){
					buttons[j].style.background = 'blue';
				}
				buttons[j].state = 0;
			}
			showNumber(that, xmlhttp.responseText, i, sum, array);
		}
	}
	xmlhttp.open("GET","/",true);
	xmlhttp.send();
}

function errorHandler(that, i, sum, array){
	if(that.clicked){
		setTimeout(clickButton, 1000, i, sum, array);
		that.clicked = 0;
		that.state = 0;
	}
}

function aHandler(i, sum, array){
	var p = document.getElementsByTagName('p')[0];
	var buttons = document.getElementsByClassName('button');
	var that = buttons[0];
	if(!buttons[0].state && !buttons[0].clicked){
		buttons[0].getElementsByClassName('unread')[0].style.opacity = 0.7;
		buttons[0].getElementsByClassName('unread')[0].innerHTML = '...';

		that.clicked = 1;
		for(var j = 0; j < buttons.length; j++){
			buttons[j].state = 1;
			buttons[j].style.background = 'gray';
		}
		that.style.background = 'blue';

		if(failed()){
			p.innerHTML = '这不是个秘密';
			setTimeout(errorHandler, 1000, that, i, sum, array);
		}
		else{
			p.innerHTML = '这是个天大的秘密';
			request(that, i, sum, array);
		}
	}
}

function bHandler(i, sum, array){
	var p = document.getElementsByTagName('p')[0];
	var buttons = document.getElementsByClassName('button');
	var that = buttons[1];
	if(!buttons[1].state && !buttons[1].clicked){
		buttons[1].getElementsByClassName('unread')[0].style.opacity = 0.7;
		buttons[1].getElementsByClassName('unread')[0].innerHTML = '...';	

		that.clicked = 1;
		for(var j = 0; j < buttons.length; j++){
			buttons[j].state = 1;
			buttons[j].style.background = 'gray';
		}
		that.style.background = 'blue';

		if(failed()){
			p.innerHTML = '我知道';
			setTimeout(errorHandler, 1000, that, i, sum, array);
		}
		else{
			p.innerHTML = '我不知道';
			request(that, i, sum, array);
		}
	}
}

function cHandler(i, sum, array){
	var p = document.getElementsByTagName('p')[0];
	var buttons = document.getElementsByClassName('button');
	var that = buttons[2];
	if(!buttons[2].state && !buttons[2].clicked){
		buttons[2].getElementsByClassName('unread')[0].style.opacity = 0.7;
		buttons[2].getElementsByClassName('unread')[0].innerHTML = '...';	

		that.clicked = 1;
		for(var j = 0; j < buttons.length; j++){
			buttons[j].state = 1;
			buttons[j].style.background = 'gray';
		}
		that.style.background = 'blue';

		if(failed()){
			p.innerHTML = '你知道';
			setTimeout(errorHandler, 1000, that, i, sum, array);
		}
		else{
			p.innerHTML = '你不知道';
			request(that, i, sum, array);
		}
	}
}


function dHandler(i, sum, array){
	var p = document.getElementsByTagName('p')[0];
	var buttons = document.getElementsByClassName('button');
	var that = buttons[3];
	if(!buttons[3].state && !buttons[3].clicked){
		buttons[3].getElementsByClassName('unread')[0].style.opacity = 0.7;
		buttons[3].getElementsByClassName('unread')[0].innerHTML = '...';	

		that.clicked = 1;
		for(var j = 0; j < buttons.length; j++){
			buttons[j].state = 1;
			buttons[j].style.background = 'gray';
		}
		that.style.background = 'blue';

		if(failed()){
			p.innerHTML = '他知道';
			setTimeout(errorHandler, 1000, that, i, sum, array);
		}
		else{
			p.innerHTML = '他不知道';
			request(that, i, sum, array);
		}
	}
}

function eHandler(i, sum, array){
	var p = document.getElementsByTagName('p')[0];
	var buttons = document.getElementsByClassName('button');
	var that = buttons[4];
	if(!buttons[4].state && !buttons[4].clicked){
		buttons[4].getElementsByClassName('unread')[0].style.opacity = 0.7;
		buttons[4].getElementsByClassName('unread')[0].innerHTML = '...';

		that.clicked = 1;
		for(var j = 0; j < buttons.length; j++){
			buttons[j].state = 1;
			buttons[j].style.background = 'gray';
		}
		that.style.background = 'blue';

		if(failed()){
			p.innerHTML = '没错';
			setTimeout(errorHandler, 1000, that, i, sum, array);
		}
		else{
			p.innerHTML = '才怪';
			request(that, i, sum, array);
		}
	}
}

function bubbleHandler(sum){
	document.getElementById('info-bar').innerHTML = sum;
	document.getElementsByTagName('p')[0].innerHTML = '楼主异步调用战斗力感人，目测不超过'+sum;
	document.getElementById('info-bar').style.background = 'gray';
}


window.onload = function(){
	var buttons = document.getElementsByClassName('button');
	addmessage();
	document.getElementsByClassName('apb')[0].onclick = function(){
		for(var i = 0; i < buttons.length; i++){
			if(buttons[i].clicked) return;
		}
		var array = new Array();
		for(var i = 0; i < buttons.length; i++){
			var num = Math.floor(Math.random() * buttons.length);
			while(true){
				var j = 0;
				for(; j < array.length; j++){
					if(num ==  array[j])
						break;
				}
				if(j == array.length)
					break;
				else num = Math.floor(Math.random() * buttons.length);
			}
			array.push(num);
		}
		var str = String.fromCharCode(array[0]+65);
		for(var i = 1; i < buttons.length; i ++){
			str += String.fromCharCode(array[i]+65);
		}
		document.getElementsByTagName('p')[1].innerHTML = str;
		clickButton(0, 0, array);
	}

	for(var i = 0; i < buttons.length; i++){
		buttons[i].state = 0;
		buttons[i].clicked = 0;
		buttons[i].onclick = function(i){
			return function(){
				var array = new Array;
				array.push(i);
				clickButton(0, 0, array);
			}
		}(i);
	}

	document.getElementById('info-bar').onclick = function(){
		if(document.getElementById('info-bar').style.background == 'gray') return;
		buttons = document.getElementsByClassName('button');
		var sum = 0;
		for(var i = 0; i < buttons.length; i++){
			sum += parseInt(buttons[i].getElementsByClassName('unread')[0].innerHTML);
		}
		bubbleHandler(sum);
	}

	document.getElementById('button').onmouseout = function(event){
		var target = event.relatedTarget?event.relatedTarget:event.toElement;  //后者兼容ie
		while(target && target != this ) target = target.parentNode;
		if(target != this ){
			document.getElementById('info-bar').innerHTML = '';
			document.getElementById('info-bar').style.background = 'gray';
			document.getElementsByTagName('p')[0].innerHTML = '';
			document.getElementsByTagName('p')[1].innerHTML = '';
			for(var i = 0; i < buttons.length; i++){
				buttons[i].state = 0;
				buttons[i].clicked = 0;
				buttons[i].style.background = 'blue';
				buttons[i].getElementsByClassName('unread')[0].style.opacity = 0;
			}
		}
	}
	
}