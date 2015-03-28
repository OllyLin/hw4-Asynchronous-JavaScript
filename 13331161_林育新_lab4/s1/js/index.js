var disabled = function(array) {
	if (Array.isArray(array)) {
		for (var i = array.length - 1; i >= 0; i--) {
			array[i].classList.remove('enable');
			array[i].classList.add("disabled");
		}
	} else {
		array.classList.remove('enable');
		array.classList.add("disabled");
	}
};

var enable = function(array) {
	if (Array.isArray(array)) {
		for (var i = array.length - 1; i >= 0; i--) {
			if (array[i].children[1].innerHTML == '...') {
				array[i].classList.remove('disabled');
			}
		}
	} else {
		array.classList.remove("disabled");
		array.classList.add('enable');
	}
};

var isAllClick = function(array) {
	return (array[0].children[1].innerHTML !== '...' &&
			array[1].children[1].innerHTML !== '...' &&
			array[2].children[1].innerHTML !== '...' &&
			array[3].children[1].innerHTML !== '...' &&
			array[4].children[1].innerHTML !== '...');
};

window.onload = function () {
	var container = document.getElementById("button");
	var apb = document.getElementsByClassName("apb")[0];
	var btns = document.getElementsByClassName("button");
	var info = document.getElementById("info-bar");
	disabled(info);

	
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsot.XMLHTTP");
	}

	// calculate the sum
	info.addEventListener("click", function(event) {
		var that = event.target;
		if (that.classList.contains('enable')) {
			var res = 0;
			for (var i = btns.length - 1; i >= 0; i--) {
				res += Number(btns[i].children[1].innerHTML);
			}
			that.innerHTML = res;
		}
	})

	// reset
	container.addEventListener('mouseout', function(event) {
		var target = event.relatedTarget ? event.relatedTarget : event.toElement;
		while (target && target != this) {
			target = target.parentNode;
		}
		if (target != this) {
			for (var i = btns.length - 1; i >= 0; i--) {
				btns[i].children[1].classList.add('unseen');
				btns[i].children[1].innerHTML = "...";
				xmlhttp.abort();
				enable(btns[i]);
			}
				info.innerHTML = "";
				disabled(info);

		}
	})

	// handler for click button
	for (var i = 0; i < btns.length; i++) {
		btns[i].addEventListener("click", interactByMan, false);
	}

	function interactByMan() {
		var that = this;
		if (!that.classList.contains('disabled')) {
			var tmparr = [];
			for (var i = btns.length - 1; i >= 0; i--) {
				if (btns[i].children[0].innerHTML !== that.children[0].innerHTML) {
					tmparr.push(btns[i]);
				}
			}
			disabled(tmparr);
			var smallIcon = that.getElementsByTagName("span")[0];
			smallIcon.innerHTML = "...";
			smallIcon.classList.remove("unseen");

			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					smallIcon.innerHTML = xmlhttp.responseText;
					enable(tmparr);
					disabled(that);
					if (isAllClick(btns)) {
						enable(info);
					}
				}
			}
			xmlhttp.open("GET", "/", true);
			xmlhttp.send();
		}
	}

};