function robot(index, aBubbles) {

  // 生成随机序列
  var randomList = [0, 1, 2, 3, 4];
  var currentSum = 0;
  randomList.sort(function() {
    return Math.random()-0.5;
  });
  randomList.push(5);
  showRandomList(randomList);
  var handlers = [aHandler, bHandler, cHandler, dHandler, eHandler, bubbleHandler];
  handlers[randomList[0]](handlers, randomList, 0, currentSum);
}

// 显示随机序列
function showRandomList(randomList) {
  var oList = document.getElementById('list');
  for (var i = 0; i < randomList.length; i++) {
    switch(randomList[i]) {
      case 0:
        oList.innerHTML += 'A&nbsp';
        break;
      case 1:
        oList.innerHTML += 'B&nbsp';
        break;
      case 2:
        oList.innerHTML += 'C&nbsp';
        break;
      case 3:
        oList.innerHTML += 'D&nbsp';
        break;
      case 4:
        oList.innerHTML += 'E&nbsp';
        break;
    }
  }
}

function robotClickOnBubble(handlers, randomList, index, currentSum) {
  var aBubbles = document.getElementById('control-ring').getElementsByTagName('li');
  clickOnBubble(aBubbles[randomList[index]]);
  var that = aBubbles[randomList[index]];
  ajax('http://localhost:3000/?randnum=' + Math.random(), function(number) {
    if (that.state == 'unclicked' || hasClass(that, 'disable')) {
      return;
    }
    showNumber(that, number);
    changeState(aBubbles);
    allNumbersGot(aBubbles);
    currentSum += parseInt(number);
    handlers[randomList[index+1]](handlers, randomList, index+1, currentSum);
  });
}

function showMessage(message) {
  var oMessage = document.getElementById('message');
  oMessage.innerHTML = message;
}

function aHandler(handlers, randomList, index, currentSum) {
  showMessage("这是个天大的秘密");
  robotClickOnBubble(handlers, randomList, index, currentSum);
}

function bHandler(handlers, randomList, index, currentSum) {
  showMessage("我不知道");
  robotClickOnBubble(handlers, randomList, index, currentSum);
}

function cHandler(handlers, randomList, index, currentSum) {
  showMessage("你不知道");
  robotClickOnBubble(handlers, randomList, index, currentSum);
}

function dHandler(handlers, randomList, index, currentSum) {
  showMessage("他不知道");
  robotClickOnBubble(handlers, randomList, index, currentSum);
}

function eHandler(handlers, randomList, index, currentSum) {
  showMessage("才怪");
  robotClickOnBubble(handlers, randomList, index, currentSum);
}

function bubbleHandler(handlers, randomList, index, currentSum) {
  showMessage("楼主异步调用战斗力感人，目测不超过" + currentSum);
  var oBar = document.getElementById('info-bar');
  var aBubbles = document.getElementById('control-ring').getElementsByTagName('li');
  addUp(oBar, aBubbles);
}
