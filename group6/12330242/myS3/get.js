//  used for changed the state of all "li" and "button"
//  all statues can be reset normally after all operator over

function changeBackground(liPos, index, status) {
	if (status == 0) {
		for (var i = 0; i < liPos.length; i++) {
			if (i == index) {
				liPos[i].style.backgroundColor = "blue";
			} else {
				liPos[i].style.backgroundColor = "gray";
			}
		}
	} else if (status == 1) {
		for (var i = 0; i < liPos.length; i++) {
			if (i == index) {
				liPos[i].style.backgroundColor = "gray";
			} else {
				liPos[i].style.backgroundColor = "blue";
			}
		}
	}
}


//  for ajax , learn online
var XMLHttp = { 
    _objPool: [], 

    _getInstance: function () 
    { 
        for (var i = 0; i < this._objPool.length; i ++) 
        { 
            if (this._objPool[i].readyState == 0 || this._objPool[i].readyState == 4) 
            { 
                return this._objPool[i]; 
            } 
        } 

        // IE5中不支持push方法 
        this._objPool[this._objPool.length] = this._createObj(); 

        return this._objPool[this._objPool.length - 1]; 
    }, 

    _createObj: function () 
    { 
        if (window.XMLHttpRequest) 
        { 
            var objXMLHttp = new XMLHttpRequest(); 

        } 
        else 
        { 
            var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP']; 
            for(var n = 0; n < MSXML.length; n ++) 
            { 
                try 
                { 
                    var objXMLHttp = new ActiveXObject(MSXML[n]); 
                    break; 
                } 
                catch(e) 
                { 
                } 
            } 
         }           

        // mozilla某些版本没有readyState属性 
        if (objXMLHttp.readyState == null) 
        { 
            objXMLHttp.readyState = 0; 

            objXMLHttp.addEventListener("load", function () 
                { 
                    objXMLHttp.readyState = 4; 

                    if (typeof objXMLHttp.onreadystatechange == "function") 
                    { 
                        objXMLHttp.onreadystatechange(); 
                    } 
                },  false); 
        } 

        return objXMLHttp; 
    }, 

    // 发送请求(方法[post,get], 地址, 数据, 回调函数) 
    sendReq: function (method, url, data, callback) 
    { 
        var objXMLHttp = this._getInstance(); 

        with(objXMLHttp) 
        { 
            try 
            { 
                // 加随机数防止缓存 
                if (url.indexOf("?") > 0) 
                { 
                    url += "&randnum=" + Math.random(); 
                } 
                else 
                { 
                    url += "?randnum=" + Math.random(); 
                } 

                open(method, url, true); 

                // 设定请求编码方式 
                setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'); 
                send(data); 
                onreadystatechange = function () 
                { 
                    if (objXMLHttp.readyState == 4 && (objXMLHttp.status == 200 || objXMLHttp.status == 304)) 
                    { 

                        callback(objXMLHttp.responseText); 
                    } 
                } 
            }
            catch(e) 
            {
                alert(e); 
            }
        }
    }
};

function ajax(url, successfunction, failfunction) {
	XMLHttp.sendReq('GET', url, '', successfunction);
}

window.onload = function () {
	var liPos      = document.getElementById("control-ring").getElementsByTagName("li");
	var spanPos    = document.getElementById("control-ring").getElementsByTagName("span");
	var sumPos     = document.getElementById("info-bar").getElementsByTagName("div")[0];
	var times = 0;

	var ButtonModel = 0;
	var extendPos = document.getElementById("extend");
	var buttonPos = document.getElementById("button");
	var flag;

	// for mouse out @+
	for (var i = 0; i < liPos.length; i++) {
		liPos[i].onmouseover = function () {
			flag = 1;
		}

		liPos[i].onmouseout = function () {
			flag = 0;
		}
	}
	sumPos.onmouseover = function () {
		flag = 1;
	}
	sumPos.onmouseout = function () {
		flag = 0;
	}
	buttonPos.onmouseover = function () {
		flag = 1;
	}
	buttonPos.onmouseout = function () {
		flag = 0;
	}

	extendPos.onmouseout = function() {
		setTimeout(function () {
			if (flag == 1) return;
			// reset
			for (var i = 0; i < spanPos.length; i++) {
				spanPos[i].style.display = "none";
			}
			changeBackground(liPos, liPos.length+1, 1);
			sumPos.style.backgroundColor = "gray";
			sumPos.innerHTML = "";
			times = 0;
		}, 0);
	}

	// initial
	changeBackground(liPos, liPos.length+1, 1);


	sumPos.onclick = function (ev) {
		var oEvent = ev || event;
		oEvent.cancelBubble = true;
		if (sumPos.style.backgroundColor != "blue") return;
		var sum = 0;
		for (var i = 0; i < spanPos.length; i++) {
			sum = sum + Number(spanPos[i].innerHTML);
		}
		sumPos.innerHTML = sum;
		sumPos.style.backgroundColor = "gray";
		changeBackground(liPos, liPos.length+1, 1);
	};

	buttonPos.onclick = function () {
		ButtonModel = 1;
		for (var i = 0; i < liPos.length; i++) {
			liPos[i].onclick();
		}
	}

	// for click event
	for (var i = 0; i < liPos.length; i++) {
		liPos[i].clicked = 0;
		liPos[i].onclick = function(i) {
			return function (ev) {
				var oEvent = ev || event;
				oEvent.cancelBubble = true;
				if (this.style.backgroundColor == "gray") return;

				var that = this;
				spanPos[i].style.display = "block";
				spanPos[i].innerHTML = "...";

				// 
				ajax("http://localhost:3000", function(returnNum) {
					spanPos[i].innerHTML = returnNum;
					liPos[i].style.backgroundColor = "gray";
					if (that.clicked == 0) times++;
					if (times == liPos.length) {
						sumPos.style.backgroundColor = "blue";
						if (ButtonModel == 1) {
							sumPos.onclick();
							ButtonModel = 0;
						}
					}
				}, function () {
					// function for fail state
				});
			}
		}(i);
	}

	
}
