window.onload = function() {
	var rings = []

	var ev = document.createEvent('HTMLEvents');
	ev.initEvent('SumofRings_active', true, true);

	for(var i = 0; i < 5; i++) {
		rings.push(document.getElementById('ring' + i.toString()));
		rings[i].flag = 1;
		rings[i].onclick = get_number(rings, i, ev);
	}

	var SumofRings = document.getElementById('ring5');

	document.getElementById('part2').onmouseout = ring_reset(rings, SumofRings);

	SumofRings.addEventListener('SumofRings_active', function() {
		document.getElementById('ring5').className = 'active';
	}, false);

	SumofRings.onclick = get_sum;
	document.getElementById('image2').onclick = auto(rings, ev);
}

function auto(rings, ev) {
	return function() {
		get_number(rings, 4, ev, function() {})();
		get_number(rings, 3, ev, function() {})();
		get_number(rings, 2, ev, function() {})();
		get_number(rings, 1, ev, function() {})();
		get_number(rings, 0, ev, function() {})();
	};
}


function get_number(rings, i, ev, callback) {
	return function() {
		if(rings[i].flag == 0) return;

		rings[i].flag = 0;

		for (var j = 0; j < 5; j++) {
			if (j != i) rings[j].className = 'inactive';
		}

		var liring = document.createElement('span');
		liring.id = 'text' + i.toString();
		liring.innerHTML = '...';
		rings[i].appendChild(liring);
		number_from_server(liring, rings, ev, i, callback);
	};
}

function number_from_server(liring, rings, ev, i, callback) {
	var xmlhttp;

	if (window.XMLHttpRequest) {
	 	xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
	 	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	 		liring.innerHTML = xmlhttp.responseText;
	 		rings[i].className = 'inactive';
	 		var all_inactive = true;
	 		for (var j = 0; j < 5; j++) {
	 			if (document.getElementById('ring' + i.toString()).flag == 1) all_inactive = false;
	 		}
	 		if (all_inactive) {
	 			document.getElementById('ring5').dispatchEvent(ev);
	 			get_sum();
	 		}

	 		for (var j = 0; j < 5; j++) {
				if (rings[j].flag == 1) rings[j].className = 'active';
			}

			callback(rings, i, ev);
	 	}
	};

	xmlhttp.open("GET", "http://localhost:3000/" + "?randnum=" + Math.random(), true);
	xmlhttp.send();
}

function get_sum() {
	var SumofRings = document.getElementById('ring5');

	if (SumofRings.className == 'inactive') return;

	var sum = 0;

	for (var i = 0; i < 5; i++) {
		sum += parseInt(document.getElementById('text' + i.toString()).innerHTML);
	}

	SumofRings.innerHTML = sum.toString();
}

function ring_reset(rings, SumofRings) {
	return function() {
		for (var i = 0; i < 5; i++) {
			if (document.getElementById('text' + i.toString()) != null)
				rings[i].removeChild(document.getElementById('text' + i.toString()));
			rings[i].className = 'active';
			rings[i].flag = 1;
		}

		SumofRings.innerHTML = '';
		SumofRings.className = 'inactive';
	};
}
