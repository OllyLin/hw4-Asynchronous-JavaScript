window.onload = function ()
{
	var apc = document.getElementById("at-plus-container");
	apc.addEventListener('mouseenter', initial);
}

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
	
	var infoBar =  document.getElementById("info-bar");
	infoBar.style.backgroundColor = "rgba(0,0,10,.4)";
	infoBar.onclick = null;
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
			that.innerHTML = that.innerHTML.replace("...", req.responseText)
			that.style.backgroundColor = "rgba(0,0,10,.4)";
			that.onclick = null;
			allClicked();
		}
	}
	req.send();
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
		infoBar.onclick = sumUp;
		infoBar.style.backgroundColor = "blue";
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
	this.style.backgroundColor = "rgba(0,0,10,.4)";
}
