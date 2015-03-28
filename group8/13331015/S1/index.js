window.onload = function() {    
    var button = getButton();
    var container = document.getElementById("at-plus-container");
    container.addEventListener('mouseout', reset, true);
    for (var i = 0 ; i < button.length ; i++) {
        button[i].addEventListener("click", getRandomNum);
    }
    var sum_block = document.getElementById("info-bar");
    sum_block.addEventListener('click', calculateSum);
}
function getButton() {  
    return document.getElementsByTagName("li");
}
function reset() {  
    if (this.offsetWidth == 0) {
        var button = getButton();
        for (var i = 0 ; i < button.length ; i++) {
            removeClass(button[i], "button-disabled");
            button[i].firstChild.style.display = "none";
            button[i].firstChild.innerText = "...";
        }
        document.getElementById("sum").innerText = "";
    }
}
function getRandomNum() {   
    if (!hasClass(this, "button-disabled") && hasNoNum(this)) {
        var that = this;
        that.firstChild.style.display = "block";
        disable();
        removeClass(that, "button-disabled");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("get", "/");
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                that.firstChild.innerText = xmlHttp.responseText;
                enable();
            }
        };
        xmlHttp.send(null);
        toAbort(xmlHttp);
    }
}
function disable() {    
    var button = getButton();
    for (var i = 0 ; i < button.length ; i++) { 
        if (hasNoNum(button[i])) {
            addClass(button[i], "button-disabled");
        }
    }
}
function enable() { 
    var button = getButton();
    for (var i = 0 ; i < button.length ; i++) { 
        if (hasNoNum(button[i])) {
            removeClass(button[i], "button-disabled");
        } else {    
            addClass(button[i], "button-disabled");
        }
    }
}
function hasNoNum(button) { 
    var num = button.firstChild.innerText;
    return isNaN(num);
}
function addClass(dom, target_class) {    
    if (!hasClass(dom)) {
        dom.className = dom.className + " " + target_class;
    }
}
function removeClass(dom, target_class) {   
    dom.className = dom.className.replace(new RegExp(target_class, "g"), "");
}
function hasClass(dom, target_class) {  
    var name = dom.className;
    return name.indexOf(target_class) >= 0;
}
function calculateSum() {   
    var button = getButton();
    var all_has_num = true;
    for (var i = 0 ; i < button.length ; i++) { 
        if (hasNoNum(button[i])) {  
            all_has_num = false;
        }
    }

    if (all_has_num) {  
        var sum = 0;
        for (var i = 0 ; i < button.length ; i++) { 
            sum += parseInt(button[i].firstChild.innerText);
        }
        document.getElementById("sum").innerText = sum;
    }
}
function toAbort(xmlHttp) { 
    var container = document.getElementById("at-plus-container");
    container.addEventListener('mouseout', function() { 
        if (this.offsetWidth == 0) {    
            xmlHttp.abort();
        }
    });
}

