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
var flag = true;
function allpush() {
  asyncA();
  asyncB();
  asyncC();
  asyncD();
  asyncE();
}
function  asyncA() {
  random1.style["opacity"]="1";
  var httpa = new XMLHttpRequest();
  httpa.onreadystatechange=function()
  {
     if (httpa.readyState==4 && httpa.status==200)  {
        random1.innerHTML = httpa.responseText;
		 delete httpa;
	   httpa = null;
		count++;
		cira.style["background-color"] = "gray";
		if(count == 5) {
		  var temp = document.getElementById("info-bar");
		  temp.style["background-color"] = "blue";
		  calculate();
		 }	
	  }
  }
  httpa.open("GET","/"+Math.random(),true);
  httpa.send();

}

function  asyncB() {
  random2.style["opacity"]="1";
  /*if(isAcitve['cirb'] == "active") {
    isAcitve['cirb'] = "none";
    }*/
  var httpb = new XMLHttpRequest();
  httpb.onreadystatechange=function()
  {
     if (httpb.readyState==4 && httpb.status==200)  {
        random2.innerHTML = httpb.responseText;
		 delete httpb;
	   httpb = null;
		count++;
		cirb.style["background-color"] = "gray";
		if(count == 5) {
		  var temp = document.getElementById("info-bar");
		  temp.style["background-color"] = "blue";
		  calculate();
		 } 
	 }
  }
  httpb.open("GET","/"+Math.random(),true);
  httpb.send();
}

function  asyncC() {
  random3.style["opacity"]="1";
  var httpc = new XMLHttpRequest();
  httpc.onreadystatechange=function()
  {
     if (httpc.readyState==4 && httpc.status==200)  {
        random3.innerHTML = httpc.responseText;
		 delete httpc;
	   httpc = null;
		count++;
		circ.style["background-color"] = "gray";
		if(count == 5) {
		  var temp = document.getElementById("info-bar");
		  temp.style["background-color"] = "blue";
		  calculate();
		 } 
	  }
  }
  httpc.open("GET","/"+Math.random(),true);
  httpc.send();
}

function  asyncD() {;
  random4.style["opacity"]="1";
  var httpd = new XMLHttpRequest();
  httpd.onreadystatechange=function()
  {
     if (httpd.readyState==4 && httpd.status==200)  {
        random4.innerHTML = httpd.responseText;
		 delete httpd;
	   httpd = null;
		count++;
		cird.style["background-color"] = "gray";
		if(count == 5) {
		  var temp = document.getElementById("info-bar");
		  temp.style["background-color"] = "blue";
		  calculate();
		 }
	 }
  }
  httpd.open("GET","/"+Math.random(),true);
  httpd.send();
}

function  asyncE() {
  random5.style["opacity"]="1";
  var httpe = new XMLHttpRequest();
  httpe.onreadystatechange=function()
  {
     if (httpe.readyState==4 && httpe.status==200)  {
        random5.innerHTML = httpe.responseText;
		 delete httpe;
	   httpe = null;
		count++;
		cire.style["background-color"] = "gray";
		if(count == 5) {
		  var temp = document.getElementById("info-bar");
		  temp.style["background-color"] = "blue";
		  calculate();
		 }
	 }
  }
  httpe.open("GET","/"+Math.random(),true);
  httpe.send();
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

  count = 0;
  }
}