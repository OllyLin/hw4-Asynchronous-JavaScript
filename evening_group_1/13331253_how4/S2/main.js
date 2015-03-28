window.onload = function(){
	setbubble();
	makeclear();
	// begintest();
}

function setbubble() {//初始化小气泡
	$("li[title = active]").unbind();
	$("li[title = active]").click(function (){
		
		// $(this).css('background-color','rgba(0, 0, 0, 0.6)');
		$(this).off('click');//点击后灭活
		$(this).children("span").addClass("unread");
		var that = this;
		addtitle(that);//添加标签
		deactive(that);//灭活其他气泡
		$(that).children().text('...');

		// getrandomnum(that,function(random_num){//获取随机数
		// 	$(that).children().text(random_num);
		// 	reactive(that);//重新激活其他气泡
		// 	setbigbubble(that,function() {});//激活大气泡
		// });
		getnum("http://localhost:3000",that,function(randomnum) {
			$(that).children().text(randomnum);
			reactive(that);
			setbigbubble(that,function() {});
			console.log('getnum');
			begin();
		});

})
}

function resetbubble() {
	$("li").attr("title",'active');
	$("li").children("span").empty();
	$("li").children("span").removeClass('unread');
	$("li").css('background-color', 'rgba(48, 63, 159, 1)');
	setbubble();
}

function makeclear() {
	$('body').first().mouseleave(function() {
		resetbubble();
		resetbigbubble();
	});
}

function deactive(that) {
	console.log(that);
	$(that).first().siblings().off('click');
	$(that).first().siblings().css('background-color','rgba(0, 0, 0, 0.6)');
}

function reactive(that) {
	$(that).css('background-color','rgba(0, 0, 0, 0.6)')
	$(that).first().siblings('[title = active]').add(setbubble());
	$(that).first().siblings('[title = active]').css('background-color', 'rgba(48, 63, 159, 1)');
}

function addtitle(that) {
	$(that).attr("title",'inactive');
}
function setbigbubble(that,callback) {

	setTimeout(function() {
		if(typeof callback === 'function') {
			callback();

	if($('li[title = inactive]').length == 5) {
		$('#info-bar').css('background-color', 'rgba(48, 63, 159, 1)');
		$('#info-bar').click(function() {
		$('#info-bar').css('background-color','rgba(0, 0, 0, 0.6)');
		var str = $('li[title = inactive]').children().text();
		console.log("hello nope "+$('li[title = inactive]').children().text());
		for(var i=0,sum=0;i < str.length;i++) {
			sum += parseInt(str[i]);
		}
		$('#info-bar li').children().text(sum);
				});
			}
		}
	},0);

}
function resetbigbubble() {
	$('#info-bar').css('background-color','rgba(0, 0, 0, 0.6)');
	$('#info-bar').off('click');
}

function getnum(url,that,successfunction) {
	var xmlhttp;
	if(window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}
	else {
		oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var num = parseInt($(that).children().text());
			if(num)	return ;	
			successfunction(xmlhttp.responseText);
		}
	}
}

// function robot(that,callback) {//机器人函数
// 	var obj = that;
// 	obj.click();
// 	setTimeout(function() {
// 		if(typeof callback === 'function') {
// 			callback();
// 		}
// 	},0);
// }

// function begin(callback) {//启动机器人

// 	robot($('#control-ring').children()[4],
// 		robot($('#control-ring').children()[3],
// 			robot($('#control-ring').children()[2],
// 				robot($('#control-ring').children()[1],
// 					robot($('#control-ring').children()[0],
// 						robot($('#info-bar'),function() {$('#info-bar').click()}))))))
// 	// console.log($('li[title = inactive]').length)
// 	setTimeout(function() {
// 		if($('li[title = inactive]').length != 5 || $('#info-bar[title = inactive]').length != 1)
// 		begin();
// },0)
// }
function async(value,callback) {
	var obj = value;
	obj.click();
	// console.log('click');
	setTimeout(function() {
		// if(obj.innerText >= '0' && obj.innerText <= '9')
		if(typeof callback === 'function') {
			callback();
		}
	},0);
}
function begin() {
async($('#control-ring').children()[0], function(value){
  async($('#control-ring').children()[1], function(value){
    async($('#control-ring').children()[2], function(value){
      async($('#control-ring').children()[3], function(value){
        async($('#control-ring').children()[4],function() {$('#info-bar').click()})
      });
    });
  });
});

}
// function begintest() {
// 	$('#bottom-positioner').click(function(event){
// 		begin();
// 		event.stopPropagation();
// 		return false;
// 	});

// }
