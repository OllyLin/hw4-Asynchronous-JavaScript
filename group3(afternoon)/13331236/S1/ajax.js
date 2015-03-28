/*1331236 谭笑*/
function enable(button) {
    button.classList.remove("disabled");
    button.classList.add("enabled");
}

function disable(button) {
    button.classList.remove("enabled");
    button.classList.add("disabled");
}

function getHTTPObject() {
    if (typeof XMLHttpRequest == "undefined") {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        return new XMLHttpRequest();
    }
}

function getSum() {
    var buttons = document.getElementById("control-ring").getElementsByTagName("li");
    var sum = 0;
    for (var i = 0; i < buttons.length; i++) {
        var tmp = buttons[i].getElementsByTagName("span")[1].innerHTML;
        if (isNaN(Number(tmp))) {
            return NaN;
        } else {
            sum += Number(tmp);
        }
    }
    return sum;
}

var activeList = "";

window.onload = function() {
    var request = getHTTPObject();
    var buttons = document.getElementById("control-ring").getElementsByTagName("li");
    for (var i = 0; i < buttons.length; i++) {
        activeList[i] = buttons[i];
    }
    var bubble = document.getElementById("info-bar");
    var atPlusArea = document.getElementById("at-plus-container");
    var sum = NaN;

    for (var i = 0; i < buttons.length; i++) {
        (function(_i){
            buttons[_i].onclick = function() {
                var that = this;
                if (!that.classList.contains("enabled")) {
                    return;
                }
                var red = that.getElementsByTagName("span")[1];
                red.style.visibility = "visible";  // 显示红色圆圈
                for (var j = 0; j < buttons.length; j++) {
                    if (that != buttons[j]) {
                        disable(buttons[j]);
                    }
                }  // 将其他按钮灭活
                request.onreadystatechange = function() {
                    if (request.readyState == 4 && request.status == 200) {
                        red.innerHTML = request.responseText; // 显示随机数
                        disable(that); // 灭活自身
                        activeList += that.getAttribute("id");
                        console.log(activeList);
                        for (var j = 0; j < buttons.length; j++) {
                            if (that != buttons[j] && !activeList.match(buttons[j].getAttribute("id"))) {
                                enable(buttons[j]);
                            }
                        } // 激活其他
                        sum = getSum();  // 获得5个随机数的和
                        if (!isNaN(sum)) {
                            enable(bubble);
                        }
                    }
                }
                request.open("GET", "/", true);
                request.send();
            }
        }(i));
    }

    bubble.onclick = function() {
        if (activeList.length == 5) {
            var sumSpan = document.getElementById("sum");
            sumSpan.innerHTML = getSum();
            sumSpan.style.visibility = "visible";
            disable(bubble);
        }
    };

    atPlusArea.addEventListener('mouseout', function(event) {
        var target = event.relatedTarget ? event.relatedTarget : event.toElement;
        while (target && target != this) {
            target = target.parentNode;
        } // 判断是否真正mouseout
        if (target != this) {
            for (var i = 0; i < buttons.length; i++) {
                var red = buttons[i].getElementsByTagName("span")[1];
                red.style.visibility = "hidden";
                red.innerHTML = "...";
                enable(buttons[i]);
            }
            bubble.getElementsByTagName("span")[0].style.visibility = "hidden";
            sum = NaN;
            activeList = "";
        }
    });
}
