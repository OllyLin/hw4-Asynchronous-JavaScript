;(function(d) {
  "use strict"

  var at_plus = document.getElementById("at-plus-container");
  var sum_output = document.getElementsByClassName("sum")[0];
  var apb = document.getElementsByClassName("apb")[0];
  var buttons = document.getElementsByClassName("button");
  var info_bar = document.getElementById("info-bar");
  var clickedMark = {};
  var index = 0;
  /**
    向服务器发送一个请求获得一个随机数，并且显示
   */
  function getRandomNum(button) {
    index += 1;
    var request = getHTTPObject(); //获得一个XMLHttpRequest实例
    //设置requeset
    request.open('GET', "/", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //如果当前点击的button以及获得数字，那么移去这个数字
    var childspans = button.childNodes;
    removeChildElementByClass(childspans, "unread"); 
    //新建一个span来存放数字,将span放入button的子元素中
    var numspan = document.createElement("span");
    addClass(numspan, "unread");
    numspan.innerHTML = "...";
    button.appendChild(numspan);
    //ajax是异步，这个函数会调用多次，每次改变状态都调用一次。
    request.onreadystatechange = function() {
      if (request.readyState == 4  && request.status === 200) { //当状态为4的时候表示数据传输完毕
        numspan.innerHTML = request.responseText;
        //灭活当前按钮，变为灰色，用户不能够点击
        clickedMark[button.id] = true;
        recoverState();
        addClass(button, "disabled");
        removeEvent(button, 'click', handleButtonClick);
        if (index == 5) {
          setTimeout(function() {
            info_bar.click();
          }, 1000);
        } else {
          setTimeout(function() {
            buttons[index].click();
          }, 1000);
        }
      }
    }
    request.send(null);
  }

  /**
    处理点击函数
   */
  function handleButtonClick(e) {
    var button = e.currentTarget;
    //将当前点击button之外的button设置为失效
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i] !== button) {
        addClass(buttons[i], 'disabled');
        removeEvent(buttons[i], 'click', handleButtonClick);
      }
    }
    
    getRandomNum(button);
  }

  function clickButton(index) {
    var button = buttons[index];
    //将当前点击button之外的button设置为失效
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i] !== button) {
        addClass(buttons[i], 'disabled');
        removeEvent(buttons[i], 'click', handleButtonClick);
      }
    }
    
    getRandomNum(button);
  }
  /**
    恢复所有button的可点击状态，同时如果五个数字集齐的话，激活info_bar按钮
   */
  function recoverState() {
    //recoverButtons's style and clickEvent
    for (var i = 0; i < buttons.length; i++) {
      if (clickedMark[i] == false) {
        removeClass(buttons[i], 'disabled');
        addEvent(buttons[i], 'click', handleButtonClick);
      }
    }

    //if all num was get, activate the info_bar
    var numspans = document.getElementsByClassName("unread");
    if (numspans.length == 5) {
      removeClass(info_bar, 'disabled');
      addEvent(info_bar, 'click', cal_sum);
    }
  }

  /**
    计算五个数字之和显示在info_bar中
   */
  function cal_sum(e) {
    var numspans = document.getElementsByClassName("unread");
    var sum = 0;
    for (var i = 0; i < numspans.length; i++) {
      sum += parseInt(numspans[i].innerHTML);
    }
    sum_output.innerHTML = sum;
    addClass(info_bar, 'disabled');
  }

  /**
    初始化at-plus-container
   */
  function init() {
    for (var i = 0; i < buttons.length; i++) {
      //加入button事件处理
      addEvent(buttons[i], 'click', handleButtonClick);
      removeClass(buttons[i], 'disabled');
      //如果有获得数字的button,移去它们
      var childspans = buttons[i].childNodes;
      removeChildElementByClass(childspans, "unread");
      clickedMark[buttons[i].id] = false;
    }

    //初始化info_bar
    sum_output.innerHTML = "";
    addClass(info_bar, 'disabled');

     apb.onclick = click_At_plus;
  }

  addEvent(at_plus, 'mouseenter', init);

  function click_At_plus() {
    // for (var i = 0; i < buttons.length; i++) {
    //   alert(buttons[i].id);
    // }
    buttons[index].click();
  }

}(document));