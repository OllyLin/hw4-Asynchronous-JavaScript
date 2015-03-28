window.onload = function() {
  var target = document.getElementById("button");
  target.onmouseout = function(e) {
    e = window.event || e;
    var s = e.toElement || e.relatedTarget;
    if(document.all) {
      if (!this.contains(s)) {
        reset();
      }
    } else {
        var reg = this.compareDocumentPosition(s);
        if (!(reg == 20 || reg == 0)) {
          reset();
        }
      }
  }
  id=window.setInterval(check,10);
};
function ajax(target) {
  if (hasClass(target, "temporaryDisabled") || hasClass(target, "foreverDisabled")) return;
  addClass(target, "temporaryDisabled");
  disable();
  span = target.getElementsByTagName("span")[0];
  span.style.opacity = "1";
  span.innerHTML= "...";
  var xmlHttpReg = null;
  if (window.ActiveXObject) {
    xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");
  } else if (window.XMLHttpRequest) {
      xmlHttpReg = new XMLHttpRequest();
    }
  //如果实例化成功,就调用open()方法,就开始准备向服务器发送请求
  if (xmlHttpReg != null) {
    xmlHttpReg.open("get", "/", true);
    xmlHttpReg.send(null);
    xmlHttpReg.onreadystatechange = showNumber; //设置回调函数
  }
  //回调函数
  //一旦readyState的值改变,将会调用这个函数,readyState=4表示完成相应

  //设定函数doResult()
  function showNumber() {
    if (xmlHttpReg.readyState == 4 && xmlHttpReg.status == 200) {//4代表执行完成, 200代表执行成功
      span.innerHTML=xmlHttpReg.responseText;
      able();
      addClass(target, "foreverDisabled");
      target.style.backgroundColor = "gray";
    }
  }
  function disable() {
    var lis = document.getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {
      if (!hasClass(lis[i], "foreverDisabled") && target != lis[i]) {
        addClass(lis[i], "temporaryDisabled");
        lis[i].style.backgroundColor = "gray";
      }
    }
  }
  function able(){
    var lis = document.getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {
      if (hasClass(lis[i], "temporaryDisabled")) {
        removeClass(lis[i], "temporaryDisabled");
        lis[i].style.backgroundColor = "blue";
      }
    }
  }
}

function reset() {
  var lis = document.getElementsByTagName("li");
  for (var i = 0; i < lis.length; i++) {
    if (hasClass(lis[i], "foreverDisabled")) {
      removeClass(lis[i], "foreverDisabled");
    }
    if (hasClass(lis[i], "temporaryDisabled")) {
      removeClass(lis[i], "temporaryDisabled");
    }
    lis[i].style.backgroundColor = "blue";
    lis[i].getElementsByTagName("span")[0].style.opacity = "0";
  }
  var info = document.getElementById("info-bar");
  info.innerHTML = "";
  info.style.backgroundColor = "gray"
  id=window.setInterval(check,10);
}

function check() {
  var lis = document.getElementsByTagName("li");
  var flag = true;
  for (var i = 0; i < lis.length; i++) {
    if (!hasClass(lis[i], "foreverDisabled")) {
      flag = false;
    }
  }
  if (flag == true){
    var info = document.getElementById("info-bar");
    info.style.backgroundColor = "blue";
    addClass(info, "able");
    window.clearInterval(id);
  }
}

function sum(target) {
  if (!hasClass(target, "able")) return;
  var lis = document.getElementsByTagName("li");
  var sum = 0;
  for (var i = 0; i < lis.length; i++) {
    var str = lis[i].getElementsByTagName("span")[0].innerHTML;
    sum += parseInt(str);
  }
  target.innerHTML = sum.toString();
  target.style.backgroundColor = "gray";
  removeClass(target, "able");
}
function hasClass(obj, cls) {  
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
  
function addClass(obj, cls) {  
  if (!hasClass(obj, cls)) obj.className += " " + cls;  
}  
  
function removeClass(obj, cls) {  
  if (hasClass(obj, cls)) {  
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
      obj.className = obj.className.replace(reg, ' ');  
  }
}