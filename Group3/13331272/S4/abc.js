  function getRamdomNumber () {
	var xmlhttp = new XMLHttpRequest();
	var that = this;
	var list = document.getElementsByClassName("button");
	for (var i = 0; i < list.length; i++) {
	list[i].onclick = "";
	list[i].style.backgroundColor = "rgb(168,168,168)";
	}
	that.style.backgroundColor = "rgb(33, 74, 156)";
	that.childNodes[1].innerHTML = "...";
	that.childNodes[1].style.display = "block";
	xmlhttp.open("GET","/",true);
	xmlhttp.onreadystatechange = function () {
     	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            that.childNodes[1].innerHTML = xmlhttp.responseText;
            for (var i = 0; i < list.length; i++) {
			list[i].onclick = getRamdomNumber;
			list[i].style.backgroundColor = "rgb(33, 74, 156)";
			}
			that.onclick = "";;
			that.style.backgroundColor = "rgb(168,168,168)";
			if (judge()) {
			document.getElementById("info-bar").onclick = getSum;
			}
        } 
    }
	xmlhttp.send();
}

 function modelClick (arr, pos) {
	var xmlhttp = new XMLHttpRequest();
	var that = this;
	var list = document.getElementsByClassName("button");
	for (var i = 0; i < list.length; i++) {
	list[i].onclick = "";
	list[i].style.backgroundColor = "rgb(168,168,168)";
	}
	that.style.backgroundColor = "rgb(33, 74, 156)";
	that.childNodes[1].innerHTML = "...";
	that.childNodes[1].style.display = "block";
	xmlhttp.open("GET","/",true);
	xmlhttp.onreadystatechange = function () {
     	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            that.childNodes[1].innerHTML = xmlhttp.responseText;
            for (var i = 0; i < list.length; i++) {
			list[i].onclick = getRamdomNumber;
			list[i].style.backgroundColor = "rgb(33, 74, 156)";
			}
			that.onclick = "";;
			that.style.backgroundColor = "rgb(168,168,168)";
			if (pos < 4) {
			pos++;
			next(arr, pos);
			}
			if (judge()) {
			document.getElementById("info-bar").onclick = getSum;
			document.getElementById("info-bar").click();
			}
        } 
    }
	xmlhttp.send();
}

function judge() {
	var list = document.getElementsByClassName("button");
	var flag = true;
	for (var i = 0; i < list.length; i++) {
	if (list[i].childNodes[1].innerHTML == "" || list[i].childNodes[1].innerHTML == "...") {
		flag = false;
	}
}
	return flag;
}

function distinguish() {
	var list = document.getElementsByClassName("button");
	var flag = true;
	for (var i = 0; i < list.length; i++) {
	if (list[i].childNodes[1].innerHTML != "") {
		flag = false;
	}
}
	return flag;
}

function next(arr, pos) {
	var list = document.getElementsByClassName("button");
	modelClick.call(list[arr[pos]], arr, pos);
}

function getSum() {
	var sum = 0;
	var list = document.getElementsByClassName("button");
	for (var i = 0; i < list.length; i++) {
		var num = list[i].childNodes[1].innerHTML;
		sum += parseInt(num);
	}
	document.getElementById("sum").innerHTML = sum.toString();
	document.getElementById("info-bar").onclick = "";
}


window.onload = function() {
	var list = document.getElementsByClassName("button");
	for (var i = 0; i < list.length; i++) {
	list[i].onclick = getRamdomNumber;
}
    var at = document.getElementById("at-plus-container");
    var icon = document.getElementById("icon");
	icon.onclick = s3;
    //重置
    at.onmouseout = function(e) {  
    if( !e ) e = window.event;  
    var reltg = e.relatedTarget ? e.relatedTarget : e.toElement;  
    while( reltg && reltg != this ) reltg = reltg.parentNode;  
    	if( reltg != this ) {  
    		for (var i = 0; i < list.length; i++) {
				list[i].style.backgroundColor = "rgb(33, 74, 156)";
				list[i].onclick = getRamdomNumber;
				list[i].childNodes[1].style.display = "none";
				list[i].childNodes[1].innerHTML = "";
			}
				document.getElementById("info-bar").onclick = "";
				document.getElementById("sum").innerHTML = "";
				document.getElementById("seq").style.display = "none";
				document.getElementById("seq").innerHTML = "";
   		}  
	}
	

}

function showSeq(arr) {
	var str = 'A';
	var code = str.charCodeAt(); 
	var seq = document.getElementById("seq");
	seq.innerHTML = "Seq:";
	for (var i = 0; i < arr.length; i++) {
		seq.innerHTML += String.fromCharCode(code+arr[i]);
	}
	seq.style.display = "block";
}

function s3() {
	if (distinguish()) {
	var list = document.getElementsByClassName("button");
	var arr = [0, 1, 2, 3, 4];
	arr.sort(function(){return Math.random()>0.5?-1:1;});
	showSeq(arr);
	modelClick.call(list[arr[0]], arr, 0);
}
}