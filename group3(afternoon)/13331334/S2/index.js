window.onload = function () {
	document.getElementsByClassName("icon")[0].addEventListener("transitionend", clear);
	document.getElementById("info-bar").onclick = sumUp;
	var buttons = document.getElementsByClassName("button");
	for (var i = 0; i < buttons.length; ++i)
		buttons[i].onclick = fetchNumber;
	document.getElementsByClassName("apb")[0].onclick = oneFinger;
}

function oneFinger() {
	var buttons = document.getElementsByClassName("button");
	for (var i = 0; i < buttons.length; ++i)
		if (!util.hasClass(buttons[i].lastChild, "unread")) {
			fetchNumber.apply(buttons[i]);
			return;
		}
	document.getElementById("info-bar").click();
}

function clear(event) {
	if (this.parentElement.querySelector(':hover') !== this) {
		var buttons = document.getElementsByClassName("button");
		for (var i = 0; i < buttons.length; ++i) {
			util.removeClass(buttons[i], "disabled");
			if (util.hasClass(buttons[i].lastChild, "unread"))
				buttons[i].removeChild(buttons[i].lastChild);
		}
		var big = document.getElementById("info-bar");
		util.addClass(big, "disabled");
		big.getElementsByTagName("span")[0].textContent = "";
	}
}

function sumUp(event) {
	if (!util.hasClass(this, "disabled")) {
		var sum = 0;
		var buttons = document.getElementById("control-ring").getElementsByTagName("li");
		for (var i = 0; i < buttons.length; ++i)
			sum += parseInt(buttons[i].lastChild.textContent);
		this.getElementsByTagName("span")[0].textContent = sum.toString();
		util.addClass(this, "disabled");
	}
}

function fetchNumber(e) {
	if (!util.hasClass(this, "disabled") && !util.hasClass(this.lastChild, "unread")) {
		// add circle
		var circle = document.createElement("span");
		circle.appendChild(document.createTextNode("…"));
		util.addClass(circle, "unread");
		this.appendChild(circle);

		// disable siblings
		var siblings = this.parentNode.getElementsByTagName("li");
		for (var i = 0; i < siblings.length; ++i)
			if (siblings[i] !== this)
				util.addClass(siblings[i], "disabled");

		ajax("/", get_fetchNumberHandler(this, e));
	}
}

function get_fetchNumberHandler(button, e) {
	return function (response) {
		// enable siblings
		var siblings = button.parentNode.getElementsByTagName("li");
		for (var i = 0; i < siblings.length; ++i)
			if (!util.hasClass(siblings[i].lastChild, "unread"))
				util.removeClass(siblings[i], "disabled");
		button.lastChild.textContent = response;
		util.addClass(button, "disabled");
		checkIfAllCompleted();
		if (!e)
			oneFinger();
	};
}

function checkIfAllCompleted() {
	var infoBar = document.getElementById("info-bar");
	if (util.hasClass(infoBar, "disabled")) {
		var buttons = document.getElementById("control-ring").getElementsByTagName("li");
		for (var i = 0; i < buttons.length; ++i)
			if (!util.hasClass(buttons[i].lastChild, "unread"))
				return;
		util.removeClass(infoBar, "disabled");
	}
}

function ajax(url, fnSucc) {
    var oAjax = new XMLHttpRequest();
    oAjax.open('GET', url, true);
    oAjax.send();
    oAjax.onreadystatechange = function() {
        if(oAjax.readyState == 4) {
            fnSucc(oAjax.responseText);
        }
    };
}
