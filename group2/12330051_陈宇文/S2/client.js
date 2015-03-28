var cira = document.getElementById("cira");
var cirb = document.getElementById("cirb");
var circ = document.getElementById("circ");
var cird = document.getElementById("cird");
var cire = document.getElementById("cire");
var random1 = document.getElementById("random1");
var random2 = document.getElementById("random2");
var random3 = document.getElementById("random3");
var random4 = document.getElementById("random4");
var random5 = document.getElementById("random5");
var idname = ['cira','cirb','circ','cird','cire'];
isAcitve = {cira:"active",cirb:"active",circ:"active",cird:"active",cire:"active"};
var count = 0;
function  asyncA() {
  random1.style["opacity"]="1";
  if(isAcitve['cira'] == "active") {
    isAcitve['cira'] = "none";
    }
  var httpa = new XMLHttpRequest();
  httpa.onreadystatechange=function()
  {
     if (httpa.readyState==4 && httpa.status==200)  {
        random1.innerHTML = httpa.responseText;
		count++;
		for(var x in isAcitve) {
		  if(isAcitve[x] == "wait") {
		    isAcitve[x] = "active";
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "blue";
		  } else {
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "gray";
		  }
		}
        asyncB();		 
     }
  }
  httpa.open("GET","/",true);
  httpa.send();
  for(var x in isAcitve) {
    if(isAcitve[x] == "active") {
	   isAcitve[x] = "wait";
	   var temp = document.getElementById(x);
	   temp.style["background-color"]="gray";
	}
  }
}

function  asyncB() {
  random2.style["opacity"]="1";
  if(isAcitve['cirb'] == "active") {
    isAcitve['cirb'] = "none";
    }
  var httpb = new XMLHttpRequest();
  httpb.onreadystatechange=function()
  {
     if (httpb.readyState==4 && httpb.status==200)  {
        random2.innerHTML = httpb.responseText;
		count++;
		for(var x in isAcitve) {
		  if(isAcitve[x] == "wait") {
		    isAcitve[x] = "active";
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "blue";
		  } else {
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "gray";
		  }
		}
		asyncC(); 
     }
  }
  httpb.open("GET","/",true);
  httpb.send();
  for(var x in isAcitve) {
    if(isAcitve[x] == "active") {
	   isAcitve[x] = "wait";
	   var temp = document.getElementById(x);
	   temp.style["background-color"]="gray";
	}
  }
}

function  asyncC() {
  random3.style["opacity"]="1";
  if(isAcitve['circ'] == "active") {
    isAcitve['circ'] = "none";
    }
  var httpc = new XMLHttpRequest();
  httpc.onreadystatechange=function()
  {
     if (httpc.readyState==4 && httpc.status==200)  {
        random3.innerHTML = httpc.responseText;
		count++;
		for(var x in isAcitve) {
		  if(isAcitve[x] == "wait") {
		    isAcitve[x] = "active";
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "blue";
	   
		  } else {
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "gray";

		  }
		}
		asyncD(); 
     }
  }
  httpc.open("GET","/",true);
  httpc.send();
  for(var x in isAcitve) {
    if(isAcitve[x] == "active") {
	   isAcitve[x] = "wait";
	   var temp = document.getElementById(x);
	   temp.style["background-color"]="gray";
	}
  }
}

function  asyncD() {;
  random4.style["opacity"]="1";
  if(isAcitve['cird'] == "active") {
    isAcitve['cird'] = "none";
    }
  var httpd = new XMLHttpRequest();
  httpd.onreadystatechange=function()
  {
     if (httpd.readyState==4 && httpd.status==200)  {
        random4.innerHTML = httpd.responseText;
		count++;
		for(var x in isAcitve) {
		  if(isAcitve[x] == "wait") {
		    isAcitve[x] = "active";
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "blue";
	        
		  } else {
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "gray";
		  }
		}
        asyncE();		 
     }
  }
  httpd.open("GET","/",true);
  httpd.send();
  for(var x in isAcitve) {
    if(isAcitve[x] == "active") {
	   isAcitve[x] = "wait";
	   var temp = document.getElementById(x);
	   temp.style["background-color"]="gray";
	}
  }
}

function  asyncE() {
  random5.style["opacity"]="1";
  if(isAcitve['cire'] == "active") {
    isAcitve['cire'] = "none";
    }
  var httpe = new XMLHttpRequest();
  httpe.onreadystatechange=function()
  {
     if (httpe.readyState==4 && httpe.status==200)  {
        random5.innerHTML = httpe.responseText;
		count++;
		for(var x in isAcitve) {
		  if(isAcitve[x] == "wait") {
		    isAcitve[x] = "active";
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "blue";
		  } else {
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "gray";
		  }
		}
		if(count == 5) {
		  var temp = document.getElementById("info-bar");
		  temp.style["background-color"] = "blue";
		  calculate();
		 } 
     }
  }
  httpe.open("GET","/",true);
  httpe.send();
  for(var x in isAcitve) {
    if(isAcitve[x] == "active") {
	   isAcitve[x] = "wait";
	   var temp = document.getElementById(x);
	   temp.style["background-color"]="gray";
	}
  }
}


function calculate() {
  var cal = document.getElementById("info");
  cal.innerHTML = parseInt(random1.innerHTML) + parseInt(random2.innerHTML) +parseInt(random3.innerHTML) +parseInt(random4.innerHTML) + parseInt(random5.innerHTML);
  document.getElementById("info-bar").style["background-color"] = "gray";
  document.getElementById("info-bar").onclick=free_();
  count++;
}

function free_() {

}

function init() {
  if(count==6) {
  cira.style["background-color"] = "blue";
  cirb.style["background-color"] = "blue";
  circ.style["background-color"] = "blue";
  cird.style["background-color"] = "blue";
  cire.style["background-color"] = "blue";
  random1.style["opacity"] = "0";
  random1.innerHTML = "...";
  random2.style["opacity"] = "0";
  random2.innerHTML = "...";
  random3.style["opacity"] = "0";
  random3.innerHTML = "...";
  random4.style["opacity"] = "0";
  random4.innerHTML = "...";
  random5.style["opacity"] = "0";
  random5.innerHTML = "...";
  document.getElementById("info-bar").style["background-color"] = "gray";
  document.getElementById("info-bar").onclick = free_();
  document.getElementById("info").innerHTML = "";
  for(var x in isAcitve) {
    isAcitve[x] = "active";
  }
  count = 0;
  }
}