window.onload = function() {
  document.getElementById("bottom-positioner").onmouseover = function() {
    init();
  };
  document.getElementById("bottom-positioner").onmouseout = function() {
    clearAll();
  }
}

function init() {
  var smallButtons = document.getElementsByClassName("button");
  for (var i = 0; i < smallButtons.length; i++) {
    smallButtons[i].onclick = function(smallButton) {
      return function () {
        clickFunc(smallButton);
      }
    } (smallButtons[i]);
  }
}

function clearAll() {
  var smallButtons = document.getElementsByClassName("button");
  for (var i = 0; i < smallButtons.length; i++) {

    setButton(smallButtons[i], false);
  }
  var sumShow = document.getElementById("sum");
  sumShow.textContent = "0";
  sumShow.style.visibility = "hidden";
}

function clickFunc(btn) {
  // small red circle
  var number = btn.firstChild;

  var xmlhttp = new XMLHttpRequest();
  // send request
  xmlhttp.open("GET", "/", true);
  xmlhttp.send();
  // before request done
  number.textContent = "...";
  number.style.visibility = "visible";
  setOtherButtons(btn, false);

  // request done successfully
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      number.textContent = xmlhttp.responseText;
      setButton(btn, false);
      setOtherButtons(btn, true);
      if (checkAllButtons())
        initLargeBubble();
    }
  }
}

function setButton(btn, flag) {
  if (flag) {
    btn.style.backgroundColor = "rgba(48, 63, 159, 1)";
    btn.onclick = function(button) {
      return function() {
        clickFunc(button);
      }
    } (btn);

  } else {
    btn.style.backgroundColor = "rgba(18, 21, 22, 0.10)";
    btn.onclick = function() {};
  }
}

function setOtherButtons(currentBtn, flag) {
  var smallButtons = document.getElementsByClassName("button");
  for (var i = 0; i < smallButtons.length; i++) {
    if (smallButtons[i].textContent != currentBtn.textContent) {
      setButton(smallButtons[i], flag)
    }
  }
}

function checkAllButtons() {
  var flag = true;
  var smallButtons = document.getElementsByClassName("button");
  for (var i = 0; flag && i < smallButtons.length; i++) {
    if (smallButtons[i].firstChild.textContent == "...")
      flag = false;
  }  
  return flag;
}

function initLargeBubble() {
  var largeBubble = document.getElementById("info-bar");
  largeBubble.onclick = function(lb) {
    return function() {
      setLargeBubble(lb);
    }
  } (largeBubble);
}

function setLargeBubble(largeBubble) {
  // sum up all random numbers
  var smallButtons = document.getElementsByClassName("button");
  var sum = 0;
  for (var i = 0; i < smallButtons.length; i++) {
    sum += parseInt(smallButtons[i].firstChild.textContent);
  }
  var sumShow = document.getElementById("sum");
  sumShow.textContent = sum;
  sumShow.style.visibility = "visible";
  // deactivate
  largeBubble.onclick = function() {};
}
