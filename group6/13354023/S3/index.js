/*
 * Project: hw4 - S3
 *
 * Author: Junhong Chen
 *
 * Create On: 15/03/27
 *
 * Last Modified: 15/03/28
 *
 */

window.onload = function() {
  setCalculator();
}

/* Pre: None
 * Post: A simulation by robot on the calculator is performed */
function robot(done) {
  var event = document.createEvent('MouseEvents');
  event.initEvent("click", true, true);
  if (done) {
    $('info-bar').dispatchEvent(event);
  } else {
    var buttons = $('control-ring').getElementsByTagName('li');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].dispatchEvent(event);
    }
  }
}

/* Pre: None
 * Post: The ring calculator is set */
function setCalculator() {
  var buttons = $('control-ring').getElementsByTagName('li');
  var onclicks = new Array();  // store the onclick of other buttons temparaily
  var count = 0, sum = 0;  // count: the buttons clicked, sum: random number sum
  var reset = true;  // whether need to reinitiate the calculator
  var robotMode = false;

  var afterRetrieved = function(id) {
    // disable current button
    addClass(buttons[id], 'disabled');
    buttons[id].onclick = undefined;
    // enable other buttons
    for (var j = 0; j < buttons.length; j++) {
      if (j === id || robotMode)  continue;
      removeClass(buttons[j], 'disabled');
      buttons[j].onclick = onclicks[j];
    }
  };

  var beforeRetrieved = function(id) {
    // disable other buttons
    for (var j = 0; j < buttons.length; j++) {
      if (j === id)  continue;
      addClass(buttons[j], 'disabled');
      onclicks[j] = buttons[j].onclick;
      buttons[j].onclick = undefined;
    }
  };

  // enable the summation
  $('at-plus-container').onmousedown = function() {
    if (reset) {
      // set the robot initiator
      $$('apb').onclick = function() {
        robotMode = true;
        robot(false);
        this.onclick = undefined;
      }
      count = sum = 0;
      for (var i = 0; i < buttons.length; i++) {
        var setClick = function(id) {
          buttons[id].onclick = function() {
            // set number notifier
            var notifier = addTag(buttons[id], 'span');
            addClass(notifier, 'unread');
            notifier.innerHTML = '...';
            // retrieve random number
            loadXML('/' + id, function() {
              if (this.readyState === 4 && this.status === 200) {
                // renew the notifier
                notifier.innerHTML = this.responseText;
                sum += parseInt(this.responseText);
                // set button states
                afterRetrieved(id);
                // if all clicked, trigger the sum event
                if (++count == 5) {
                  $('info-bar').onclick = function() {
                    $('result').innerHTML = sum.toString();
                    this.onclick = undefined;
                  }
                  if (robotMode) robot(true); // tell the robot to continue
                }
              }
            });
            if (!robotMode) beforeRetrieved(id);
          };
        }(i);
      }
      reset = false;
    }
  };

  // clear the result when mouse move away
  $('at-plus-container').onmouseleave = function() {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].onclick = undefined;
      onclicks[i] = undefined;
      removeTag(buttons[i], 'span');
      removeClass(buttons[i], 'disabled');
      $('result').innerHTML = '';
    }
    reset = true;
    robotMode = false;
  };
}

/* Pre: An url to send request and a function to handle the change
 * Post: A request is sent and the response will trigger the function */
function loadXML(url, cfunc) {
  var xmlHttp = window.XMLHttpRequest ? (new XMLHttpRequest()) : (new ActiveXObject("Microsoft.XMLHTTP"));
  xmlHttp.onreadystatechange = cfunc;
  xmlHttp.open("GET", url, true);
  xmlHttp.send();
}

/* Tool Functions */

/* Pre: Id of an element
 * Post: Element with the id is returned */
function $(id) {
  return document.getElementById(id);
}

/* Pre: Class name of the element and specfier which limits the range
 * Post: Element with class name someClass is returned */
function $$(someClass, specifier) {
  var patternStr = '(^|\\s)*' + someClass + '(\\s|$)*';
  var pattern = new RegExp(patternStr);
  var elements = specifier ? document.getElementsByTagName(specifier) : document.all;
  for (var i = 0; i < elements.length; i++) {
    if (pattern.test(elements[i].className)) {
      return elements[i];
    }
  }
}

/* Pre: An element and a class name to be added
 * Post: The element belongs to another class someClass and it is returned */
function addClass(element, someClass) {
  var patternStr = '(^|\\s)*' + someClass + '(\\s|$)*';
  var pattern = new RegExp(patternStr);
    element.className += ' ' + someClass;
  return element;
}

/* Pre: An element and a class name
 * Post: The class, if belonged to the elment, is removed */
function removeClass(element, someClass) {
  var patternStr = '(^|\\s)*' + someClass + '(\\s|$)*';
  var pattern = new RegExp(patternStr);
  if (pattern.test(element.className)) {
    element.className = element.className.replace(pattern, ' ');
  }
  return element;
}

/* Pre: An element and a tag name to be added
 * Post: A new Html tag is added to the element*/
function addTag(element, someTag) {
  var newTag = document.createElement(someTag);
  element.appendChild(newTag);
  return newTag;
}

/* Pre: An element and a tag name to be removed
 * Post: All tags with the tag name someTag is removed from element */
function removeTag(element, someTag) {
  var children = element.getElementsByTagName(someTag);
  var size = children.length;
  for (var i = 0; i < size; i++) {
    element.removeChild(children[0]);
  }
  return element;
}

// Usage Examples:
// addClass($$('mask', 'li'), 'disabled')
// removeClass($$('mask', 'li'), 'disabled')
// var element = addTag($$('mask', 'li'), 'span')
// addClass(element, 'unread')
// removeTag(element, 'span')
