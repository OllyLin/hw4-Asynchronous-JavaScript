window.onload = function() {
    arr = [];
    arr.push(document.getElementById('a'));
    arr.push(document.getElementById('b'));
    arr.push(document.getElementById('c'));
    arr.push(document.getElementById('d'));
    arr.push(document.getElementById('e'));

    sum = document.getElementById("sum");
    sum.addEventListener('click', calculate);
    
    atplus = document.getElementById("atplus");
    atplus.addEventListener('click', order);
}

var order = function() {
    getRN(arr[0]);
    getRN(arr[1]);
    getRN(arr[2]);
    getRN(arr[3]);
    getRN(arr[4]);
}


var getRN = function(btn) {
    /*alert(btn.id)*/
    var others = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id !== btn.id) {
            others.push(arr[i]);
        }
    }
    disable(others);
    var span = btn.getElementsByTagName('span')[0];
    span.classList.remove('invi');
    span.classList.add('visible');

    var req = new XMLHttpRequest();
    req.open("get", "http://localhost:3000/");
    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            span.innerHTML = req.responseText;
            enable(others);
            disable(btn);
        }
    }
    req.send(null);
    
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
    if (others instanceof Array) {
        for (var i = 0; i < others.length; i++) {
            others[i].removeEventListener('click', getRN);
            others[i].classList.remove('enable');
            others[i].classList.add('disable');
        }
    } else {
        others.removeEventListener('click', getRN);
        others.classList.remove('enable');
        others.classList.add('disable');
    }
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





