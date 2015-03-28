window.onload = function() {
	init();
}

var init = function() {
	RESET = window.setTimeout(reset, 2000);
	buttons = document.getElementsByClassName('button');
	nums = []
	total = document.getElementsByClassName('total')[0];
	info = document.getElementsByClassName('info')[0];
	icon = document.getElementsByClassName('apb')[0];
	for (var index = 0; index < buttons.length; index++) {
		nums[index] = buttons[index].getElementsByClassName('unread')[0];
	}
	for (var index = 0; index < buttons.length; index++) {
		addEventHandler(index);
	}
	info.addEventListener("click", function() {
		if (this.style.cursor == "pointer") {
			total.style.visibility = "visible";
			this.style.cursor = "auto";
			console.log("Sum of the 5 numbers is " + total.innerHTML);
		}
	})
	field = document.getElementById("button");
	field.addEventListener("mouseleave", function() {
		RESET = window.setTimeout(reset, 2000);
	});
	field.addEventListener("mouseenter", function() {
		window.clearTimeout(RESET);
	})
	icon.addEventListener("click", function() {
		robot();
	})
}

var addEventHandler = function(index) {
	var button = buttons[index];
	button.addEventListener("click", function() {
		if (this.style.cursor != "auto") {
			getRandomNumber(index);
			nums[index].style.visibility="visible";
			setButtonsStatus(false);
			checkAll();
		}
	})
}

var checkAll = function() {
	var flag = true;
	var sum = 0;
	for (var index = 0; index < nums.length; index++) {
		if (nums[index].innerHTML.length == 0) {
			flag = false;
			break;
		}
		sum += parseInt(nums[index].innerHTML);
	}
	if (flag) {
		info.style.cursor = "pointer";
		total.innerHTML = sum.toString();
	} else{
		info.style.cursor = "auto";
	}
	total.style.visibility = 'hidden';
	return flag;
}

var getRandomNumber = function(index) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			nums[index].innerHTML = xmlhttp.responseText;
			console.log("Value of " + ("No." + (index + 1)) + " is " + xmlhttp.responseText);
			setButtonsStatus(true);
			checkAll();
		}
	}
	xmlhttp.open('GET', '/', true);
	xmlhttp.send();
}

var setButtonsStatus = function(flag) {
	for (var index = 0; index < buttons.length; index++) {
		buttons[index].style.cursor = flag ? "pointer" : "auto";
		buttons[index].style.backgroundColor = flag ? "blue" : "grey";
	}
}

var reset = function() {
	info.style.cursor = "auto";
	total.style.visibility = "hidden";
	for (var index = 0; index < nums.length; index++) {
		nums[index].innerHTML = "";
		nums[index].style.visibility = "hidden";
	}
	setButtonsStatus(true);
	console.log("Reset!");
}

var robot = function() {
	console.log("Robot operation.");
	getRandomNumberAuto(0);
}

var getRandomNumberAuto = function(index) {
	nums[index].style.visibility = "visible";
	setButtonsStatus(false);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			nums[index].innerHTML = xmlhttp.responseText;
			console.log("Value of " + ("No." + (index + 1)) + " is " + xmlhttp.responseText);
			setButtonsStatus(true);
			if (index < buttons.length - 1)
				getRandomNumberAuto(index + 1);
			else
				showSum();
		}
	}
	xmlhttp.open('GET', '/', true);
	xmlhttp.send();
}

var showSum = function() {
	checkAll();
	total.style.visibility = "visible";
	console.log("Sum of the 5 numbers is " + total.innerHTML);
}