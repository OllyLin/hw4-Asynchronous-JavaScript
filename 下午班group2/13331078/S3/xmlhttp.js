/* XMLHttp pool */

var XMLHttp = {
    _objPool: [],

    _getInstance: function () {
        for (var i = 0; i < this._objPool.length; ++i) {
            if (this._objPool[i].readyState == 0 || this._objPool[i].readyState == 4) {
                return this._objPool[i];
            }
        }
        
        this._objPool[this._objPool.length] = this._createObj();

        return this._objPool[this._objPool.length - 1];
    },

    _createObj: function () {
        if (window.XMLHttpRequest) {
            var objXMLHttp = new XMLHttpRequest();
        } else {
            var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
            for(var n = 0; n < MSXML.length; n ++) {
                try {
                    var objXMLHttp = new ActiveXObject(MSXML[n]);
                    break;
                }
                catch(e) {
                }
            }
        }

        if (objXMLHttp.readyState == null) {
            objXMLHttp.readyState = 0;
            objXMLHttp.addEventListener("load", function () {
                    objXMLHttp.readyState = 4;
                    if (typeof objXMLHttp.onreadystatechange == "function") {
                        objXMLHttp.onreadystatechange();
                    }
                }, false);
        }
        return objXMLHttp;
    },

    // 发送请求(方法[post,get], 地址, 数据, 回调函数)
    sendReq: function (method, url, data, callback) {
        var objXMLHttp = this._getInstance();
        with(objXMLHttp) {
            try {
                // 加随机数防止缓存
                if (url.indexOf("?") > 0) {
                    url += "&randnum=" + Math.random();
                } else {
                    url += "?randnum=" + Math.random();
                }

                open(method, url, true);

                // 设定请求编码方式
                setRequestHeader('Content-Type', 'text/plain');
                send(data);
                onreadystatechange = function () {
                    if (objXMLHttp.readyState == 4 && (objXMLHttp.status == 200 || objXMLHttp.status == 304)) {
                        callback(objXMLHttp.responseText);
                    }
                }
            }
            catch(e) {
                alert(e);
            }
        }
    }
};
