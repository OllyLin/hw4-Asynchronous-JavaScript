window.onload = function() {
  addBaseFunctionToDomObject();
  addEventToWordButtons();
  addEventToResultButton();
}

function addBaseFunctionToDomObject() {
  Object.prototype.hasClass = function(className) {
    var regex = new RegExp('(\\s|^)' + className + '(\\s|$)');
    var result = this.className.match(regex);
    return result !== null;
  }
  Object.prototype.addClass = function(className) {
    if (this.hasClass(className)) {
      return;
    }
    this.className += ' ' + className;
    return this;
  }
  Object.prototype.removeClass = function(className) {
    if (this.hasClass(className)) {
      var regex = new RegExp('(\\s|^)' + className + '(\\s|$)');
      this.className = this.className.replace(regex, ' ');
    }
    return this;
  }
}

function addEventToWordButtons() {
  var buttons = getWordButtons();
  for (var i = 0; i < buttons.length; i++) {
    addEventToButton(buttons[i]);
  }
}

function getWordButtons() {
  var buttonFather = document.getElementById('control-ring');
  return buttonFather.getElementsByTagName('li');
}

function addEventToButton(button) {
  button.addEventListener('click', function(data) {
    getData('http://localhost:3000', function(data) {
      var numSpan = button.getElementsByClassName('unread')[0];
      numSpan.innerHTML = data;
      numSpan.removeClass('hidden');
    }, function() {
      // To do
    });
  });
}

function getXmlHttpRequest() {
  var XMLHttp;
  if (window.XMLHttpRequest) {
    XMLHttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    XMLHttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  return XMLHttp;
}

function getData(url, successFunc, failFunc) {
  var XMLHttp = getXmlHttpRequest();
  if (typeof XMLHttp !== 'undefined') {
    XMLHttp.open('GET', url);
    XMLHttp.send(null);
    XMLHttp.onreadystatechange = function() {
      if ((XMLHttp.readyState == 4) && (XMLHttp.status == 200)) {
        successFunc(XMLHttp.responseText);
      }
    }
  }
}

function addEventToResultButton() {
  var resultButton = document.getElementById('info-bar');
  resultButton.addEventListener('click', function() {
    var buttons = getWordButtons();
    var sum = calculateSumFromButton(buttons);
    var result = document.getElementById('result');
    result.innerHTML = sum;
  });
}

function calculateSumFromButton(buttons) {
  var sum = 0;
  for (var i = 0; i < buttons.length; i++) {
    var numSpan = buttons[i].getElementsByClassName('unread')[0];
    sum += parseInt(numSpan.innerHTML);
  }
  return sum;
}