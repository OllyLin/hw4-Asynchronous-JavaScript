window.onload = function() {
    var xmlhttp;
    function loadXMLDoc(url, callbackFunc) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = callbackFunc;
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    var list = [];
    var oldList = document.querySelectorAll("li");
    var counter = 0;
    for (var i = 0; i < oldList.length; i++)
        list[i] = oldList[i];

    var getNum = function() {
        var that = list[counter];

        for (var j = 0; j < list.length; j++) {
            if (list[j] != that && list[j].className.search("able") < 0)
                list[j].classList.add("disable");
        }

        if (this.className.search("disable") < 0) {
            this.firstChild.classList.add("display");
            this.classList.add("able");
            loadXMLDoc("http://localhost:3000", function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    counter++;
                    that.firstChild.innerHTML = xmlhttp.responseText;
                    for (var k = 0; k < list.length; k++)
                        list[k].classList.remove("disable");
                    if (counter < 5)
                    	list[counter].click();
                }

                if (counter == 5) {
                	var temp = 0;
	                for ( var m = 0; m < list.length; m++)
	                	temp += +list[m].firstChild.innerHTML;
	                document.getElementById("result").innerHTML = +temp;
                }
            })
        }
    };

    document.getElementById("button").onmouseout = function(e) {
        var target = e.relatedTarget;
        while(target && target != this)
            target = target.parentNode;
        if (target != this) {
            for (var i = 0; i < list.length; i++) {
                list[i].classList.remove("disable", "able");
                list[i].firstChild.innerHTML = "...";
                list[i].firstChild.className = "number";
            }
            counter = 0;
            document.getElementById("result").innerHTML = "";
            document.getElementById("order").innerHTML = "";
        }
     }
     for (var i = 0; i < list.length; i++) {
     	list[i].addEventListener('click', getNum);
     }

     document.getElementsByClassName("apb")[0].addEventListener("click", function() {
       for (var i = 0; i < list.length; i++) {
            list[i].classList.remove("disable", "able");
            list[i].firstChild.innerHTML = "...";
            list[i].firstChild.className = "number";
        }
        counter = 0;
        document.getElementById("result").innerHTML = "";
        list.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
        var str = "";
        for (var i = 0; i < list.length; i++)
            str += list[i].lastChild.innerHTML;
        document.getElementById("order").innerHTML = str;
     	list[0].click();
     });
}
