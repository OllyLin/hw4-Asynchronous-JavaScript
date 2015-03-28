(function() {
    var Button = function(button, _cb) {
        var get = function() {
            var req = new XMLHttpRequest();
            req.open('get', '/&random=' + Math.random());
            req.onload = function() {
                res = parseInt(this.responseText);
                num.innerHTML = res;
                num.style.opacity = 1;
                cb(res);
            }
            req.send();
            button.setAttribute('disabled', '');
        }

        this.reset = function() {
            button.removeAttribute('disabled');
            num.style.opacity = 0;
        }

        this.addCallback = function(_cb) {
            var tmp = cb;
            cb = function(res) {
                tmp(res);
                _cb();
            }
        }

        this.click = function() {
            button.onclick();
        }

        this.id = button.childNodes[0].nodeValue;

        // init
        var num = button.getElementsByClassName('num')[0];
        var cb = _cb;
        button.onclick = get;
    }

    var Displayer = function(displayer) {
        var show = function() {
            text.innerHTML = res;
            text.style.opacity = 1;
        }

        this.showText = function(str) {
            text.innerHTML = str;
            text.style.opacity = 1;
        }

        this.add = function(num) {
            res += num;
        }

        this.enable = function() {
            displayer.removeAttribute('disabled');
        }

        this.reset = function() {
            res = 0;
            text.innerHTML = '';
            text.style.opacity = 0;
            displayer.setAttribute('disabled', 'true');
        }

        this.click = function() {
            displayer.onclick();
        }

        // init
        var text = document.getElementById('text');
        var res;
        displayer.onclick = show;
    }
    
    var Calculator = function() {
        // check if the element is in the #calculator
        var inOrigin = function(element) {
            if (element == null) {
                return false;
            }
            if (element.id == 'calculator') {
                return true;
            }
            return inOrigin(element.parentNode);
        }
        
        // open the calculator(expanding the region)
        var mouseover = function() {
            calculator.setAttribute('hover', '');
            region.setAttribute('open', '');
        }
        
        var mouseout = function(evt) {
            // check if the mouse left the whole region
            var target = evt.relatedTarget;
            if (inOrigin(target)) {
                return;
            }
            reset();
        }

        // reset the calculator(shrinking the region)
        var reset = function() {
            count = 0;
            calculator.removeAttribute('hover');
            region.removeAttribute('open');
            // reset the buttons and the displayer
            buttons.forEach(function(button) {
                button.reset();
            });
            displayer.reset();
        }

        var add = function(num) {
            // enable the displayer if the 5 msgs have arrived
            if (++count == 5) {
                displayer.enable();
            }
            displayer.add(num);
        }

        // get random order
        var shuffle = function(n) {
            for (var i = 0; i < n; i++) {
                var l = parseInt(Math.random() * 5);
                var r = parseInt(Math.random() * 5);
                var tmp = buttons[l];
                buttons[l] = buttons[r];
                buttons[r] = tmp;
            }
            var str = '';
            buttons.forEach(function(button) {
                var id = button.id;
                str += id;
            });
            displayer.showText(str);
        }

        var clickNext = function() {
            var button = buttons[count];
            if (typeof button == 'undefined') {
                displayer.click();
            } else {
                button.addCallback(clickNext);
                button.click();
            }
        }

        var autoClick = function() {
            shuffle(10);
            clickNext();
        }

        var count;
        // init
        var region = document.getElementById('region');
        // init the buttons
        var _buttons = calculator.getElementsByClassName('button');
        var buttons = [];
        for (var i = 0; i < _buttons.length; i++) {
            buttons.push(new Button(_buttons[i], add));
        }
        // init the displayer
        var _displayer = document.getElementById('displayer');
        var displayer = new Displayer(_displayer);
        var atPlusButton = document.getElementById('at-plus-button');
        atPlusButton.onclick = autoClick;
        // attach handlers
        calculator.onmouseover = mouseover;
        calculator.onmouseout = mouseout;
        reset();
    }

    window.Calculator = Calculator;
}());
