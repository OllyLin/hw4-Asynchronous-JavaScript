window.onload = function ()
{
	var apc = document.getElementById("at-plus-container");
	apc.addEventListener('mouseenter', initial);
}
var arr = [0,1,2,3,4];
function initial()
{
	var button = document.getElementsByClassName("button");
	button[0].innerHTML = "<span>A</span>";
	button[1].innerHTML = "<span>B</span>";
	button[2].innerHTML = "<span>C</span>";
	button[3].innerHTML = "<span>D</span>";
	button[4].innerHTML = "<span>E</span>";
	for (var i=0; i<button.length; i++)
	{
		button[i].style.backgroundColor = "blue";
		button[i].onclick = getNum;
	}
	
	var sum = document.getElementById("sum");
	sum.innerHTML = "";
	
	var infoBar = document.getElementById("info-bar");
	infoBar.style.backgroundColor = "rgba(0,0,10,.4)";
	infoBar.onclick = null;
	
	var apb = document.getElementsByClassName("apb")[0];
	apb.onclick = function()
	{	
		order = randomArray();
		console.log(order);
		getAllNumInRandom(0);
	}
}

function getNum()
{
	this.innerHTML = this.innerHTML + "<span class='redNum'>...</span>";
	var button = document.getElementsByClassName("button");
	var that = this;
	for (var i = 0; i < button.length; i++)
	{
		if (button[i] == that)
			continue;
		else
			button[i].style.backgroundColor = "rgba(0,0,10,.4)";
	}
	var req = new XMLHttpRequest();
	req.open("GET","/",true);
	req.onreadystatechange = function()
	{
		if (req.readyState==4 && req.status==200)
		{
			that.innerHTML = that.innerHTML.replace("...", req.responseText);
			that.style.backgroundColor = "rgba(0,0,10,.4)";
			that.onclick = null;
			allClicked();
		}
	}
	req.send();
}

function getAllNumInRandom(index)
{
	if (arr[index] < 5)
	{
		var button = document.getElementsByClassName("button");
		
		button[arr[index]].innerHTML = button[arr[index]].innerHTML + "<span class='redNum'>...</span>";
		for (var i = 0; i < button.length; i++)
			button[i].style.backgroundColor = "rgba(0,0,10,.4)";
		button[arr[index]].style.backgroundColor = "blue";
		
		var req = new XMLHttpRequest();
		req.open("GET","/",true);
		req.onreadystatechange = function()
		{
			if (req.readyState==4 && req.status==200)
			{
				button[arr[index]].innerHTML = button[arr[index]].innerHTML.replace("...", req.responseText);
				button[arr[index]].style.backgroundColor = "rgba(0,0,10,.4)";
				console.log(button[arr[index]]);
				button[arr[index]].onclick = null;
				if (getAllNumInRandom(++index))
				{
					var infoBar =  document.getElementById("info-bar");
					infoBar.style.backgroundColor = "blue";
					sumUp();
				}
			}
		}
		req.send();
		return false;
	}
	return true;
}

function allClicked()
{
	var button = document.getElementsByClassName("button");
	var flag = true;
	
	for (var i = 0 ; i < button.length; i++)
	{
		if(button[i].onclick != null)
		{
			button[i].style.backgroundColor = "blue";
			flag = false;
		}
	}
	if (flag)
	{
		var infoBar =  document.getElementById("info-bar");
		infoBar.style.backgroundColor = "blue";
		infoBar.onclick = sumUp;
	}
}

function sumUp()
{
	var button = document.getElementsByClassName("button");
	var count = 0;
	for (var i = 0; i < button.length; i++)
	{
		var tmp = button[i].getElementsByClassName("redNum")[0].innerHTML;
		count += parseInt(tmp);
	}
	var sum = document.getElementById("sum");
	sum.innerHTML = count;
	var infoBar =  document.getElementById("info-bar");
	infoBar.style.backgroundColor = "rgba(0,0,10,.4)";
}

function randomArray()
{
	arr = arr.sort(function(){
		return  Math.random()>.5 ? -1 : 1;
	});
	var order = "";
	for(var i=0; i<arr.length; i++)
	{
		if (i)
			order += "、"
		if(arr[i] == 0)
			order += "A";
		if(arr[i] == 1)
			order += "B";
		if(arr[i] == 2)
			order += "C";
		if(arr[i] == 3)
			order += "D";
		if(arr[i] == 4)
			order += "E";
	}
	console.log(order);
	document.getElementById("order").innerHTML = order;
	return arr;
}