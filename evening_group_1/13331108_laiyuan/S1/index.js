window.onload = function() {
    var buttons = document.getElementById('control-ring').getElementsByTagName('li');
    var bigButton = document.getElementById('info-bar');
    buttons[0].addEventListener('click', aHandler);
    buttons[1].addEventListener('click', bHandler);
    buttons[2].addEventListener('click', cHandler);
    buttons[3].addEventListener('click', dHandler);
    buttons[4].addEventListener('click', eHandler);
    bigButton.setAttribute('disabled', 'true');
    bigButton.addEventListener('click', countResultAndReflectOnBigButton);
    addEventHandlerForAtplusButton();
};

var aHandler = function() {
    var button = document.getElementById('control-ring').getElementsByTagName('li')[0];
    if (button.getAttribute('disabled') === "true") return;
    button.getElementsByTagName('span')[1].style.opacity = '1';
    button.getElementsByTagName('span')[1].innerHTML = '...';
    var disabledId = disableButtonExcept(button);
    askForRandomNumberFromServer(button, disabledId);
};

var bHandler = function() {
    var button = document.getElementById('control-ring').getElementsByTagName('li')[1];
    if (button.getAttribute('disabled') === "true") return;
    button.getElementsByTagName('span')[1].style.opacity = '1';
    button.getElementsByTagName('span')[1].innerHTML = '...';
    var disabledId = disableButtonExcept(button);
    askForRandomNumberFromServer(button, disabledId);
};

var cHandler = function() {
    var button = document.getElementById('control-ring').getElementsByTagName('li')[2];
    if (button.getAttribute('disabled') === "true") return;
    button.getElementsByTagName('span')[1].style.opacity = '1';
    button.getElementsByTagName('span')[1].innerHTML = '...';
    var disabledId = disableButtonExcept(button);
    askForRandomNumberFromServer(button, disabledId);
};

var dHandler = function() {
    var button = document.getElementById('control-ring').getElementsByTagName('li')[3];
    if (button.getAttribute('disabled') === "true") return;
    button.getElementsByTagName('span')[1].style.opacity = '1';
    button.getElementsByTagName('span')[1].innerHTML = '...';
    var disabledId = disableButtonExcept(button);
    askForRandomNumberFromServer(button, disabledId);
};

var eHandler = function() {
    var button = document.getElementById('control-ring').getElementsByTagName('li')[4];
    if (button.getAttribute('disabled') === "true") return;
    button.getElementsByTagName('span')[1].style.opacity = '1';
    button.getElementsByTagName('span')[1].innerHTML = '...';
    var disabledId = disableButtonExcept(button);
    askForRandomNumberFromServer(button, disabledId);
};

var disableButtonExcept = function(button) {
    var disabledId = [];
    var buttons = document.getElementById('control-ring').getElementsByTagName('li');
    for (var buttonIndex in buttons) {
        if (!isNaN(buttonIndex) && buttons[buttonIndex] !== button && buttons[buttonIndex].getAttribute('disabled') === "false") {
            buttons[buttonIndex].setAttribute('disabled', "true");
            buttons[buttonIndex].style.backgroundColor = '#686868';
            disabledId.push(buttonIndex);
        }
    }
    return disabledId;
};

var askForRandomNumberFromServer = function(button, disabledId) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            button.getElementsByTagName('span')[1].innerHTML = xmlhttp.responseText;
            button.setAttribute('disabled', true);
            button.style.backgroundColor = '#686868';
            var buttons = document.getElementById('control-ring').getElementsByTagName('li');
            for (var key in disabledId) {
                if (!isNaN(key)) {
                    buttons[disabledId[key]].setAttribute('disabled', "false");
                    buttons[disabledId[key]].style.backgroundColor = 'rgba(48, 63, 159, 1)';
                }
            }
            checkIfAllButtonGotAResultAndAbleTheBigOneIfSo();
        }
    };
    xmlhttp.open("GET", "/", true);
    xmlhttp.send();
};

var checkIfAllButtonGotAResultAndAbleTheBigOneIfSo = function() {
    var buttons = document.getElementById('control-ring').getElementsByTagName('li');
    for (var key in buttons) {
        if (!isNaN(key)) {
            if (buttons[key].getAttribute('disabled') === "false") {
                return;
            }
        }
    }
    var bigButton = document.getElementById('info-bar');
    bigButton.setAttribute('disabled', 'false');
    bigButton.style.backgroundColor = 'rgba(48, 63, 159, 1)';
};

var countResultAndReflectOnBigButton = function() {
    console.log('test');
    var bigButton = document.getElementById('info-bar');
    if (bigButton.getAttribute('disabled') === "true") {
        return;
    } else {
        var result = 0;
        var buttons = document.getElementById('control-ring').getElementsByTagName('li');
        for (var key in buttons) {
            if (!isNaN(key)) {
                result += parseInt(buttons[key].getElementsByTagName('span')[1].innerHTML);
            }
        }
        bigButton.getElementsByTagName('span')[0].innerHTML = result;
    }
};

var addEventHandlerForAtplusButton = function() {
    var atplusButton = document.getElementsByClassName('apb')[0];
    atplusButton.onmouseout= function() {
        var buttons = document.getElementById('control-ring').getElementsByTagName('li');
        for (var key in buttons) {
            if (!isNaN(key)) {
                buttons[key].setAttribute('disabled', 'false');
                buttons[key].style.backgroundColor = 'rgba(48, 63, 159, 1)';
                buttons[key].getElementsByTagName('span')[1].innerHTML = "";
                buttons[key].getElementsByTagName('span')[1].style.opacity = '0';
            }
        }
        var bigButton = document.getElementById('info-bar');
        bigButton.setAttribute('disabled', 'true');
        bigButton.style.backgroundColor = "#686868";
        bigButton.getElementsByTagName('span')[0].innerHTML = "";
    };
};

