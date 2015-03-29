// ****************************
// In file ../s5/index.js
// Create by Junjie Li
// Last modified on 2015-3-25
// ****************************

var $$ = function(slt) {
    if (slt[0] === '#') {
        return document.getElementById(slt.slice(1, slt.length));
    }
    if (slt[0] == ".") {
        return document.getElementsByClassName(slt.slice(1, slt.length));
    }
}


var getBtns = function() {
    var result = [];
    result.push($$('#A'));
    result.push($$('#B'));
    result.push($$('#C'));
    result.push($$('#D'));
    result.push($$('#E'));
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

var isFail = function() {
    return Math.random() > 0.5;
}

var aHandler = function(event, currentSum, callback) {
    if (isFail()) {
        console.log("fail")
        return {
            'message': "这不是个天大的秘密<br />",
            'currentSum': currentSum
        }
    } else {
        console.log("success")
        var that = this;
        var xhr = new XMLHttpRequest();
        var btns = getBtns();
        var bubble = $$('#sum');
        var atplus = $$('#atplus');
        var api = $$('#api');
        if (that.classList.contains('enable')) {
            var other = [];
            for (var j = btns.length - 1; j >= 0; j--) {
                if (btns[j].id !== that.id) {
                    other.push(btns[j]);
                }
            }
            disable(other);
            var redBtn = that.children[0];
            redBtn.classList.add('show');
            xhr.open("get", "/");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    redBtn.innerHTML = xhr.responseText;
                    bubble.innerHTML += "这是个天大的秘密<br />";
                    enable(other);
                    disable(that);
                    currentSum += Number(xhr.responseText);
                    var error = null;
                    while (error = callback(currentSum)) {
                        bubble.innerHTML += error.message;
                    }
                }
            }
            xhr.send(null);
            return null;
        }
    }
}

var bHandler = function(event, currentSum, callback) {
    if (isFail()) {
        console.log("fail")
        return {
            'message': "我知道<br />",
            'currentSum': currentSum,
        };
    } else {
        console.log("success")
        var that = this;
        var xhr = new XMLHttpRequest();
        var btns = getBtns();
        var bubble = $$('#sum');
        var atplus = $$('#atplus');
        var api = $$('#api');
        if (that.classList.contains('enable')) {
            var other = [];
            for (var j = btns.length - 1; j >= 0; j--) {
                if (btns[j].id !== that.id) {
                    other.push(btns[j]);
                }
            }
            disable(other);
            var redBtn = that.children[0];
            redBtn.classList.add('show');
            xhr.open("get", "/");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    redBtn.innerHTML = xhr.responseText;
                    bubble.innerHTML += "我不知道<br />";
                    enable(other);
                    disable(that);
                    currentSum += Number(xhr.responseText);
                    var error = null;
                    while (error = callback(currentSum)) {
                        bubble.innerHTML += error.message;
                    }
                }
            }
            xhr.send(null);
            return null;
        }
    }
}

var cHandler = function(event, currentSum, callback) {
    if (isFail()) {
        console.log("fail")
        return {
            'message': "你知道<br />",
            'currentSum': currentSum,
        };
    } else {
        console.log("success")
        var that = this;
        var xhr = new XMLHttpRequest();
        var btns = getBtns();
        var bubble = $$('#sum');
        var atplus = $$('#atplus');
        var api = $$('#api');
        if (that.classList.contains('enable')) {
            var other = [];
            for (var j = btns.length - 1; j >= 0; j--) {
                if (btns[j].id !== that.id) {
                    other.push(btns[j]);
                }
            }
            disable(other);
            var redBtn = that.children[0];
            redBtn.classList.add('show');
            xhr.open("get", "/");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    redBtn.innerHTML = xhr.responseText;
                    bubble.innerHTML += "你不知道<br />";
                    enable(other);
                    disable(that);
                    currentSum += Number(xhr.responseText);
                    var error = null;
                    while (error = callback(currentSum)) {
                        bubble.innerHTML += error.message;
                    }
                }
            }
            xhr.send(null);
            return null;
        }
    }
}

var dHandler = function(event, currentSum, callback) {
    if (isFail()) {
        console.log("fail")
        return {
            'message': "他知道<br />",
            'currentSum': currentSum,
        }
    } else {
        console.log("success")
        var that = this;
        var xhr = new XMLHttpRequest();
        var btns = getBtns();
        var bubble = $$('#sum');
        var atplus = $$('#atplus');
        var api = $$('#api');
        if (that.classList.contains('enable')) {
            var other = [];
            for (var j = btns.length - 1; j >= 0; j--) {
                if (btns[j].id !== that.id) {
                    other.push(btns[j]);
                }
            }
            disable(other);
            var redBtn = that.children[0];
            redBtn.classList.add('show');
            xhr.open("get", "/");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    redBtn.innerHTML = xhr.responseText;
                    enable(other);
                    disable(that);
                    bubble.innerHTML += "他不知道<br />";
                    currentSum += Number(xhr.responseText);
                    var error = null;
                    while (error = callback(currentSum)) {
                        bubble.innerHTML += error.message;
                    }
                }
            }
            xhr.send(null);
            return null;
        }
    }
}

var eHandler = function(event, currentSum, callback) {
    if (isFail()) {
        console.log("fail")
        return {
            'message': "才不怪<br />",
            'currentSum': currentSum,
        }
    } else {
        console.log("success")
        var that = this;
        var xhr = new XMLHttpRequest();
        var btns = getBtns();
        var bubble = $$('#sum');
        var atplus = $$('#atplus');
        var api = $$('#api');
        if (that.classList.contains('enable')) {
            var other = [];
            for (var j = btns.length - 1; j >= 0; j--) {
                if (btns[j].id !== that.id) {
                    other.push(btns[j]);
                }
            }
            disable(other);
            var redBtn = that.children[0];
            redBtn.classList.add('show');
            xhr.open("get", "/");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    redBtn.innerHTML = xhr.responseText;
                    bubble.innerHTML += "才怪<br />";
                    enable(other);
                    disable(that);
                    currentSum += Number(xhr.responseText);
                    var error = null;
                    while (error = callback(currentSum)) {
                        bubble.innerHTML += error.message;
                    }
                }
            }
            xhr.send(null);
            return null;
        }
    }
}

window.onload = function() {
    // var xhr = new XMLHttpRequest();
    // var btns = getBtns();
    // var btns = $$('.button');
    // var bubble = $$('#sum');
    // var atplus = $$('atplus');
    // var api = $$('api');

    $$('#api').addEventListener('mouseout', function(event) { // reset all
        var that = event.relatedTarget ? event.relatedTarget : event.toElement;
        var btns = $$('.button');
        var bubble = $$('#sum');
        while (that && that != this) {
            that = that.parentNode;
        }
        if (that != this) {
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

    $$('#sum').addEventListener('click', function(event) { // calculate the sum
        var that = event.target;
        var btns = $$('.button');
        if (that.classList.contains('enable')) {
            var sum = 0;
            for (var i = btns.length - 1; i >= 0; i--) {
                sum += Number(btns[i].children[0].innerHTML);
            }
            that.innerHTML += ("楼主异步调用战斗力感人，目测不超过" + sum);
        }
    });

    $$('.button')[0].addEventListener("click", aHandler);
    $$('.button')[1].addEventListener("click", bHandler);
    $$('.button')[2].addEventListener("click", cHandler);
    $$('.button')[3].addEventListener("click", dHandler);
    $$('.button')[4].addEventListener("click", eHandler);

    api.addEventListener("click", function() {
        if (this.classList.contains("enable")) {
            var bubble = $$('#sum');
            var btns = $$('.button');
            var funList = [aHandler, bHandler, cHandler, dHandler, eHandler];
            var orderList = [0, 1, 2, 3, 4];
            var orderDict = {
                '0': 'A',
                '1': 'B',
                '2': 'C',
                '3': 'D',
                '4': 'E',
            }
            shuffle(orderList);
            disable(this);
            var text = "";
            for (var key in orderList) {
                text += orderDict[orderList[key]];
            }
            bubble.innerHTML += (text + "<br />");
            var error = null;
            while (error = funList[orderList[0]].call(btns[orderList[0]], null, 0, function(currentSum) {
                    return funList[orderList[1]].call(btns[orderList[1]], null, currentSum, function(currentSum) {
                        return funList[orderList[2]].call(btns[orderList[2]], null, currentSum, function(currentSum) {
                            return funList[orderList[3]].call(btns[orderList[3]], null, currentSum, function(currentSum) {
                                return funList[orderList[4]].call(btns[orderList[4]], null, currentSum, function(currentSum) {
                                    bubble.innerHTML += ("楼主异步调用战斗力感人，目测不超过" + currentSum);
                                    return null;
                                })
                            })
                        })
                    })
                })) {
                bubble.innerHTML += error.message;
            }
        }
    });
};
