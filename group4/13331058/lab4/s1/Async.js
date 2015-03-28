window.onload = function() {
	PreSetting();
	CreatRandomNumber();
}

var sum = 0;
var click_num = 0;

function PreSetting() {
	var a_plus = document.getElementById("button");
	a_plus.onmouseover = function() {
		this.id = "button_hover";
		var area_ = document.getElementsByTagName("div")[0];
		area_.onmouseover = function() {
			this.id = "area";
			this.onmouseout = function() {
				var x = event.clientX;
				var y = event.clientY;
				var areax1 = this.offsetLeft;
				var areax2 = this.offsetLeft + 350;
				var areay1 = this.offsetTop;
				var areay2 = this.offsetTop + 350;
				if (x >= areax2 || x < areax1 || y < areay1 || y >= areay2) {
					ReSetting();
				}
			}
		}
	}
}

function CreatRandomNumber() {
	var buttons = document.getElementsByTagName("ul");
	var r_numbers = buttons[1].getElementsByTagName("li");
	var setting;
	for (var i = 0; i < 5; i++) {
		r_numbers[i].canclick = 1;
		r_numbers[i].no = i;
		r_numbers[i].have_number = 0;
	}
	var r_sum = buttons[0].getElementsByTagName("li");
	r_sum[0].canclick = 0;
	for (var i = 0; i < 5; i++) {
		r_numbers[i].style.background = "#0044BB";
		r_numbers[i].onclick = function() {
			if (this.canclick == 1) {
				click_num++;
				setting = this.no;
				this.have_number = 1;
				var r = this.getElementsByTagName("span")[0];
				r.style.display="inline";
				var number = 0;
				r.innerHTML = "...";
				for (var l = 0; l < 5; l++) {
					r_numbers[l].style.background = "#666666";
					r_numbers[l].canclick = 0;
				}
				GetNum(this, r_numbers, click_num);
			}
		}
	}
}

function GetNum(itself, allbuttons, times) {
	var item;
	var xmlhttp = null;
	var r = itself.getElementsByTagName("span")[0];
	xmlhttp = new XMLHttpRequest();
    if (xmlhttp != null) {
        xmlhttp.open("get", "/", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
        	if (xmlhttp.readyState==4 && xmlhttp.status == 200) {
        		r.innerHTML = (xmlhttp.responseText);
        		sum += parseInt(r.innerHTML);
        		for (var l = 0; l < 5; l++) {
        			if (allbuttons[l].have_number == 0) {
        				allbuttons[l].style.background = "#0044BB";
						allbuttons[l].canclick = 1;
        			}
				}
				if (times == 5) {
					var buttons = document.getElementsByTagName("ul");
					var r_numbers = buttons[0].getElementsByTagName("li");
					r_numbers[0].style.background = "#0044BB";
					r_numbers[0].canclick = 1;
					r_numbers[0].onclick = function() {
						if (r_numbers[0].canclick == 1)
							this.innerHTML = sum;
					}
				}
        	}
        }
    }
}

function ReSetting() {
	sum = 0;
	click_num = 0;
	var a_plus = document.getElementById("button_hover");
	a_plus.id = "button";
	var area_ = document.getElementById("area");
	area_.id = "at-plus-container";
	var buttons = document.getElementsByTagName("ul");
	var r_numbers = buttons[1].getElementsByTagName("li");
	for (var i = 0; i < 5; i++) {
		r_numbers[i].canclick = 1;
		r_numbers[i].have_number = 0;
		r_numbers[i].style.background = "#0044BB";
		var r = r_numbers[i].getElementsByTagName("span")[0];
		r.style.display="none";
	}
	var r_numbers = buttons[0].getElementsByTagName("li");
	r_numbers[0].style.background = "#666666";
	r_numbers[0].innerHTML = "";
	r_numbers[0].canclick = 0;
}
