window.onload = function() {
    var buttons = document.getElementById('control-ring').getElementsByTagName('li');
    var bigButton = document.getElementById('info-bar');
    var atplusButton = document.getElementsByClassName('apb')[0];
    buttons[0].addEventListener('click', aHandler);
    buttons[1].addEventListener('click', bHandler);
    buttons[2].addEventListener('click', cHandler);
    buttons[3].addEventListener('click', dHandler);
    buttons[4].addEventListener('click', eHandler);
    bigButton.setAttribute('disabled', 'true');
    bigButton.addEventListener('click', countResultAndReflectOnBigButton);
    addEventHandlerForAtplusButton();
    atplusButton.addEventListener('click', randomRobotHandler);
};

var aHandler = function(currentSum, order) {
    var button = document.getElementById('control-ring').getElementsByTagName('li')[0];
    if (button.getAttribute('disabled') === "true") return;
    button.getElementsByTagName('span')[1].style.opacity = '1';
    button.getElementsByTagName('span')[1].innerHTML = '...';
    var disabledId = disableButtonExcept(button);
    askForRandomNumberFromServer(button, disabledId, currentSum, order);
};

var bHandler = function(currentSum, order) {
    var button = document.getElementById('control-ring').getElementsByTagName('li')[1];
    if (button.getAttribute('disabled') === "true") return;
    button.getElementsByTagName('span')[1].style.opacity = '1';
    button.getElementsByTagName('span')[1].innerHTML = '...';
    var disabledId = disableButtonExcept(button);
    askForRandomNumberFromServer(button, disabledId, currentSum, order);
};

var cHandler = function(currentSum, order) {
    var button = document.getElementById('control-ring').getElementsByTagName('li')[2];
    if (button.getAttribute('disabled') === "true") return;
    button.getElementsByTagName('span')[1].style.opacity = '1';
    button.getElementsByTagName('span')[1].innerHTML = '...';
    var disabledId = disableButtonExcept(button);
    askForRandomNumberFromServer(button, disabledId, currentSum, order);
};

var dHandler = function(currentSum, order) {
    var button = document.getElementById('control-ring').getElementsByTagName('li')[3];
    if (button.getAttribute('disabled') === "true") return;
    button.getElementsByTagName('span')[1].style.opacity = '1';
    button.getElementsByTagName('span')[1].innerHTML = '...';
    var disabledId = disableButtonExcept(button);
    askForRandomNumberFromServer(button, disabledId, currentSum, order);
};

var eHandler = function(currentSum, order) {
    var button = document.getElementById('control-ring').getElementsByTagName('li')[4];
    if (button.getAttribute('disabled') === "true") return;
    button.getElementsByTagName('span')[1].style.opacity = '1';
    button.getElementsByTagName('span')[1].innerHTML = '...';
    var disabledId = disableButtonExcept(button);
    askForRandomNumberFromServer(button, disabledId, currentSum, order);
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

var askForRandomNumberFromServer = function(button, disabledId, currentSum, order) {
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
            var atplusButton = document.getElementsByClassName('apb')[0];
            if (atplusButton.getAttribute('clicked') === "true") {
                currentSum += parseInt(xmlhttp.responseText);
                switch (order[0]) {
                    case 'A':
                        order.shift();
                        aHandler(0, order);
                        break;
                    case 'B':
                        order.shift();
                        bHandler(0, order);
                        break;
                    case 'C':
                        order.shift();
                        cHandler(0, order);
                        break;
                    case 'D':
                        order.shift();
                        dHandler(0, order);
                        break;
                    case 'E':
                        order.shift();
                        eHandler(0, order);
                        break;
                    default:
                        var bigButton = document.getElementById('info-bar');
                        bigButton.click();
                        atplusButton.setAttribute('clicked', "true");
                        break;
                }
            }
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
        atplusButton.setAttribute('clicked', 'false');
    };
};

var randomRobotHandler = function() {
    var atplusButton = document.getElementsByClassName('apb')[0];
    atplusButton.setAttribute('clicked', "true");
    var order = getRandomOrder();
    switch (order[0]) {
        case 'A':
            order.shift();
            aHandler(0, order);
            break;
        case 'B':
            order.shift();
            bHandler(0, order);
            break;
        case 'C':
            order.shift();
            cHandler(0, order);
            break;
        case 'D':
            order.shift();
            dHandler(0, order);
            break;
        case 'E':
            order.shift();
            eHandler(0, order);
            break;
    }
};

var getRandomOrder = function() {
    var order = [], original = ['A', 'B', 'C', 'D', 'E'];
    var random, count = 0;
    while (true) {
        random = Math.floor(Math.random() * 5);
        if (order[random] === undefined) {
            order[random] = original[count++];
        }
        if (count === 5) {
            break;
        }
    }
    return order;
};

