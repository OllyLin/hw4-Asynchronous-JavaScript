window.onload = function() {

    var request = new XMLHttpRequest();
    var buttons_ = getButtons();
    var sum = document.getElementById('info-bar');
    var atplus = document.getElementById('button');
    var all = document.getElementById('apb');

    //当鼠标离开a+时，重置
    atplus.addEventListener('mouseout', function(e) {
        if (!e) {
            e = window.event;
        }
        var target = e.relatedTarget ? e.relatedTarget : e.toElement;
        while (target && target != this) {
            target = target.parentNode;
        }
        if (target != this) {
            request.abort();
            for (var i = 0; i < buttons_.length; i++) {
                buttons_[i].children[0].classList.add('hide');
                buttons_[i].children[0].innerHTML = '...';
            }
            enable(buttons_);
            sum.children[0].innerHTML = '';
            sum.removeEventListener('click', getSum);
        }
    });


    for (var i = 0; i < buttons_.length; i++) {
        buttons_[i].addEventListener('click', function(i){
            return function() {
                var that = this;
                if (that.classList.contains('enable')) {
                    var not_click = [];
                    for (var j = 0; j < buttons_.length; j++) {
                        if (buttons_[j].id !== this.id && buttons_[j].classList.contains("enable")) {
                            not_click.push(buttons_[j]);
                        }
                    }
                    disable(not_click);
                    var num = this.children[0];
                    num.classList.remove('hide');
                    request.onreadystatechange = function() {
                        if (request.readyState === 4 && request.status === 200) {
                            num.innerHTML = request.responseText;
                            enable(not_click);
                            disable(that);
                            if (isAllGetNum()) {
                                sum.addEventListener('click', getSum);
                                sum.click();
                            } else {
                                buttons_[i+1].click();
                            }
                        }
                    }
                    request.open("GET", "/", true);
                    request.send();
                }
            }
        }(i));
    }
    
    all.addEventListener('click', function() {
        buttons_[0].click();
    })
};

var getButtons = function() {
    var result = [];
    result.push(document.getElementById('A'));
    result.push(document.getElementById('B'));
    result.push(document.getElementById('C'));
    result.push(document.getElementById('D'));
    result.push(document.getElementById('E'));
    return result;
};


var getSum = function() {
    var sum = 0;
    var buttons_ = getButtons()
    for (var i = 0; i < buttons_.length; i++) {
        sum += Number(buttons_[i].children[0].innerHTML);
    }
    this.children[0].innerHTML = sum;
};

var enable = function(obj) {
    if (obj instanceof Array) {
        for (var i = obj.length - 1; i >= 0; i--) {
            if (obj[i].children[0].innerHTML === '...') {
                obj[i].classList.toggle('disable', false);
                obj[i].classList.toggle('enable', true);
            }
        }
    } else {
        obj.classList.toggle('disable', false);
        obj.classList.toggle('enable', true);
    }
};

var disable = function(obj) {
    if (obj instanceof Array) {
        for (var i = obj.length - 1; i >= 0; i--) {
            obj[i].classList.toggle('enable', false);
            obj[i].classList.toggle("disable", true);
        }
    } else {
        obj.classList.toggle('enable', false);
        obj.classList.toggle("disable", true);
    }
};


var isAllGetNum = function() {
    var buttons_ = getButtons()
    return (buttons_[0].children[0].innerHTML !== '...'
        && buttons_[1].children[0].innerHTML !== '...'
        && buttons_[2].children[0].innerHTML !== '...'
        && buttons_[3].children[0].innerHTML !== '...'
        && buttons_[4].children[0].innerHTML !== '...');
};


