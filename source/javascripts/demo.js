var messageElement = document.getElementById('cookiemessage');

function resetCookie() {
	'use strict';
	var d = new Date();
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
	document.cookie = window.location.hostname + '=' + '' + ';path=/;expires=' + d.toGMTString();
	window.location.reload(true);
}

function setDemoPosition(setPosition) {
	'use strict';
	messageElement.removeAttribute('class');
	messageElement.classList.add('cookiemessage');
	messageElement.cookiemessage({
		lifetime: 1,
		position: setPosition
	});
}

messageElement.cookiemessage({
	lifetime: 1
});
