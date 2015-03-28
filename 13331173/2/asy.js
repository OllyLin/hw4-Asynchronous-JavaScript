window.onload = function() {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    };
    count = 0; // number of get number
    number = document.getElementById("control-ring").getElementsByTagName("li");
    span_of_number = document.getElementById("control-ring").getElementsByTagName("span");
    for (var i = 0; i < number.length; i++) {
        number[i].onclick = number_click(i);
    };
    document.getElementById('button').addEventListener('mouseout', out);

    document.getElementById('apb').addEventListener('click', function() {
        number[0].click();
    });

}


function out(event) {
    var target = event.relatedTarget ? event.relatedTarget : event.toElement;
    while (target && target != this) {
        target = target.parentNode;
    }
    if (target != this) {
        count = 0;
        for (var i = 0; i < number.length; i++) {
            number[i].className = number[i].className.replace(/ cannot_inactive/, "");
            number[i].className = number[i].className.replace(/ inactive/, "");
            number[i].onclick = number_click(i);
            span_of_number[i].innerHTML = "";
            span_of_number[i].style.opacity = 0;
            xmlhttp.abort();
            console.log("fdffd");
            //number[i].style.backgroundColor = "#303f !important";
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

            for (var n = 0; n < 5; n++) {
                if (number[n].className.indexOf('cannot_inactive') < 0) {
                    number[n].click();
                    break;
                };
            };
            if (count == 5) {
                document.getElementById('info-bar').addEventListener('click', calculate());
                document.getElementById('info-bar').click();
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