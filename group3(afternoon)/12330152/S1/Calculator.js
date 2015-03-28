(function() {
    var Button = function(button, cb) {
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

        // init
        var num = button.getElementsByClassName('num')[0];
        button.onclick = get;
    }

    var Displayer = function(displayer) {
        var show = function() {
            text.innerHTML = res;
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

        // enable the displayer if the 5 msgs have arrived
        var add = function(num) {
            if (++count == 5) {
                displayer.enable();
            }
            displayer.add(num);
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
        // attach handlers
        calculator.onmouseover = mouseover;
        calculator.onmouseout = mouseout;
        reset();
    }

    window.Calculator = Calculator;
}());
