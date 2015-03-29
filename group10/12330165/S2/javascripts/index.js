/**
 * Created by Kira on 3/28/15.
 */

window.onload = function() {
    var list = document.getElementById("control-ring").getElementsByTagName("li");

    list[0].innerHTML = "<span>A</span>";
    list[1].innerHTML = "<span>B</span>";
    list[2].innerHTML = "<span>C</span>";
    list[3].innerHTML = "<span>D</span>";
    list[4].innerHTML = "<span>E</span>";

    var result = 0;

    var cal = function() {
        this.getElementsByTagName("span")[0].innerHTML = result;
        this.style.backgroundColor = "rgba(0,0,10,.4)";
    }

    var check = function() {
        var config = false;
        for (var i = 0 ; i < list.length; i++) {
            if (list[i].onclick != null) {
                list[i].style.backgroundColor = "blue";
                config = true;
            }
        }
        if (!config) {
            document.getElementById("info-bar").onclick = cal;
            document.getElementById("info-bar").style.backgroundColor = "blue";
        }
    }

    var getNumber = function() {
        var that = this;
        if (this.disabled == true) return;
        else {
            for (var i = 0; i < list.length; i++) {
                if (list[i] == that) continue;
                else {
                    list[i].style.backgroundColor = "rgba(0,0,10,.4)";
                }
            }
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function()
            {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                    result += parseInt(xmlhttp.responseText);
                    var ih = "<span class='unread'>" + xmlhttp.responseText + "</span>"
                    that.innerHTML = that.innerHTML + ih;
                    that.style.backgroundColor = "rgba(0,0,10,.4)";
                    that.onclick = null;
                    check();
                }
            }
            xmlhttp.open("GET","/",true);
            xmlhttp.send();
        }
    }

    for (var i = 0; i < list.length; i++) {
        list[i].style.backgroundColor = "blue";
        list[i].onclick = getNumber;
    }

    var check2 = function() {
        var config = false;
        for (var i = 0 ; i < list.length; i++) {
            if (list[i].onclick != null) {
                list[i].style.backgroundColor = "blue";
                config = true;
            }
        }
        if (!config) {
            document.getElementById("info-bar").style.backgroundColor = "blue";
            document.getElementById("info-bar").getElementsByTagName("span")[0].innerHTML = result;
            document.getElementById("info-bar").style.backgroundColor = "rgba(0,0,10,.4)";
        }
    }

    var getNumber2 = function(obj) {
        if (obj == null) return;
        var that = obj;
        if (this.disabled == true) return;
        else {
            for (var i = 0; i < list.length; i++) {
                if (list[i] == that) continue;
                else {
                    list[i].style.backgroundColor = "rgba(0,0,10,.4)";
                }
            }
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function()
            {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                    result += parseInt(xmlhttp.responseText);
                    var ih = "<span class='unread'>" + xmlhttp.responseText + "</span>"
                    that.innerHTML = that.innerHTML + ih;
                    that.style.backgroundColor = "rgba(0,0,10,.4)";
                    that.onclick = null;
                    check2();
                    getNumber2(obj.nextElementSibling);
                }
            }
            xmlhttp.open("GET","/",true);
            xmlhttp.send();
        }
    }

    document.getElementById("at-plus-container").onmouseleave = function() {

        list[0].innerHTML = "<span>A</span>";
        list[1].innerHTML = "<span>B</span>";
        list[2].innerHTML = "<span>C</span>";
        list[3].innerHTML = "<span>D</span>";
        list[4].innerHTML = "<span>E</span>";

        for (var i = 0; i < list.length; i++) {
            list[i].style.backgroundColor = "blue";
            list[i].onclick = getNumber;
        }

        document.getElementById("info-bar").getElementsByTagName("span")[0].innerHTML = "";
        document.getElementById("info-bar").style.backgroundColor = "rgba(0,0,10,.4)";
        document.getElementById("info-bar").onclick = null;

        result = 0;

    }

    document.getElementsByClassName("apb")[0].onclick = function() {
        getNumber2(list[0]);
    }

}