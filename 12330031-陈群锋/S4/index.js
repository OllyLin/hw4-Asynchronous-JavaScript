var smallBubble = document.getElementById('control-ring')
					 	  .getElementsByTagName('li');
var bigBubble = document.getElementById('info-bar');
var button = document.getElementById('clickBtn');
var flag = true;
button.onclick=function(e){
	btnClick();
}
function btnClick(){
	if (flag) {
		btnPositive();
		flag = false;
	}else {
		btnNegtive();
		flag = true;
	}
}
function btnPositive(){
	positiveHover();
	attachClickEvent();
}

function btnNegtive(){
	negtiveHover();
	deleteClickEvent();
}

function positiveHover(){
	for (var i = 0; i < smallBubble.length; i++) {
		smallBubble[i].addClass('buttonHover');
		if (smallBubble[i].hasClass("mask")) {
			smallBubble[i].addClass('maskHover');
		}
		else if (smallBubble[i].hasClass("history")) smallBubble[i].addClass('historyHover');
		else if (smallBubble[i].hasClass("message")) smallBubble[i].addClass('messageHover');
		else if (smallBubble[i].hasClass("setting")) smallBubble[i].addClass('settingHover');
		else if (smallBubble[i].hasClass("sign")) smallBubble[i].addClass('signHover');
	}
	bigBubble.addClass('info_barHover');
	button.addClass('apbHover');
	button.children[0].addClass('iconHover');
}

function negtiveHover(){
	//clear smallBubble style
	for (var i = 0; i < smallBubble.length; i++) {
		var temp = smallBubble[i];
		if (temp.children[0]) temp.children[0].remove();
		if (temp.hasClass("mask")) temp.removeClass('maskHover');
		if (temp.hasClass("history")) temp.removeClass('historyHover');
		if (temp.hasClass("message")) temp.removeClass('messageHover');
		if (temp.hasClass("setting")) temp.removeClass('settingHover');
		if (temp.hasClass("sign")) temp.removeClass('signHover');
		if (temp.hasClass('disabled')) temp.removeClass('disabled')
		if (temp.hasClass('gray')) temp.removeClass('gray');
		if (temp.hasClass('buttonHover')) temp.removeClass('buttonHover');
	}
	//clear bigBubble style
	if (bigBubble) {
		if (bigBubble.hasClass('info_barHover')) bigBubble.removeClass('info_barHover');
		if(bigBubble.hasClass('enabled')) {
			bigBubble.removeClass('enabled');
			bigBubble.addClass('disabled');
		}
		bigBubble.children[0].children[0].innerHTML = "";
	}
	//clear @ style
	button.removeClass('apbHover');
	button.children[0].removeClass('iconHover');
}

function attachClickEvent(){
	//attach click event to 'smallBubble'
	for(var i = 0; i < smallBubble.length; i++){
		smallBubble[i].onclick=function(i){
			return function(){
				smallBubbles(i);
			}
		}(i);
	}
	//attach click event to 'bigBubbble'
	bigBubble.onclick=function(){
		bigBubbles(this);
	}
}

function deleteClickEvent(){
	//clear smallBubble style
	for (var i = 0; i < smallBubble.length; i++) {
		var temp = smallBubble[i];
		temp.onclick = null;
	}
	//clear bigBubble style
	if (bigBubble) {
		bigBubble.onclick = null;
	}
}

function enabled(that){
	var rest = 0;
	for (var i = 0; i < smallBubble.length; i++) {
		var disLi = smallBubble[i];
		if (that != disLi) {
			if (!disLi.hasClass('gray')) {
				disLi.removeClass('disabled');
				rest++;
			}
		}
	}
	if (!rest){
		var bigBubble = document.getElementById('info-bar');
		bigBubble.removeClass('disabled');
		bigBubble.addClass('enabled');
		bigBubble.onclick();
	}
}

function smallBubbles(i){
	var currentLi = smallBubble[i];
	if (!currentLi.hasClass('disabled') || !currentLi.hasClass('gray')) {
		//disabled other small bullbles
		for (var j = 0; j < smallBubble.length; j++){
			if (j != i && !smallBubble[j].hasClass('gray'))
				smallBubble[j].addClass('disabled');
		}
		//create a span node
		var child = document.createElement('span');
		child.setAttribute('class', 'unread');
		child.innerHTML = '...';
		currentLi.appendChild(child);
		//create ajax object and get data from server
		ajaxRequest.call(smallBubble[i], '/');
		currentLi.onclick = null;
	}
}

function bigBubbles(that){
	if (!that.hasClass('disabled')) {
		var sum = 0;
		for (var i = 0; i < smallBubble.length; i++) {
			sum += smallBubble[i].children[0].innerHTML * 1;
		}
		that.children[0].children[0].innerHTML = sum;
	}
}

function ajaxRequest(url){
	if (url) {
		var xml;
		var that = this;

		//if it is chorme
		if (window.XMLHttpRequest) {
			xml = new XMLHttpRequest();
		}
		//if it is ie...
		else {
			xml = ActiveXObject("Microsofe.XMLHTTP");
		}
		xml.open('GET',url,true);
		xml.send(null);
		xml.onreadystatechange=function(){
			if (xml.readyState == 4) {
				var returnVal = xml.responseText;
				if (that) {
					var current = that.getElementsByTagName('span')[0];
					current.innerHTML = returnVal;
					that.addClass('gray');
					if (count < 5)
						smallBubble[random[count++] - 1].onclick();
					enabled(that);
				}
			}

		}
	}
}

Object.prototype.hasClass=function(classname){
	return this.className.match(new RegExp('(\\s|^)' + classname + '(\\s|$)'));
}

Object.prototype.addClass=function(classname){
	if (classname)
		this.className += ' ' + classname;
}

Object.prototype.removeClass=function(classname){
	if (classname) {
		var reg = new RegExp('(\\s|^)' + classname + '(\\s|$)');
	    this.className = this.className.replace(reg, ' ');
	}
}

function getRandomSeq(){
	var seq = [1,2,3,4,5];
	var result = [];
	for (var i = 5; i > 0; i--) {
		var  temp = [];
		var now = Math.floor(Math.random()*i+1);
		result.push(seq[now-1]);
		seq[now-1] = 0;
		for (var j = 0; j < seq.length; j++) {
			if (seq[j] != 0) {
				temp.push(seq[j]);
			}
		}
		seq = temp;
	}
	var convert = "";
	for (var i = 0; i < result.length; i++) {
		if (result[i] == 1) convert += '-A';
		else if (result[i] == 2) convert += '-B';
		else if (result[i] == 3) convert += '-C';
		else if (result[i] == 4) convert += '-D';
		else if (result[i] == 5) convert += '-E';
	}
	document.getElementById('seq').innerHTML = convert;
	return result;
}
var random = getRandomSeq();
var count = 0;
function aFingerRebort(){
	button.onclick();
	smallBubble[random[count++] - 1].onclick();
}
window.onload=function(){
	
	aFingerRebort();
}