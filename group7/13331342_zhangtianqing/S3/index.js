window.onload = function() {
    arr = [];
    arr.push(document.getElementById('a'));
    arr.push(document.getElementById('b'));
    arr.push(document.getElementById('c'));
    arr.push(document.getElementById('d'));
    arr.push(document.getElementById('e'));

    atplus = document.getElementById('atplus');
    atplus.addEventListener('click', clickAll);

    for (var i = 0; i < arr.length; i++) {
        arr[i].addEventListener('click', getRN);
    }
}

var clickAll = function() {
    for (var i = 0; i < arr.length; i++) {
        arr[i].click();
    }
}

var getRN = function() {
    var that = this;
    var span = this.getElementsByTagName('span')[0];
    span.classList.remove('invi');
    span.classList.add('visible');
    var req = new XMLHttpRequest();
    req.open("get", "http://localhost:3000/");
    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            span.innerHTML = req.responseText;
            disable(that);
            calculate();
        }
    }
    req.send();
}

var calculate = function() {
    if (finish() == true) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += Number(arr[i].getElementsByTagName('span')[0].innerHTML);
        }
        sum_num = document.getElementById('sum_num');
        sum_num.innerHTML = sum;
    } else {
        return;
    }
}


var disable = function(others) {
    others.classList.remove('enable');
    others.classList.add('disable');
}


var enable = function(others) {
    if (others instanceof Array) {
        for (var i = 0; i < others.length; i++) {
            if (others[i].getElementsByTagName('span')[0].innerHTML ==='...') {
                others[i].addEventListener('click',getRN);
                others[i].classList.remove('disable');
                others[i].classList.add('enable');
            }
        }
    } else {
        others.addEventListener('click',getRN);
        others.classList.remove('disable');
        others.classList.add('enable');
    }
}


var finish = function() {
    var flag = true;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].getElementsByTagName('span')[0].innerHTML == '...') {
            flag = false;
        }
    }

    if (flag == true) return true;
    else return false;
}





