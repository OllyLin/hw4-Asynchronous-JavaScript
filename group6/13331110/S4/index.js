function Async() {
    var lis = document.getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++) {
        lis[i].onclick = function(e) {
            var target = e.srcElement ? e.srcElement : e.target;
            if (target.id == "letter") {
                target = target.parentNode;
            }
            if (target.style.backgroundColor == "gray") {
                return;
            }
            if (target.getElementsByTagName("span").length > 1) {
                return;
            }
            var num = document.createElement('span');
            num.classList.add("unread");
            num.innerHTML = "...";
            target.appendChild(num);
            disable(target);

            var xmlhttp = new XMLHttpRequest();         //AJAX
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    num.innerHTML = xmlhttp.responseText;
                    target.id = "got";
                    enable(lis);
                }
            }
            xmlhttp.open("GET", "/key=" + target.title, true);
            xmlhttp.send();
        }
    }
    ifComplete();
    return;
}

function ifComplete() {
    var check = setInterval(function() {
        var liss = document.getElementsByTagName('li');
        for (var i = 0; i < liss.length; i++) {
            if (liss[i].id == "ngot") {
                return;
                }
        }
        document.getElementById("info-bar").style.backgroundColor = "#000099";
        infoBarAction();
    }, 1);
}

function disable(except) {
    var lis = document.getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++) {
        if (lis[i].className[0] == except.className[0]) {
            continue;
        }
        lis[i].style.backgroundColor = 'gray';
    }
}

function enable(lis) {
    for (var i = 0; i < lis.length; i++) {
        if (lis[i].id == "ngot") {
            lis[i].style.backgroundColor = "#000099";
        } else {
            lis[i].style.backgroundColor = "gray";
        }
    }
}

function infoBarAction() {
    var infoBar = document.getElementById("info-bar");
    infoBar.onclick = function() {
        if (infoBar.style.backgroundColor == "gray") {
            return;
        }
        var sum = 0;
        var lisss = document.getElementsByTagName("li");
        for (var i = 0; i < lisss.length; i++) {
            var spans = lisss[i].getElementsByTagName("span");
            sum += Number(spans[1].innerHTML);
        }
        document.getElementById("total").innerHTML = sum;
        infoBar.style.backgroundColor = "gray";
    }
}

function mouseOut() {
    var at = document.getElementById("at-plus-container");
    at.onmouseleave = function() {
        document.getElementById("info-bar").style.backgroundColor = "gray";
        document.getElementById("total").innerHTML = "";
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
            lis[i].id = "ngot";
            lis[i].style.backgroundColor = "#000099";
            var spans = lis[i].getElementsByTagName("span");
            if (spans.length == 2) {
                lis[i].removeChild(spans[1]);
            }
        }
        var order = document.getElementById("order");
        document.getElementById("info-bar").removeChild(order);
    }
}

function clickAt() {
    var lis = document.getElementsByTagName('li');
    document.getElementById("icon").onclick = function() {
        var order = new Array();
        for (var i = 0; i < 100; i++) {
            var num = Math.floor((Math.random()*5)+1);
            if (order.indexOf(num) == "-1") {
                order.push(num);
            }
        }
        //alert(order);
        var str = "";
        for (var j = 0; j < 5; j++) {
            if (order[j] == "1") {
                str += "A";
            } else if (order[j] == "2") {
                str += "B";
            } else if (order[j] == "3") {
                str += "C";
            } else if (order[j] == "4") {
                str += "D";
            } else if (order[j] == "5") {
                str += "E";
            }
        }

        var ord = document.createElement("span");
        ord.id = "order";
        ord.style.position = "absolute";
        ord.style.left = "1em";
        ord.style.top = "0.2em";
        ord.style.color = "#00CC99";
        ord.style.fontSize = "30px";
        ord.innerHTML = str;
        document.getElementById("info-bar").appendChild(ord);

        var t = 0;
        clickButton(t, order);
    }
}

function clickButton(t, order) {
    if (t >= 5) {
        return;
    }
    var or = order[t] - 1;
    var lis = document.getElementsByTagName("li");
    lis[or].click();
    setInterval(function() {
        if (lis[or].id == "got") {
            t++;
            clickButton(t, order);
        }
        document.getElementById("info-bar").click();
    }, 1);
}

window.onload = function() {
    mouseOut();
    Async();
    clickAt();
}