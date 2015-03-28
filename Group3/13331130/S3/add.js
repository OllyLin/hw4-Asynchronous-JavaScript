window.onload = function() {
    var list = document.querySelectorAll("li");
    var counter = 0;

    for (var i = 0; i < list.length; i++) {
        list[i].onclick = function(ele) {
            var that = this;
            return function() {
            if (this.className.search("disable") < 0) {
                this.firstChild.classList.add("display");
                this.classList.add("able");
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", "/" + Math.random(), true);
                xmlhttp.onreadystatechange =  function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        counter++;
                        ele.firstChild.innerHTML = xmlhttp.responseText;
                        for (var k = 0; k < list.length; k++)
                            list[k].classList.remove("disable");
                    }

                    if (counter == 5) {
                        document.getElementById("big").classList.add("blue");
                        var temp = 0;
                        for ( var m = 0; m < list.length; m++)
                            temp += +list[m].firstChild.innerHTML;
                        document.getElementById("result").innerHTML = +temp;
                        document.getElementById("big").classList.remove("blue");  
                    }
                }
                xmlhttp.send();
            }
        }
        }(list[i]);
    }

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
            document.getElementById("big").classList.remove("blue");
        }
     }

     document.getElementsByClassName("apb")[0].addEventListener("click", function() {
     	list[0].click();
     	list[1].click();
     	list[2].click();
     	list[3].click();
     	list[4].click();
     });
}
