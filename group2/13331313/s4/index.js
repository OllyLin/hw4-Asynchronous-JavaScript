var on = false;
var arr;
var index;
var letters = ['A', 'B', 'C', 'D', 'E'];

window.onload = function() {
    var container = document.getElementById('button');
    var info = document.getElementById('info-bar');
    var buttons = document.getElementById('control-ring').getElementsByTagName('li');
    var ele = document.createElement('p');          //点击顺序展示的ele
    var re = document.getElementById('bottom-positioner');
    document.getElementById('at-plus-container').insertBefore(ele, re);
    ele.style.position='absolute';
    ele.setAttribute('id', 'dis');
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
    index = 0;
    document.getElementById('apb').onclick = function() {arr = randomArray();simulate(buttons, 0);display(ele);}
}

function display(ele) {             //点击顺序的展示
    ele.innerHTML = letters[arr[0]]+' '+letters[arr[1]]+' '+letters[arr[2]]+' '+letters[arr[3]]+' '+letters[arr[4]];
}

function randomsort(a, b) {         //随机排序的比较函数
        return Math.random()>.5 ? -1 : 1; 
}

function randomArray() {        //随机排列数组
    var a = [0, 1, 2, 3, 4];
    a = a.sort(randomsort);
    return a;
}

function simulate(buttons, p) {         //机器人模拟程序
    var i = 0;
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, false, false, false, false, 0, null);
    on = true;
    buttons[arr[p]].onclick();
}

function initial(buttons, info) {           //全局初始化
    for (var i = 0; i < buttons.length; i++) {
        (function(i) {buttonInitial(buttons, i)})(i);
    }
    info.getElementsByTagName('span')[0].innerHTML="";
    on = false;
    index = 0;
    document.getElementById('dis').innerHTML="";
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

function buttonInterface(buttons, p) {
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
            index++;
            if (on == true) {           //当机器人程序启动时，继续自动操作
                if (index < buttons.length) setTimeout(function() {buttons[arr[index]].onclick()}, 500);
                else if (index == buttons.length) document.getElementById('info-bar').onclick();
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