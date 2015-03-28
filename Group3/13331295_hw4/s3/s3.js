window.onload = function() {
    var request = [];
    var buttons_ = getButtons();
    var sum = document.getElementById('info-bar');
    var atplus = document.getElementById('button');
    var all = document.getElementById('apb');

    //when the mouse move out of the a+, reset the whole button
    atplus.addEventListener('mouseout', function(e) {
        if (!e) {
            e = window.event;
        }
        var target = e.relatedTarget ? e.relatedTarget : e.toElement;
        while (target && target != this) {
            target = target.parentNode;
        }
        if (target != this) {
            for (var i = 0; i < buttons_.length; i++) {
                request[i].abort();
                buttons_[i].children[0].classList.add('hide');
                buttons_[i].children[0].innerHTML = '...';
            }
            enable(buttons_);
            sum.children[0].innerHTML = '';
            sum.removeEventListener('click', getSum);
        }
    });


    for (var i = 0; i < buttons_.length; i++) {
        request[i] = new XMLHttpRequest();
        buttons_[i].addEventListener('click', function(i){
            return function() {
                var that = buttons_[i];
                if (that.classList.contains('enable')) {
                    var not_click = [];
                    for (var j = 0; j < buttons_.length; j++) {
                        if (buttons_[j].id !== that.id && buttons_[j].classList.contains("enable")) {
                            not_click.push(buttons_[j]);
                        }
                    }
                    var num = that.children[0];
                    num.classList.remove('hide');
                    request[i].onreadystatechange = function() {
                        if (request[i].readyState === 4 && request[i].status === 200) {
                            num.innerHTML = request[i].responseText;
                            enable(not_click);
                            disable(that);
                            if (isAllGetNum()) {
                                sum.addEventListener('click', getSum);
                                sum.click();
                            }
                        }
                    }
                    request[i].open('GET', '/t=' + Math.random(), true);
                    request[i].send();
                }
            }
        }(i));
    }

    all.addEventListener('click', function() {
        buttons_[0].click();
        buttons_[1].click();
        buttons_[2].click();
        buttons_[3].click();
        buttons_[4].click();
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


