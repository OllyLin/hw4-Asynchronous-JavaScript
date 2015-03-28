window.onload = function() {
  adders = getAdders();
  sum = document.getElementById('sum');
  atplus = document.getElementById('atplus');
  api = document.getElementById('api');
  atplus.addEventListener('mouseout', reset);

  for (var i = adders.length-1; i >= 0; i--) {
    adders[i].addEventListener('click', getNum);
  }

  api.addEventListener('click', sed);
};

var sed = function() {
    adders[0].click();
}


var reset = function(e) {
  // 下js阻止子元素响应父元素的onmouseout事件
  if (!e) {
    e = window.event;
  }
  var target = e.relatedTarget ? e.relatedTarget : e.toElement;
  while (target && target != this) {
    target = target.parentNode;
  }
  if (target != this) {
    for (var i = adders.length - 1; i >= 0; i--) {
      adders[i].children[0].classList.remove('show');
      adders[i].children[0].innerHTML = '...';
      sum.removeEventListener('click', getSum);
      sum.innerHTML = '';
      enable(adders);
      sum.style.backgroundColor = 'rgba(0,0,0,0.6)';
    }
    // document.getElementById('sum').backgroundColor = "red";
    // console.log("ddd");
  }
};

var getAdders = function() {
  var result = [];
  result.push(document.getElementById('A'));
  result.push(document.getElementById('B'));
  result.push(document.getElementById('C'));
  result.push(document.getElementById('D'));
  result.push(document.getElementById('E'));
  return result;
};

var getNum = function(){
  var that = this;
  var other = [];
  for (var i = adders.length-1; i >= 0; i--) {
    if (adders[i].id !== this.id) {
      other.push(adders[i]);
    }
  }
  disable(other);
  // console.log(other.length);
  var num = this.children[0];
  num.classList.add('show')
  var xhr = new XMLHttpRequest();
  xhr.open("get", "/");
  this.removeEventListener('click', getNum);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      num.innerHTML = xhr.responseText;
      that.addEventListener('click', getNum);
      enable(other);
      disable(that);
      for (var i = 0; i < adders.length; i++) {
        if (adders[i].classList.contains('enable')) {
          adders[i].click();
          break;
        }
      }
      if (isAllGetNum()) {
        sum.addEventListener('click', getSum);
        sum.style.backgroundColor = 'rgba(48,63,159,1)';
        sum.click();
      }
    }
  }

  xhr.send(null);
};

var getSum = function() {
  // console.log('getSum');
  var sum = 0;
  for (var i = adders.length - 1; i >= 0; i--) {
    sum += Number(adders[i].children[0].innerHTML);
  }
  document.getElementById('sum').innerHTML = sum;
};

var disable = function(other) {
  if (other instanceof Array) {
    for (var i = other.length - 1; i >= 0; i--) {
      other[i].removeEventListener('click', getNum);
      other[i].classList.remove('enable');
      other[i].classList.add('disable');
    }
  } else {
    other.removeEventListener('click', getNum);
    other.classList.remove('enable');
    other.classList.add('disable');
  }
};

var enable = function(other) {
  if (other instanceof Array) {
    for (var i = other.length - 1; i >= 0; i--) {
      if (other[i].children[0].innerHTML === '...') {
        // console.log("ddd");
        other[i].addEventListener('click', getNum);
        other[i].classList.remove('disable');
        other[i].classList.add('enable');
      }
    }
  } else {
    other.addEventListener('click', getNum);
    other.classList.remove('disable');
    other.classList.add('enable');
  }

};

var isAllGetNum = function() {
  return (adders[0].children[0].innerHTML !== '...'
  && adders[1].children[0].innerHTML !== '...'
  && adders[2].children[0].innerHTML !== '...'
  && adders[3].children[0].innerHTML !== '...'
  && adders[4].children[0].innerHTML !== '...');
};
