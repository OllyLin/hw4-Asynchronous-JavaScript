
window.onload = function() {
    var test = document.getElementsByTagName("li");
    var bottompositioner = document.getElementById("bottom-positioner");
    var info = document.getElementById("info-bar");
    info.addEventListener("click", sumup);
    bottompositioner.addEventListener("mouseleave", reset);
    for (var i = 0; i < test.length; i++)
        test[i].addEventListener("click", loadXMLDoc);
    
}

var xmlhttp;
function loadXMLDoc(url) {
    var button = this;
    if (check_waiting(button) || hasClass(button.getElementsByTagName("span")[0], "unread"))
        return;
    addredcircle(button);
    disable_other(button);
    xmlhttp = null;
    if (window.XMLHttpRequest) {// code for IE7, Firefox, Opera, etc.
        xmlhttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp != null) {
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState==4) {// 4 = "loaded"
        if (xmlhttp.status==200) {// 200 = "OK"              
              button.getElementsByTagName("span")[0].innerHTML=xmlhttp.responseText;
              button.style.backgroundColor = "rgb(126, 126, 126)";
              button.style.color = "rgb(255,255,255)";
              enable_other(button);            
        }
        else {
            alert("Problem retrieving XML data:" + xmlhttp.statusText);
        }
    }
    };
    xmlhttp.open("GET",url,true);
    xmlhttp.send(null);
    }
    else {
      alert("Your browser does not support XMLHTTP.");
    }
}

function addredcircle(button) {
    button.getElementsByTagName("span")[0].style.visibility = "visible";
    button.getElementsByTagName("span")[0].innerHTML = "...";
    button.getElementsByTagName("span")[0].classList.add("unread");
}

function disable_other(button) {
    var buttons = document.getElementsByTagName("li");
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i] != button)
            buttons[i].style.backgroundColor = "rgb(126, 126, 126)";
            buttons[i].style.color = "rgb(255,255,255)";
    }
}

function enable_other(button) {
  var buttons = document.getElementsByTagName("li");
    for (var i = 0; i < buttons.length; i++) {
        if (!hasClass(buttons[i].getElementsByTagName("span")[0], "unread")) {
            buttons[i].style.backgroundColor = "rgb(29, 74, 159)";
            buttons[i].style.color = "rgb(30,146,127)";
        }
    }
}

function hasClass(ele,cls) { 
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')); 
} 

function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ');  
    }  
}  

function check_waiting(button) {
    var buttons = document.getElementsByTagName("li");
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i] != button && buttons[i].getElementsByTagName("span")[0].innerHTML === "...") {
                return true;
            }
        }
        return false;
}

function reset() {
    var buttons = document.getElementsByTagName("li");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].getElementsByTagName("span")[0].innerHTML = "";
        removeClass(buttons[i].getElementsByTagName("span")[0], "unread");
        buttons[i].style.backgroundColor = "rgb(29, 74, 159)";
        buttons[i].style.color = "rgb(30,146,127)";
        buttons[i].getElementsByTagName("span")[0].style.visibility = "hidden";
    }
    document.getElementsByClassName("info")[0].innerHTML = "";
}

function sumup() {
    var buttons = document.getElementsByTagName("li");
    for (var i = 0; i < buttons.length; i++) {
        if (!hasClass(buttons[i].getElementsByTagName("span")[0], "unread") || buttons[i].getElementsByTagName("span")[0].innerHTML === "...") {
            return;
        }
    }
    var sum = 0;
    for (var i = 0; i < buttons.length; i++) {
        sum += parseInt(buttons[i].getElementsByTagName("span")[0].innerHTML);
    }
    this.getElementsByClassName("info")[0].innerHTML = sum;
}