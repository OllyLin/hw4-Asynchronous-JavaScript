var judge = [false,false,false,false,false];

window.onload = function() {
  document.getElementById("unread1").style.opacity = 0;//先将红色小圆圈隐形
  document.getElementById("unread2").style.opacity = 0;
  document.getElementById("unread3").style.opacity = 0;
  document.getElementById("unread4").style.opacity = 0;
  document.getElementById("unread5").style.opacity = 0;
 
  

  document.getElementById("icon").onclick = Robort;
//鼠标移开以后复原
  document.getElementById("icon").onmouseout = returnBack;

};

function Robort(){//自动执行程序
  var idname = ["mask", "history", "message", "setting", "sign"];

  var arr = [1,2,3,4,5];
  var ret = [],
  i = arr.length, n;
  arr = arr.slice(0);
  while (--i >= 0) {
      n = Math.floor( Math.random() * i);
      ret[ret.length] = arr[n];
      arr[n] = arr[i];
  }
  
  var x = ret[0];
  getRadomNumber(x, idname[ x - 1 ]);
  x = ret[1];
  setTimeout(function(){getRadomNumber(x, idname[ x - 1 ])},3500);
  x = ret[2];
  setTimeout(function(){ getRadomNumber(x, idname[ x - 1 ])},7000);
  x = ret[3];
  setTimeout(function(){getRadomNumber(x, idname[ x - 1 ])},10500);
  x = ret[4];
  setTimeout(function(){getRadomNumber(x, idname[ x - 1 ])},14000);

  setTimeout(function(){calculate();},17500);

}

function getRadomNumber(x, idn) {

  if(judge[x-1])
    return;
  
  document.getElementById("unread"+x).style.opacity = 1;//出现红色小圆圈

  var idname = ["mask", "history", "message", "setting", "sign"];
  var i;
  for(i = 0; i < 5; i ++)//其他圆圈变成灰色
  {
    if(idname[i] == idn)
      continue;
    document.getElementById(idname[i]).style.backgroundColor = 'gray';
  }

  getRandomNum(x,idn);//得到随机数
  
  setTimeout(function(){//判断并修改颜色
    if(document.getElementById("unread"+x).innerHTML != "...")
    {
      document.getElementById(idn).style.backgroundColor = 'gray';
      for(i = 0; i < 5; i ++)
     {
        if(idname[i] == idn)
         continue;
        if(judge[i])
         continue;
       document.getElementById(idname[i]).style.backgroundColor =  '#000099';
      }
    }
  }, 3000);

  judge[x-1]=true;


  var sum=0;//判断是否所有按钮都被点击了
  for(i = 0; i < 5; i ++)
  {
    if(judge[i])
      sum ++;
  }
  if(sum == 5)
    document.getElementById("page").style.backgroundColor = '#000099';
}




function getRandomNum(x,idn) {//得到随机数
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } 
  else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
         document.getElementById("unread"+x).innerHTML = xmlhttp.responseText;
      }
    }
  xmlhttp.open("GET","/",true);
  xmlhttp.send();
  
}

function calculate()//求和，转换颜色
{
  var sum = 0;
  
  sum += parseInt(document.getElementById("unread1").innerHTML);
  sum += parseInt(document.getElementById("unread2").innerHTML);
  sum += parseInt(document.getElementById("unread3").innerHTML);
  sum += parseInt(document.getElementById("unread4").innerHTML);
  sum += parseInt(document.getElementById("unread5").innerHTML);

  
  document.getElementById("sum").innerHTML = sum;
  document.getElementById("page").style.backgroundColor = "gray";
}


function returnBack(){//鼠标离开后将所有状态复原
  var i;
  for(i = 1; i <= 5; i ++)
  {
    document.getElementById("unread"+i).style.opacity = 0;
    document.getElementById("unread"+i).innerHTML = "...";
  }


  document.getElementById("mask").style.backgroundColor = '#000099';
  document.getElementById("history").style.backgroundColor = '#000099';
  document.getElementById("message").style.backgroundColor = '#000099';
  document.getElementById("setting").style.backgroundColor = '#000099';
  document.getElementById("sign").style.backgroundColor = '#000099';

  

  document.getElementById("page").style.backgroundColor = 'gray';

  document.getElementById("sum").innerHTML = ' ';
  judge = [false,false,false,false,false];

}
