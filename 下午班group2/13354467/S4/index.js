function binding(){
	var buttons = document.getElementsByClassName('button');
	var count = 0;
	var sum = 0;
	var auto = 0;
	document.getElementById('info-bar').onclick = function(){
		if(this.style.background == 'blue'){
			this.innerHTML = "" + sum;
			this.style.background = 'gray';
		}
	}

	var sequence = document.createElement('p');                       //添加显示点击顺序的p元素
	sequence.style.position = 'absolute';
	sequence.style.top = '-250px';
	sequence.style.left = '-20px';
	sequence.style.fontSize = '40px';
	sequence.style.color = '#00FFCC';
	document.getElementById('bottom-positioner').insertBefore(sequence, document.getElementById('button'));

	document.getElementsByClassName('apb')[0].onclick = function(){
		if(count == 0){
			auto = 1;
			buttons.array = new Array();
			for(var i = 0; i < buttons.length; i++){                   //产生随机序列
				var num = Math.floor(Math.random() * buttons.length);
				while(true){
					var j = 0;
					for(; j < buttons.array.length; j++){
						if(num ==  buttons.array[j])
							break;
					}
					if(j == buttons.array.length)
						break;
					else num = Math.floor(Math.random() * buttons.length);
				}
				buttons.array.push(num);
			}

			var str = String.fromCharCode(buttons.array[0]+65);        //显示随机序列
			for(var i = 1; i < buttons.length; i ++){
				str += String.fromCharCode(buttons.array[i]+65);
			}
			sequence.innerHTML = str;

			buttons[buttons.array[count]].onclick();                   //开始自动点击
		}

	}

	document.getElementById('button').onmouseout = function(event){
		var target = event.relatedTarget?event.relatedTarget:event.toElement;  //后者兼容ie
		while(target && target != this ) target = target.parentNode;
		if(target != this ){
			count = 0;
			sum = 0;
			auto = 0;
			document.getElementById('info-bar').innerHTML = '';
			sequence.innerHTML = '';
			for(var i = 0; i < buttons.length; i++){
				buttons[i].state = 0;
				buttons[i].clicked = 0;
				buttons[i].style.background = 'blue';
				buttons[i].getElementsByClassName('unread')[0].style.opacity = 0;
			}
		}
	}

	for(var i = 0; i < buttons.length; i++){
		buttons[i].state = 0;
		buttons[i].clicked = 0;
		buttons[i].onclick = function(){
			if(!this.state && !this.clicked){
				count++;
				var that = this;
				this.getElementsByClassName('unread')[0].style.opacity = 0.7;
				this.getElementsByClassName('unread')[0].innerHTML = '...';
				var xmlhttp;
				if (window.XMLHttpRequest) {
					xmlhttp = new XMLHttpRequest();
				}
				else{
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				xmlhttp.onreadystatechange=function(){
					if(count)
						if (xmlhttp.readyState==4 && xmlhttp.status==200){
							that.getElementsByClassName('unread')[0].innerHTML = xmlhttp.responseText;
							for(var j = 0; j < buttons.length; j++){
								if(!buttons[j].clicked){
									buttons[j].style.background = 'blue';
								}
								buttons[j].state = 0;
							}
							that.style.background = 'gray';
							sum += parseInt(xmlhttp.responseText);
							if(count == buttons.length){
								document.getElementById('info-bar').style.background = 'blue';
								if(auto){
									document.getElementById('info-bar').onclick();								
								}
							}
							else if(auto){
								buttons[buttons.array[count]].onclick();
							}
						}
				}
				xmlhttp.open("GET","/",true);
				xmlhttp.send();
				this.clicked = 1;
				for(var j = 0; j < buttons.length; j++){
					buttons[j].state = 1;
					buttons[j].style.background = 'gray';
				}
				this.style.background = 'blue';
			}
		};
	}
};

window.onload = function(){
	binding();
}
