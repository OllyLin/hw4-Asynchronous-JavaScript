function binding(){
	var buttons = document.getElementsByClassName('button');
	var count = 0;                                                            //记录被点击按钮的数量
	var sum = 0;                                                              //记录当前的和
	document.getElementById('info-bar').onclick = function(){
		if(count == buttons.length){
			this.innerHTML = "" + sum;
			count = 0;
			this.style.background = 'gray';
		}
	}
	document.getElementById('button').onmouseout = function(event){            //处理鼠标移出区域事件
		var target = event.relatedTarget?event.relatedTarget:event.toElement;  //后者兼容ie
		while(target && target != this ) target = target.parentNode;
		if(target != this ){                                                   //防止事件冒泡
			count = 0;                                                         //恢复各个变量
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
		buttons[i].state = 0;                                                    //初始化按钮状态，0表示激活，1表示灭活
		buttons[i].clicked = 0;                                                  //0表示未被点击，1表示已经被点击过
		buttons[i].onclick = function(){
			if(!this.state && !this.clicked){
				var that = this;
				this.getElementsByClassName('unread')[0].style.opacity = 0.7;
				this.getElementsByClassName('unread')[0].innerHTML = '...';      //等待服务器响应
				var xmlhttp;
				if (window.XMLHttpRequest) {
					xmlhttp = new XMLHttpRequest();
				}
				else{
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				xmlhttp.onreadystatechange=function(){
					if (xmlhttp.readyState==4 && xmlhttp.status==200){           //服务器响应后执行的操作
						that.getElementsByClassName('unread')[0].innerHTML = xmlhttp.responseText; //显示随机数
						for(var j = 0; j < buttons.length; j++){                 //将其他按钮变为可按转态
							if(!buttons[j].clicked){
								buttons[j].style.background = 'blue';
							}
							buttons[j].state = 0;
						}
						that.style.background = 'gray';
						count++;
						sum += parseInt(xmlhttp.responseText);
						if(count == buttons.length){                             //若6个按钮都已经被按下，激活气泡按钮
							document.getElementById('info-bar').style.background = 'blue';
						}
					}
				}
				xmlhttp.open("GET","/",true);
				xmlhttp.send();
				this.clicked = 1;
				for(var j = 0; j < buttons.length; j++){                         //发送请求后，将其他按钮灭活
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