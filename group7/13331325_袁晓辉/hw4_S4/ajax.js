window.onload = function() {
  var target = document.getElementById("button");
  valid = true;
  resetflag = false;
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
function ajax(target, idnumber) {
  var span = target.getElementsByTagName("span")[0];
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
      var target = document.getElementsByTagName("li")[idnumber];
      if (resetflag == true) {
        target.style.backgroundColor = "blue";
        return ;
      }
      var span = target.getElementsByTagName("span")[0];
      span.innerHTML=xmlHttpReg.responseText;
      target.style.backgroundColor = "gray";
      addClass(target, "done");
    }
  }
}

function reset() {
  valid = true;
  resetflag = true;
  var lis = document.getElementsByTagName("li");
  for (var i = 0; i < lis.length; i++) {
    lis[i].style.backgroundColor = "blue";
    lis[i].getElementsByTagName("span")[0].style.opacity = "0";
    removeClass(lis[i], "done")
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
    if (!hasClass(lis[i], "done")) {
      flag = false;
    }
  }
  if (flag == true){
    var info = document.getElementById("info-bar");
    window.clearInterval(id);
    add(info);
    return true;
  }
  return false;
}

function add(target) {
  var lis = document.getElementsByTagName("li");
  var sum = 0;
  for (var i = 0; i < lis.length; i++) {
    var str = lis[i].getElementsByTagName("span")[0].innerHTML;
    sum += parseInt(str);
  }
  target.innerHTML = sum.toString();
  target.style.backgroundColor = "gray";
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
function random() {
  if (valid == false) return;
  if (valid == true) {
    valid = false;
  }
  resetflag = false;
  var arr=new Array("0","1","2", "3", "4");
  arr.sort(function(){return Math.random()>0.5?-1:1;});
  var info = document.getElementById("info-bar");
  var lis = document.getElementsByTagName("li");
  for (var i = 0; i < arr.length; i++) {
    info.innerHTML += String.fromCharCode(parseInt(arr[i]) + 65);
    info.style.fontSize = "30px";
    ajax(lis[arr[i]], arr[i]);
  }
}