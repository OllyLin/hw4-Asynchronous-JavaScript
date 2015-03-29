var on = false;

window.onload = function() {
    var container = document.getElementById('button');
    var info = document.getElementById('info-bar');
    var buttons = document.getElementById('control-ring').getElementsByTagName('li');
    container.onmouseout = function(e) {            //鼠标移开后的操作
        if (e) {
            if (container.contains(e.relatedTarget)) return;
        } else if (event) {
            if (container.contains(event.toElement)) return;
        }
        initial(buttons, info);             //复原所有
    }
    container.onmouseover = function(e) {           //按钮展开后的初始化
        if (e) {
            if (container.contains(e.relatedTarget)) return;
        } else if (event) {
            if (container.contains(event.fromElement)) return;
        }
        enableInterface(buttons, info);
    }
    document.getElementById('apb').onclick = function() {simulate(buttons, 0);}
}

function simulate(buttons, p) {         //机器人模拟程序
    var i = 0;
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, false, false, false, false, 0, null);
    on = true;
    buttons[p].onclick();
}

function initial(buttons, info) {           //全局初始化
    for (var i = 0; i < buttons.length; i++) {
        (function(i) {buttonInitial(buttons, i)})(i);
    }
    info.getElementsByTagName('span')[0].innerHTML="";
    on = false;
}

function buttonInitial(buttons, p) {            //按钮初始化
    var unread = buttons[p].getElementsByTagName('span')[1];
    unread.style.visibility = 'hidden';
    unread.innerHTML = "";
    buttons[p].style.backgroundColor = '#23479F';
}

function enableInterface(buttons, info) {           //为每个按钮添加onclick事件
    for (var i = 0; i < buttons.length; i++) {
        (function(i) {buttons[i].onclick = function(){return buttonInterface(buttons, i);}})(i);
    }
    info.onclick = function() {sumUp(buttons, info);};
}

function buttonInterface(buttons, p) {          //handler 
    var unread = buttons[p].getElementsByTagName('span')[1];
    var xmlhttp=new XMLHttpRequest()
    unread.style.visibility = 'visible';
    unread.innerHTML = "...";
    for (var i = 0; i < buttons.length; i++) {
        if (i == p) continue;
        else (function(i) {
            buttons[i].style.backgroundColor='gray';
            buttons[i].onclick = function(){};
        })(i)
    }
    xmlhttp.onreadystatechange=function() {             //得到服务器返回值后的操作
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            unread.innerHTML = xmlhttp.responseText;
            buttons[p].style.backgroundColor='gray';        //灭活按钮
            buttons[p].onclick = function(){};
            for (var i = 0; i < buttons.length; i++) {          //激活其他按钮
                if (buttons[i].getElementsByTagName('span')[1].innerHTML == "") {
                    (function(i) {
                        buttons[i].style.backgroundColor='#23479F';
                        buttons[i].onclick = function(){buttonInterface(buttons, i);};
                    })(i)
                }
            }
            p++;
            if (on == true) {           //当机器人程序启动时，继续自动操作
                if (p < buttons.length) setTimeout(function() {buttons[p].onclick()}, 500);
                else if (p == buttons.length) document.getElementById('info-bar').onclick();
                else return;
            }
        }
    }
    xmlhttp.open("GET","/",true);
    xmlhttp.send();
}

function sumUp(buttons, info) {         //计算总和
    var sum = 0;
    var unread;
    var allAva = true;                  //用于判断是否已经获得所有被加数
    for (var i = 0; i < buttons.length; i++) {
        unread = buttons[i].getElementsByTagName('span')[1];
        if (unread.innerHTML != "") {
            sum += parseInt(unread.innerHTML);
        } else {
            allAva = false;
        }
    }
    if (allAva) {
        info.getElementsByTagName('span')[0].innerHTML = sum;
    }
}