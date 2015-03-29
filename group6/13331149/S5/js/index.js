function aHandler(callback) {
  disenableBtns(0);
  if (Math.random() > 0.5) {
      return {'saying': 'A：这不是个天大的秘密'};
  }
  var button = document.getElementById('control-ring').getElementsByTagName('li')[0];
  var numspan = document.getElementsByClassName('unread')[0];
  var request = getHTTPObject();
  request.open('GET', "/", true);
  request.onreadystatechange = function() {
    if (request.readyState == 4  && request.status === 200) {
      numspan.textContent = request.responseText;
      addClass(numspan, "visible");
      addClass(button, "disabled");
      addClass(button, "clicked");
      button.onclick = null;
      enableOtherBtns(0);
      callback(request.responseText, "A：这是个天大的秘密");
    }
  }
  numspan.innerHTML = "...";
  request.send(null);
};

function bHandler(callback) {
  disenableBtns(1);
  if (Math.random() > 0.5) {
      return {'saying': 'B：我知道'};
  }
  var button = document.getElementById('control-ring').getElementsByTagName('li')[1];
  var numspan = document.getElementsByClassName('unread')[1];
  var request = getHTTPObject();
  request.open('GET', "/", true);
  request.onreadystatechange = function() {
    if (request.readyState == 4  && request.status === 200) {
      numspan.textContent = request.responseText;
      addClass(numspan, "visible");
      addClass(button, "disabled");
      addClass(button, "clicked");
      button.onclick = null;
      enableOtherBtns(1);
      callback(request.responseText, "B：我不知道");
    }
  }
  numspan.innerHTML = "...";
  request.send(null);
};

function cHandler(callback) {
  disenableBtns(2);
  if (Math.random() > 0.5) {
      return {'saying': 'C：你知道'};
  }
  var button = document.getElementById('control-ring').getElementsByTagName('li')[2];
  var numspan = document.getElementsByClassName('unread')[2];
  var request = getHTTPObject();
  request.open('GET', "/", true);
  request.onreadystatechange = function() {
    if (request.readyState == 4  && request.status === 200) {
      numspan.textContent = request.responseText;
      addClass(numspan, "visible");
      addClass(button, "disabled");
      addClass(button, "clicked");
      button.onclick = null;
      enableOtherBtns(2);
      callback(request.responseText, "C：你不知道");
    }
  }
  numspan.innerHTML = "...";
  request.send(null);
};

function dHandler(callback) {
  disenableBtns(3);
  if (Math.random() > 0.5) {
      return {'saying': 'D：他知道'};
  }
  var button = document.getElementById('control-ring').getElementsByTagName('li')[3];
  var numspan = document.getElementsByClassName('unread')[3];
  var request = getHTTPObject();
  request.open('GET', "/", true);
  request.onreadystatechange = function() {
    if (request.readyState == 4  && request.status === 200) {
      numspan.textContent = request.responseText;
      addClass(numspan, "visible");
      addClass(button, "disabled");
      addClass(button, "clicked");
      button.onclick = null;
      enableOtherBtns(3);
      callback(request.responseText, "D：他不知道");
    }
  }
  numspan.innerHTML = "...";
  request.send(null);
};

function eHandler(callback) {
  disenableBtns(4);
  if (Math.random() > 0.5) {
      return {'saying': 'E：才怪你妹'};
  }
  var button = document.getElementById('control-ring').getElementsByTagName('li')[4];
  var numspan = document.getElementsByClassName('unread')[4];
  var request = getHTTPObject();
  request.open('GET', "/", true);
  request.onreadystatechange = function() {
    if (request.readyState == 4  && request.status === 200) {
      numspan.textContent = request.responseText;
      addClass(numspan, "visible");
      addClass(button, "disabled");
      addClass(button, "clicked");
      button.onclick = null;
      enableOtherBtns(4);
      callback(request.responseText, "E：才怪");
    }
  }
  numspan.innerHTML = "...";
  request.send(null);
};

function enableOtherBtns(index) {
  var buttons = document.getElementsByClassName("button");
  for (var i = 0; i < buttons.length; i++) {
    if (i != index && !hasClass(buttons[i], "clicked")) {
      removeClass(buttons[i], "disabled");
    }
  }
  if (index != 0)
    addEvent(buttons[0], "click", aHandler);
  if (index != 1)
  addEvent(buttons[1], "click", bHandler);
  if (index != 2)
  addEvent(buttons[2], "click", cHandler);
  if (index != 3)
  addEvent(buttons[3], "click", dHandler);
  if (index != 4)
  addEvent(buttons[4], "click", eHandler);
};

function disenableBtns(index) {
  var buttons = document.getElementsByClassName("button");
  for (var i = 0; i < buttons.length; i++) {
    if (i != index) {
      addClass(buttons[i], "disabled");
      buttons[i].onclick = null;
    }
  }
};

function getRandomOrder() {
  var numbers = [0, 1, 2, 3, 4];
  numbers.sort(function(a, b) {
      return Math.random() > 0.5 ? -1 : 1;
  });
  return numbers;
};

function init() {
  var numspans = document.getElementsByClassName("unread");
  for (var i = 0; i < numspans.length; i++) {
    removeClass(numspans[i], "visible");
  }
  var buttons = document.getElementsByClassName("button");
  var handlers = [aHandler, bHandler, cHandler, dHandler, eHandler];
  for (var i = 0; i < buttons.length; i++) {
    removeClass(buttons[i], "clicked");
    removeClass(buttons[i], "disabled");
    addEvent(buttons[i], "click", handlers[i]);
  }

  var sum_output = document.getElementsByClassName("sum")[0];
  var info_bar = document.getElementById("info-bar");
  sum_output.innerHTML = "";
  addClass(info_bar, 'disabled');
};

function RecursionFun(handlers, order, index, sum) {
  var res = handlers[order[index]](function(text, saying) {
      var num = +text;
      var sum_output = document.getElementsByClassName("sum")[0];
      var message = document.getElementsByClassName("message")[0];
      index += 1;
      message.innerHTML = saying;
      if (index == 5) {
        setTimeout(function(){
          sum_output.innerHTML = sum+num;
          message.innerHTML = "楼主异步调用战斗力感人，目测不超过" + sum_output.innerHTML;
        }, 2000);
      } else {
        setTimeout(function(){
          RecursionFun(handlers, order, index, sum+num);
        }, 2000);
      }
    });
  var message = document.getElementsByClassName("message")[0];
  message.innerHTML = res["saying"]+"  //函数调用失败！请重试";
};

window.onload = function() {
  var at_plus = document.getElementById("at-plus-container");
  var apb = document.getElementsByClassName("apb")[0];
  var buttons = document.getElementsByClassName("button");
  var handlers = [aHandler, bHandler, cHandler, dHandler, eHandler];
  addEvent(apb, "click", function() {
    var order = getRandomOrder();
    var sum_output = document.getElementsByClassName("sum")[0];
    sum_output.innerHTML = "";
    for (var i = 0; i < order.length; i++) {
      sum_output.innerHTML += String.fromCharCode(64 + parseInt(order[i]+1));
    }
    RecursionFun(handlers, order, 0, 0);
  });
  addEvent(at_plus, 'mouseenter', init);
};