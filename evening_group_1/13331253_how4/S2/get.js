window.onload = function(){
	getnum("http://localhost:3000",function(randomnum) {
		console.log(randomnum);
	});
}
function getnum(url,successfunction) {
	var xmlhttp;
	if(window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}
	else {
		oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			successfunction(xmlhttp.responseText);
		}
	}
}