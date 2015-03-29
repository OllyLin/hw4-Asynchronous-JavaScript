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
    return;
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
    }
}

window.onload = function() {
    mouseOut();
    Async();
}