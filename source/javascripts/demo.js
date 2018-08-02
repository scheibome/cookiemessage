function resetCookie() {
	'use strict';
	var d = new Date();
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
	document.cookie = window.location.hostname + '=' + '' + ';path=/;expires=' + d.toGMTString();
	window.location.reload(true);
}

document.getElementById('cookiemessage').cookiemessage({
	lifetime: 1
});
