var getNumberFromServer = function (callBackFunc) {
    var xmlHttpReg = null;
    xmlHttpReg = new XMLHttpRequest();
    if (xmlHttpReg != null) {
        xmlHttpReg.open("get", "/", true);
        xmlHttpReg.send(null);
        xmlHttpReg.onreadystatechange = function () {
            if (xmlHttpReg.readyState == 4)
                callBackFunc(xmlHttpReg.responseText);
        }
    }
};

var buttonClick = function (liList, indexClicked) {
    if (liList[indexClicked].classList.contains('enable')) {
        var liClicked = liList[indexClicked];
        var spanClicked = liClicked.getElementsByTagName('span')[0];
        spanClicked.innerHTML = '...';
        spanClicked.classList.remove('nodisplay');
        for (var i = liList.length - 1; i >= 0; --i)
            if (i != indexClicked) {
                liList[i].classList.remove('enable');
                liList[i].classList.add('disable');
            }
        getNumberFromServer(function (liList, spanClicked) {
            return function (number) {
                spanClicked.innerHTML = number;
                var numberGot = 0;
                for (var i = liList.length - 1; i >= 0; --i)
                    if (liList[i].getElementsByTagName('span')[0].classList.contains('nodisplay')) {
                        liList[i].classList.remove('disable');
                        liList[i].classList.add('enable');
                    } else {
                        liList[i].classList.remove('enable');
                        liList[i].classList.add('disable');
                        ++numberGot;
                    }
                if (numberGot == 5) {
                    var infoBar = document.getElementById('info-bar');
                    infoBar.classList.remove('disable');
                    infoBar.classList.add('enable');
                }
            }
        }(liList, spanClicked));
    }
};

var infoBarClick = function (liList, infoBar) {
    if (infoBar.classList.contains('enable')) {
        var hasValue = 0, sum = 0;
        for (var i = liList.length - 1; i >= 0; --i)
            if (liList[i].classList.contains('disable')) {
                var value = liList[i].getElementsByTagName('span')[0].innerHTML;
                if (value != '') {
                    ++hasValue;
                    sum += Number(value);
                }
            }
        if (hasValue == 5) {
            document.getElementById('result').innerHTML = sum.toString();
            infoBar.classList.remove('enable');
            infoBar.classList.add('disable');
        }
    }
};

var clear = function (liList, infoBar) {
    for (var i = liList.length - 1; i >= 0; --i) {
        liList[i].classList.remove('disable');
        liList[i].classList.add('enable');
        liList[i].getElementsByTagName('span')[0].classList.add('nodisplay');
    }
    infoBar.classList.remove('enable');
    infoBar.classList.add('disable');
    document.getElementById('result').innerHTML = '';
};

var main = function () {
    var liList = document.getElementsByTagName('li');
    for (var i = liList.length - 1; i >= 0; --i)
        liList[i].onclick = function (i) {
            return function () {
                buttonClick(liList, i);
            }
        }(i);
    var infoBar = document.getElementById('info-bar');
    infoBar.onclick = function () {
        infoBarClick(liList, infoBar);
    };
    document.getElementById('bottom-positioner').onmouseleave = function () {
        clear(liList, infoBar);
    };
    clear(liList, infoBar);
}

window.onload = function () {
    main();
};