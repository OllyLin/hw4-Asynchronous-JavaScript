// ****************************
// In file ../s4/index.js
// Create by Junjie Li
// Last modified on 2015-3-25
// ****************************


var getBtns = function() {
    var result = [];
    result.push(document.getElementById('A'));
    result.push(document.getElementById('B'));
    result.push(document.getElementById('C'));
    result.push(document.getElementById('D'));
    result.push(document.getElementById('E'));
    return result;
};

var disable = function(other) {
    if (other instanceof Array) {
        for (var i = other.length - 1; i >= 0; i--) {
            other[i].classList.remove('enable');
            other[i].classList.add('disable');
        }
    } else {
        other.classList.remove('enable');
        other.classList.add('disable');
    }
};

var enable = function(other) {
    if (other instanceof Array) {
        for (var i = other.length - 1; i >= 0; i--) {
            if (other[i].children[0].innerHTML === '...') {
                other[i].classList.remove('disable');
                other[i].classList.add('enable');
            }
        }
    } else {
        other.classList.remove('disable');
        other.classList.add('enable');
    }

};

var isAllGetNum = function(btns) {
    return (btns[0].children[0].innerHTML !== '...' && btns[1].children[0].innerHTML !== '...' && btns[2].children[0].innerHTML !== '...' && btns[3].children[0].innerHTML !== '...' && btns[4].children[0].innerHTML !== '...');
};

var shuffle = function(array) {
    for (var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
};

window.onload = function() {
    var xhr = new XMLHttpRequest();
    var btns = getBtns();
    var bubble = document.getElementById('sum');
    var atplus = document.getElementById('atplus');
    var api = document.getElementById('api');
    var orderList = [0, 1, 2, 3, 4];
    var orderDict = {
        '0': 'A',
        '1': 'B',
        '2': 'C',
        '3': 'D',
        '4': 'E',
    }
    shuffle(orderList);

    atplus.addEventListener('mouseout', function(event) { // reset all
        var target = event.relatedTarget ? event.relatedTarget : event.toElement;
        while (target && target != this) {
            target = target.parentNode;
        }
        if (target != this) {
            for (var i = btns.length - 1; i >= 0; i--) {
                btns[i].children[0].classList.remove('show');
                btns[i].children[0].innerHTML = '...';
                bubble.innerHTML = '';
                xhr.abort();
                enable(btns);
                enable(bubble);
                enable(api);
                orderList = [0, 1, 2, 3, 4];
                shuffle(orderList);
            }
        }
    });

    bubble.addEventListener('click', function(event) { // calculate the sum
        var that = event.target;
        if (that.classList.contains('enable')) {
            var sum = 0;
            for (var i = btns.length - 1; i >= 0; i--) {
                sum += Number(btns[i].children[0].innerHTML);
            }
            this.innerHTML += sum;
        }
    });

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function(i) {
            var getNum = function(event) { // get num from server
                var that = event.target;
                if (that.classList.contains('enable')) {
                    var other = [];
                    for (var j = btns.length - 1; j >= 0; j--) {
                        if (btns[j].id !== that.id) {
                            other.push(btns[j]);
                        }
                    }
                    disable(other);
                    var redBtn = that.children[0];
                    redBtn.classList.add('show')
                    xhr.open("get", "/");
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            redBtn.innerHTML = xhr.responseText;
                            enable(other);
                            disable(that);
                            if (isAllGetNum(btns)) {
                                enable(bubble);
                                bubble.click();
                            } else {
                                if (!event.x) {
                                    btns[orderList.shift()].click();
                                }
                            }
                        }
                    }
                    xhr.send(null);
                }
            }
            return getNum;
        }(i));
    }

    api.addEventListener("click", function() {
        if (this.classList.contains("enable")) {
            disable(this);
            var text = "";
            for (var key in orderList) {
                text += orderDict[orderList[key]];
            }
            bubble.innerHTML += ("<br />" + text + "<br />");
            btns[orderList.shift()].click();
        }
    })
};
