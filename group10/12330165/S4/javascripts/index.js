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
        this.getElementsByTagName("span")[1].innerHTML = result;
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
            document.getElementById("info-bar").getElementsByTagName("span")[1].innerHTML = result;
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
        document.getElementById("info-bar").getElementsByTagName("span")[1].innerHTML = "";
        document.getElementById("info-bar").style.backgroundColor = "rgba(0,0,10,.4)";
        document.getElementById("info-bar").onclick = null;

        result = 0;

    }

    function randArray(data){
        //获取数组长度
        var arrlen = data.length;
        //创建数组 存放下标数
        var try1 = new Array();
        for(var i = 0;i < arrlen; i++){
            try1[i] = i;
        }
        //创建数组 生成随机下标数
        var try2 = new Array();
        for(var i = 0;i < arrlen; i++){
            try2[i] = try1.splice(Math.floor(Math.random() * try1.length),1);
        }
        //创建数组，生成对应随机下标数的数组
        var try3 = new Array();
        for(var i = 0; i < arrlen; i++){
            try3[i] = data[try2[i]];
        }
        return try3;
    }

    document.getElementsByClassName("apb")[0].onclick = function() {
        var arr = [0, 1, 2, 3, 4];
        arr = randArray(arr);
        var str = new Array();
        for (var j = 0; j < arr.length; j++) {
            if (arr[j] == 0) {
                str.push("A");
                continue;
            }
            if (arr[j] == 1) {
                str.push("B");
                continue;
            }
            if (arr[j] == 2) {
                str.push("C");
                continue;
            }
            if (arr[j] == 3) {
                str.push("D");
                continue;
            }
            if (arr[j] == 4) {
                str.push("E");
                continue;
            }
        }
        document.getElementById("info-bar").getElementsByTagName("span")[0].innerHTML = str;
        for (var i = 0; i < arr.length; i++) {
            getNumber2(list[arr[i]]);
        }
    }

}