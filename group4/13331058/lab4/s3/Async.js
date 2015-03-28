window.onload = function() {
	PreSetting();
}

var sum = 0;
var click_num = 0;
var can_start = 1;
var interrupt = 0;
var arise = 0;

function PreSetting() {
	var a_plus = document.getElementById("button");
	a_plus.onclick = function() {
		if (can_start) {
			click_num = 0;
			can_start = 0;
			this.id = "button_hover";
			var area_ = document.getElementsByTagName("div")[0];
			area_.id = "area";
			area_.onmouseout = function() {
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
			interrupt = 0;
			CreatRandomNumber();
		}
	}
}

function CreatRandomNumber() {
	var buttons = document.getElementsByTagName("ul");
	var r_numbers = buttons[1].getElementsByTagName("li");
	for (var i = 0; i < 5; i++) {
		r_numbers[i].canclick = 1;
		r_numbers[i].have_number = 0;
	}
	var r_sum = buttons[0].getElementsByTagName("li");
	r_sum[0].canclick = 0;
	var no = 0;
	for (var i = 0; i < 5; i++) {
		r_numbers[i].style.background = "#0044BB";
		no++;
		if (r_numbers[i].have_number == 0) {
			GetNum(r_numbers, no);
		}
			
				
			
			
	}
}

function GetNum(allbuttons, times) {
	if (times <= 5) {
		arise = 0;

		var item;
		var xmlhttp = null;

		var r = allbuttons[times-1].getElementsByTagName("span")[0];
		r.style.display="inline";
		r.innerHTML = "...";
		for (var l = 0; l < 5; l++) {
			allbuttons[l].style.background = "#666666";
			allbuttons[l].canclick = 0;
		}

		xmlhttp = new XMLHttpRequest();
    	if (xmlhttp != null) {
	        xmlhttp.open("get", "/" + String(times), true);
	        xmlhttp.send();

	        xmlhttp.onreadystatechange = function() {

	        	if (xmlhttp.readyState==4 && xmlhttp.status == 200) {
	        		if (interrupt) {
			        	arise = 1;
			        	ReSetting();
			        	return;
		        	}
		        	if (r.innerHTML == "...")
	        			r.innerHTML = (xmlhttp.responseText);
	        		allbuttons[times-1].have_number = 1;
	        		click_num++;
	        		sum += parseInt(r.innerHTML);
	        		for (var l = 0; l < 5; l++) {
	        			if (allbuttons[l].have_number == 0) {
							allbuttons[l].canclick = 1;
	        			}
					}
					if (click_num == 5) {
						arise = 1;
						var buttons = document.getElementsByTagName("ul");
						var r_numbers = buttons[0].getElementsByTagName("li");
						r_numbers[0].style.background = "#0044BB";
						r_numbers[0].canclick = 1;
						
							if (r_numbers[0].canclick == 1)
								r_numbers[0].innerHTML = sum;
					}
	        	}
	        }

    	}
	}
}

function ReSetting() {
	interrupt = 1;
	sum = 0;
	click_num = 0;
	if (arise)
		can_start = 1;
	var a_plus = document.getElementsByTagName("div")[2];
	a_plus.id = "button";
	var area_ = document.getElementsByTagName("div")[0];
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
