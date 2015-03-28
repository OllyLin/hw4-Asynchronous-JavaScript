window.onload = function() {
    count = 0; // number of get number
    number = document.getElementById("control-ring").getElementsByTagName("li");
    span_of_number = document.getElementById("control-ring").getElementsByTagName("span");
    for (var i = 0; i < number.length; i++) {
        number[i].onclick = number_click(i);
    };
    document.getElementById('info-bar').onclick = empty();
    document.getElementById('button').addEventListener('mouseout', out);
}

function out (event) {
    var target = event.relatedTarget ? event.relatedTarget : event.toElement;
    while (target && target != this) {
        target = target.parentNode;
    }
    if (target != this) {
        count = 0;
        for (var i = 0; i < number.length; i++) {
            number[i].className = number[i].className.replace(/ cannot_inactive/, "");
            number[i].onclick = number_click(i);
            span_of_number[i].innerHTML = "";
            span_of_number[i].style.opacity = 0;
        };
        document.getElementById('result').innerHTML = "";
        document.getElementById('info-bar').onclick = empty();
    }
}

function number_click(i) {
    return function() {
        var Span = this.getElementsByTagName("span")[0];
        Span.innerHTML = "...";
        Span.style.opacity = "1";
        for (var j = 0; j < 5; j++) {
            if (j != i && number[j].className.indexOf('cannot_inactive') < 0) {
                number[j].onclick = empty();
                number[j].className += " inactive";
            };
        };
        get_random_number(Span, i);
    }
}

function get_random_number(Span, i) {

    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            count++;
            Span.innerHTML = xmlhttp.responseText;
            number[i].onclick = empty();
            number[i].className += " cannot_inactive";
            for (var m = 0; m < 5; m++) {
                if (m != i && number[m].className.indexOf('cannot_inactive') < 0) {
                    number[m].onclick = number_click(m);
                    number[m].className = number[m].className.replace(/ inactive/, "");
                }
            };
            if (count == 5) {
                document.getElementById('info-bar').onclick = calculate();
            };
        }
    }
    xmlhttp.open("GET", "http://localhost:3000/", true);
    xmlhttp.send();
}

function empty() {
    return function() {

    }
}

function calculate() {
    return function() {
        var sum = 0;
        for (var i = 0; i < span_of_number.length; i++) {
            sum += parseInt(span_of_number[i].innerHTML);
        };
        document.getElementById('result').innerHTML = sum;
    }
}