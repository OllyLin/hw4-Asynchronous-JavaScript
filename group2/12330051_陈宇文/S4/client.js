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
var idname = [0,0,0,0,0];
var order = [true,true,true,true,true];
isAcitve = {cira:"active",cirb:"active",circ:"active",cird:"active",cire:"active"};
var count = 0;
var index = 0;
function randompush() {
  var i;
  var j = 0;
  while(1) {
    i = Math.floor(Math.random()*5);
	if (order[i] == true || count == 6) {
	  order[i] = false;
	  idname[j++] = i;}
	 if(j == 5)
	  break;
	  }
  for(j = 0; j < 5; j++)
      switch(idname[j]) {
	  case 0:document.getElementById("info").innerHTML += "A";break;
	  case 1:document.getElementById("info").innerHTML += "B";break;
	  case 2:document.getElementById("info").innerHTML += "C";break;
	  case 3:document.getElementById("info").innerHTML += "D";break;
	  case 4:document.getElementById("info").innerHTML += "E";break;
	  }
  i = idname[index++];
  switch(i) {
  case 0:asyncA();break;
  case 1:asyncB();break;
  case 2:asyncC();break;
  case 3:asyncD();break;
  case 4:asyncE();break;
  }
}
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
		//document.getElementById("info").innerHTML += "A";
		count++;
		for(var x in isAcitve) {
		  if(isAcitve[x] == "wait") {
		    isAcitve[x] = "active";
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "blue";
	        switch(x) {
			case 'cira':temp.onclick = function(){asyncA();};break;
			case 'cirb':temp.onclick = function(){asyncB();};break;
			case 'circ':temp.onclick = function(){asyncC();};break;
			case 'cird':temp.onclick = function(){asyncD();};break;
			case 'cire':temp.onclick = function(){asyncE();};break;
			}
		  } else {
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "gray";
			temp.onclick = free_();
		  }
		}
		if(count == 5) {
		  var temp = document.getElementById("info-bar");
		  temp.style["background-color"] = "blue";
		  calculate();
		 }
        var i;
        i = idname[index++]; 
        if(count != 6) {		
         switch(i) {
          case 0:asyncA();break;
          case 1:asyncB();break;
           case 2:asyncC();break;
           case 3:asyncD();break;
            case 4:asyncE();break;
          }}		 
     }
  }
  httpa.open("GET","/",true);
  httpa.send();
  for(var x in isAcitve) {
    if(isAcitve[x] == "active") {
	   isAcitve[x] = "wait";
	   var temp = document.getElementById(x);
	   temp.style["background-color"]="gray";
	   temp.onclick = function(){};
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
		//document.getElementById("info").innerHTML += "B";
		count++;
		for(var x in isAcitve) {
		  if(isAcitve[x] == "wait") {
		    isAcitve[x] = "active";
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "blue";
	        switch(x) {
			case 'cira':temp.onclick = function(){asyncA();};break;
			case 'cirb':temp.onclick = function(){asyncB();};break;
			case 'circ':temp.onclick = function(){asyncC();};break;
			case 'cird':temp.onclick = function(){asyncD();};break;
			case 'cire':temp.onclick = function(){asyncE();};break;
			}
		  } else {
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "gray";
			temp.onclick = free_();
		  }
		}
		if(count == 5) {
		  var temp = document.getElementById("info-bar");
		  temp.style["background-color"] = "blue";
		  calculate();
		 }
        var i;
        i = idname[index++]; 
		if(count != 6) {
        switch(i) {
        case 0:asyncA();break;
		case 1:asyncB();break;
		case 2:asyncC();break;
		case 3:asyncD();break;
		case 4:asyncE();break;
		} }		 
     }
  }
  httpb.open("GET","/",true);
  httpb.send();
  for(var x in isAcitve) {
    if(isAcitve[x] == "active") {
	   isAcitve[x] = "wait";
	   var temp = document.getElementById(x);
	   temp.style["background-color"]="gray";
	  temp.onclick = free_();
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
		//document.getElementById("info").innerHTML += "C";
		count++;
		for(var x in isAcitve) {
		  if(isAcitve[x] == "wait") {
		    isAcitve[x] = "active";
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "blue";
	        switch(x) {
			case 'cira':temp.onclick = function(){asyncA();};break;
			case 'cirb':temp.onclick = function(){asyncB();};break;
			case 'circ':temp.onclick = function(){asyncC();};break;
			case 'cird':temp.onclick = function(){asyncD();};break;
			case 'cire':temp.onclick = function(){asyncE();};break;
			}
		  } else {
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "gray";
			temp.onclick = free_();
		  }
		}
		if(count == 5) {
		  var temp = document.getElementById("info-bar");
		  temp.style["background-color"] = "blue";
		  calculate();
		 } 
		 var i;
        i = idname[index++]; 
		if(count != 6) {
        switch(i) {
        case 0:asyncA();break;
		case 1:asyncB();break;
		case 2:asyncC();break;
		case 3:asyncD();break;
		case 4:asyncE();break;
		} }
     }
  }
  httpc.open("GET","/",true);
  httpc.send();
  for(var x in isAcitve) {
    if(isAcitve[x] == "active") {
	   isAcitve[x] = "wait";
	   var temp = document.getElementById(x);
	   temp.style["background-color"]="gray";
	   temp.onclick = free_();
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
		//document.getElementById("info").innerHTML += "D";
		count++;
		for(var x in isAcitve) {
		  if(isAcitve[x] == "wait") {
		    isAcitve[x] = "active";
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "blue";
	        switch(x) {
			case 'cira':temp.onclick = function(){asyncA();};break;
			case 'cirb':temp.onclick = function(){asyncB();};break;
			case 'circ':temp.onclick = function(){asyncC();};break;
			case 'cird':temp.onclick = function(){asyncD();};break;
			case 'cire':temp.onclick = function(){asyncE();};break;
			}
		  } else {
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "gray";
			temp.onclick = free_();
		  }
		}
		if(count == 5) {
		  var temp = document.getElementById("info-bar");
		  temp.style["background-color"] = "blue";
		  calculate();
		 }
        var i;
        i = idname[index++]; 
		if(count != 6) {
        switch(i) {
        case 0:asyncA();break;
		case 1:asyncB();break;
		case 2:asyncC();break;
		case 3:asyncD();break;
		case 4:asyncE();break;
		}	}	 
     }
  }
  httpd.open("GET","/",true);
  httpd.send();
  for(var x in isAcitve) {
    if(isAcitve[x] == "active") {
	   isAcitve[x] = "wait";
	   var temp = document.getElementById(x);
	   temp.style["background-color"]="gray";
	  temp.onclick = free_();
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
		//document.getElementById("info").innerHTML += "E";
		count++;
		for(var x in isAcitve) {
		  if(isAcitve[x] == "wait") {
		    isAcitve[x] = "active";
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "blue";
	        switch(x) {
			case 'cira':temp.onclick = function(){asyncA();};break;
			case 'cirb':temp.onclick = function(){asyncB();};break;
			case 'circ':temp.onclick = function(){asyncC();};break;
			case 'cird':temp.onclick = function(){asyncD();};break;
			case 'cire':temp.onclick = function(){asyncE();};break;
			}
		  } else {
		    var temp = document.getElementById(x);
	        temp.style["background-color"] = "gray";
			temp.onclick = free_();
		  }
		}
		if(count == 5) {
		  var temp = document.getElementById("info-bar");
		  temp.style["background-color"] = "blue";
		  calculate();
		 }
         var i;
        i = idname[index++]; 
		if(count != 6) {
        switch(i) {
        case 0:asyncA();break;
		case 1:asyncB();break;
		case 2:asyncC();break;
		case 3:asyncD();break;
		case 4:asyncE();break;
		} }		 
     }
  }
  httpe.open("GET","/",true);
  httpe.send();
  for(var x in isAcitve) {
    if(isAcitve[x] == "active") {
	   isAcitve[x] = "wait";
	   var temp = document.getElementById(x);
	   temp.style["background-color"]="gray";
	    temp.onclick = free_();
	}
  }
}


function calculate() {
  var cal = document.getElementById("info");
  document.getElementById("info").innerHTML += "<br>";
  cal.innerHTML += parseInt(random1.innerHTML) + parseInt(random2.innerHTML) +parseInt(random3.innerHTML) +parseInt(random4.innerHTML) + parseInt(random5.innerHTML);
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
  for(var x in order) {
    order[x] = true;
  }
  index = 0;
  count = 0;
  }
}