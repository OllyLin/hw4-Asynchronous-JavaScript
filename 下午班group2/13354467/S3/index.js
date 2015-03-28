function binding(){
	var buttons = document.getElementsByClassName('button');
	var auto = 0;
	var count = 0;
	var sum = 0;
	var auto_count = 0;
	document.getElementById('info-bar').onclick = function(){
		if(this.style.background == 'blue'){
			this.innerHTML = "" + sum;
			this.style.background = 'gray';
		}
	}

	document.getElementsByClassName('apb')[0].onclick = function(){
		if(count == 0){
			auto = 1;
			for(var i = 0; i < buttons.length; i++){                           //依次点击各个按钮
				buttons[i].onclick();
			}
		}
	}

	document.getElementById('button').onmouseout = function(event){
		var target = event.relatedTarget?event.relatedTarget:event.toElement;  //后者兼容ie
		while(target && target != this ) target = target.parentNode;
		if(target != this ){
			auto = 0;
			auto_count = 0;
			count = 0;
			sum = 0;
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
			if(!this.state && !this.clicked || auto){
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
							auto_count++;
							that.getElementsByClassName('unread')[0].innerHTML = xmlhttp.responseText;
							for(var j = 0; j < buttons.length; j++){
								if(!buttons[j].clicked){
									buttons[j].style.background = 'blue';
								}
								buttons[j].state = 0;
							}
							that.style.background = 'gray';
							sum += parseInt(xmlhttp.responseText);
							if(auto_count == buttons.length){
								document.getElementById('info-bar').style.background = 'blue';
								if(auto)
									document.getElementById('info-bar').onclick();
							}
						}
				}
				xmlhttp.open("GET","/?random="+Math.random(),true);          //让每次url都不同
				xmlhttp.send();
				this.clicked = 1;
				for(var j = 0; j < buttons.length; j++){
					buttons[j].state = 1;
					if(!auto)
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
