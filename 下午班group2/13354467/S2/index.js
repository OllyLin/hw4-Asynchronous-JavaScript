function binding(){
	var buttons = document.getElementsByClassName('button');
	var count = 0;
	var sum = 0;
	var auto = 0;                                                           //auto为1表示处于自动状态
	document.getElementById('info-bar').onclick = function(){
		if(this.style.background == 'blue'){
			this.innerHTML = "" + sum;
			this.style.background = 'gray';
		}
	}

	document.getElementsByClassName('apb')[0].onclick = function(){
		if(count == 0){                                
			auto = 1;
			buttons[0].onclick();		                                     //开始自动点击按钮
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
								if(auto){                                           //如果处于自动状态，则自动点击气泡
									document.getElementById('info-bar').onclick();								
								}
							}
							else if(auto){                                          //如果处于自动状态，则自动下个按钮
								buttons[count].onclick();
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