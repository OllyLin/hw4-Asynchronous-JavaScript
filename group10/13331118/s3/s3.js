// ****************************
// In file ../s3/index.js
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

window.onload = function() {
    var xhrs = [
        new XMLHttpRequest(),
        new XMLHttpRequest(),
        new XMLHttpRequest(),
        new XMLHttpRequest(),
        new XMLHttpRequest()
    ];
    var btns = getBtns();
    var bubble = document.getElementById('sum');
    var atplus = document.getElementById('atplus');
    var api = document.getElementById('api');
    // function clickBtn(btn, callback) {
    //     btn.click();
    //     if (callback) {
    //         callback();
    //     }
    // }

    atplus.addEventListener('mouseout', function(event) { // reset all
        var target = event.relatedTarget ? event.relatedTarget : event.toElement;
        while (target && target != this) {
            target = target.parentNode;
        }
        if (target != this) {
            for (var i = btns.length - 1; i >= 0; i--) {
                btns[i].children[0].classList.remove('show');
                btns[i].children[0].innerHTML = '...';
                xhrs[i].abort();
            }
            bubble.innerHTML = '';
            enable(btns);
            enable(bubble);
        }
    });

    bubble.addEventListener('click', function(event) { // calculate the sum
        var that = event.target;
        if (that.classList.contains('enable')) {
            var sum = 0;
            for (var i = btns.length - 1; i >= 0; i--) {
                sum += Number(btns[i].children[0].innerHTML);
            }
            this.innerHTML = sum;
        }
    });

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function(i) {
            var xhr = xhrs[i];
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
                    xhr.open("get", "/?random="+Math.random());
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            redBtn.innerHTML = xhr.responseText;
                            enable(other);
                            disable(that);
                            if (isAllGetNum(btns)) {
                                enable(bubble);
                                bubble.click();
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
        btns[0].click();
        enable(btns);
        btns[1].click();
        enable(btns);
        btns[2].click();
        enable(btns);
        btns[3].click();
        enable(btns);
        btns[4].click();
        enable(btns);
    })
};
