(function() {
    var Button = (function() {
        var Button = function(_button, _cb) {
            this.reset = function() {
                button.removeAttribute('disabled');
                num.style.opacity = 0;
            }
    
            // for robot
            this.click = function(_cb) {
                click(_cb);
            }

            var click = function(_cb) {
                get(_cb);
                button.setAttribute('disabled', '');
            }
    
            // get data from the server
            var get = function(_cb) {
                var req = new XMLHttpRequest();
                req.open('get', '/&random=' + Math.random());
                req.onload = function() {
                    res = parseInt(this.responseText);
                    num.innerHTML = res;
                    num.style.opacity = 1;
                    cb(res);
                    // another callback (for robot)
                    if (_cb) {
                        _cb();
                    }
                }
                req.send();
            }

            this.id = _button.childNodes[0].nodeValue;

            var button = _button;
            var cb = _cb;
            var num = button.getElementsByClassName('num')[0];
            button.onclick = function() {
                click();
            }
        }

        return Button;
    }());

    var Displayer = (function() {
        var instance = null;

        var constructor = function(displayer) {
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
    
            // for robot
            this.click = function() {
                displayer.onclick();
            }

            var show = function() {
                text.innerHTML = res;
                text.style.opacity = 1;
            }

            var text = document.getElementById('text');
            var res;
            displayer.onclick = show;
        }

        var Displayer = function(displayer) {
            if (instance === null) {
                instance = new constructor(displayer);
            }
            return instance;
        }

        return Displayer;
    }());

    var Calculator = (function() {
        var instance = null;

        var constructor = function() {
            // check if the element is in the #calculator
            var inOrigin = function(element) {
                if (element === null) {
                    return false;
                }
                if (element.id === 'calculator') {
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
                if (++count === 5) {
                    displayer.enable();
                }
                displayer.add(num);
            }
    
            // get random order
            var shuffle = function(n) {
                for (var i = 0; i < n; i++) {
                    // swap randomly
                    var l = parseInt(Math.random() * 5);
                    var r = parseInt(Math.random() * 5);
                    var tmp = buttons[l];
                    buttons[l] = buttons[r];
                    buttons[r] = tmp;
                }
                // show the order
                var str = '';
                buttons.forEach(function(button) {
                    var id = button.id;
                    str += id;
                });
                displayer.showText(str);
            }
    
            var clickNext = function() {
                var button = buttons[count];
                if (typeof button === 'undefined') {
                    displayer.click();
                } else {
                    button.click(clickNext);
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
            var displayer = Displayer(_displayer);
            var atPlusButton = document.getElementById('at-plus-button');
            atPlusButton.onclick = autoClick;
            // attach handlers
            calculator.onmouseover = mouseover;
            calculator.onmouseout = mouseout;
            reset();
        }

        var Calculator = function() {
            if (instance === null) {
                instance = new constructor();
            }
            return instance;
        }

        return Calculator;
    }());

    window.Calculator = Calculator;
}());
