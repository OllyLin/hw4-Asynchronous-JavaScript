window.onload = function(){
	setbubble();
	makeclear();
	// setatplus();
	 var buttons = document.getElementsByTagName("button");
    // buttons[0].disabled = 1;

    var at_plus = document.getElementById("bottom-positioner");
    at_plus.onclick = function() {
        getRandomOrder(buttons);
    }
}

function setbubble() {//初始化小气泡

	$("li[title = active]").click(function (){
		// begin();
		$(this).off('click');//点击后灭活
		$(this).children("span").addClass("unread");
		var that = this;
		addtitle(that);//添加标签
		deactive(that);//灭活其他气泡
		$(that).children().text('...');

		getnum("http://localhost:3000",that,function(randomnum) {//获取随机数
			$(that).children().text(randomnum);
			reactive(that);
			setbigbubble(that,function() {});
		});
		

})
}

function resetbubble() {//重置小气泡
	$("li").attr("title",'active');
	$("li").children("span").empty();
	$("li").children("span").removeClass('unread');
	$("li").css('background-color', 'rgba(48, 63, 159, 1)');
	setbubble();
}

function makeclear() {//鼠标移开后清除之前内容
	$('body').first().mouseleave(function() {
		resetbubble();
		resetbigbubble();
	});
}

function deactive(that) {//点击一个气泡时，灭活其他气泡
	console.log(that);
	$(that).first().siblings().off('click');
	$(that).first().siblings().css('background-color','rgba(0, 0, 0, 0.6)');
}

function reactive(that) {//被点击的气泡获得随机数后重新计划其他未取得随机数的气泡
	$(that).css('background-color','rgba(0, 0, 0, 0.6)')
	$(that).first().siblings('[title = active]').add(setbubble());
	$(that).first().siblings('[title = active]').css('background-color', 'rgba(48, 63, 159, 1)');
}

function addtitle(that) {
	$(that).attr("title",'inactive');
}
function setbigbubble(that,callback) {//设置大气泡，当获得随机数的气泡数为5时激活

	setTimeout(function() {
		if(typeof callback === 'function') {
			callback();

	if($('li[title = inactive]').length == 5) {
		$('#info-bar').css('background-color', 'rgba(48, 63, 159, 1)');
		$('#info-bar').click(function() {
		$('#info-bar').css('background-color','rgba(0, 0, 0, 0.6)');
		$('#info-bar').attr("title",'inactive');
		var str = $('li[title = inactive]').children().text();
		// console.log("hello nope "+$('li[title = inactive]').children().text());
		for(var i=0,sum=0;i < str.length;i++) {
			sum += parseInt(str[i]);
		}
		$('#info-bar li').children().text(sum);
				});
			}
		}
	},0);

}
function resetbigbubble() {//重置大气泡
	$('#info-bar').attr("title",'active');
	$('#info-bar').css('background-color','rgba(0, 0, 0, 0.6)');
	$('#info-bar').off('click');
}

function getnum(url,that,successfunction) {//请求服务端返回随机数
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
function getRandomOrder(buttons) {
    var order = new Array;
    for (var i = 0; i < 5; i++) {
        order[i] = i + 1;
    }
    order.sort(function() {
        return Math.random() - 0.5;
    })

    for (var i = 0; i < 5; i++) {
        document.getElementById("bubble-order").innerHTML += number_list[i].toString() + ' ';
        String.fromCharCode(order[i] - 1 + 65);
    }

    getRandomNumber(buttons, buttons[order[0]], function() {
        getRandomNumber(buttons, buttons[order[1]], function() {
            getRandomNumber(buttons, buttons[order[2]], function() {
                getRandomNumber(buttons, buttons[order[3]], function() {
                    getRandomNumber(buttons, buttons[order[4]], function() {

                    })
                })
            })
        })
    })
}

// function robot(that,callback) {//机器人函数
// 	var obj = that;
// 	obj.click();
// 	// obj.first().siblings().click();
// 	// setTimeout(function() {
// 	// 	if(typeof callback === 'function') {
// 	// 		callback();
// 	// 	}
// 	// },0);
// }
// function begin() {
// 	robot($('#control-ring').children()[4]);
// 	robot($('#control-ring').children()[3]);
// 	robot($('#control-ring').children()[2]);
// 	robot($('#control-ring').children()[1]);
// 	robot($('#control-ring').children()[0],function() {$('#info-bar').click()});
	
// }
//  function setatplus() {
//  	$('#at-plus-container').click(function(){
//  		begin();
//  	})
// }
// // function begin(callback) {//启动机器人

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
// // function setatplus() {
// // 	$('#at-plus-container').click(function(){
// // 		begin();
// // 	})
// // }