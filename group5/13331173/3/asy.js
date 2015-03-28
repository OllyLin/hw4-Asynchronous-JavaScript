window.onload = function() {
    xmlhttp = [new XMLHttpRequest(), new XMLHttpRequest(), new XMLHttpRequest(), new XMLHttpRequest(), new XMLHttpRequest()]
    count = 0; // number of get number
    number = document.getElementById("control-ring").getElementsByTagName("li");
    span_of_number = document.getElementById("control-ring").getElementsByTagName("span");
    for (var i = 0; i < number.length; i++) {
        number[i].onclick = number_click(i);
    };
    document.getElementById('button').addEventListener('mouseout', out);

    document.getElementById('apb').addEventListener('click', function() {
        for (var i = 0; i < 5; i++) {
            number[i].click();
        };
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
            number[i].onclick = number_click(i);
            span_of_number[i].innerHTML = "";
            span_of_number[i].style.opacity = 0;
            xmlhttp[i].abort();
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
        number[i].className += " cannot_inactive";
        get_random_number(Span, i);
    }
}

function get_random_number(Span, i) {
    xmlhttp[i].onreadystatechange = function() {
        if (xmlhttp[i].readyState == 4 && xmlhttp[i].status == 200) {
            count++;
            Span.innerHTML = xmlhttp[i].responseText;
            number[i].onclick = empty();
            if (count == 5) {
                document.getElementById('info-bar').addEventListener('click', calculate());
                document.getElementById('info-bar').click();
            };

        }
    }
    xmlhttp[i].open("GET", "http://localhost:3000/?t=" + Math.random(), true); // 缓存？
    xmlhttp[i].send();
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