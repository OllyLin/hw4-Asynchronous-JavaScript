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
  getRadomNumber(1,"mask");
  
  getRadomNumber(2,"history");

  getRadomNumber(3,"message");
 
  getRadomNumber(4,"setting");
  
  getRadomNumber(5,"sign");

  setTimeout(function(){calculate();},11000);
  

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
