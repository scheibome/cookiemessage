var cookieName = window.location.hostname;
var cookieMessageSwitchClassname = 'cookiemessage--loaded';
var bodyCookieMessageSwitchClassname = 'cookiemessageloaded';
var cookieLifetime = 365; // in days
var $cookieMessagebar = document.getElementById('cookiemessage');
var $cookieMessageButton = document.getElementById('cookiemessagebutton');

function setBodyBottomPadding() {
	document.body.classList.add(bodyCookieMessageSwitchClassname);
	document.body.setAttribute('style', 'padding-bottom: ' + $cookieMessagebar.offsetHeight + 'px;');
}

function removeBodyBottomPadding() {
	document.body.removeAttribute('style');
}

function checkCookie(name) {
	var value = '; ' + document.cookie;
	var parts = value.split('; ' + name + '=');
	if (2 === parts.length) {
		return parts.pop().split(';').shift();
	}
	return false;
}

function setCookie(name, value, days) {
	var d = new Date();
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
	document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString();
	removeBodyBottomPadding();
}

if (!checkCookie(cookieName)) {
	$cookieMessagebar.classList.add(cookieMessageSwitchClassname);
	$cookieMessageButton.addEventListener('click', function() {
		setCookie(cookieName, 'hide', cookieLifetime);
		$cookieMessagebar.classList.remove(cookieMessageSwitchClassname);
	});
	setBodyBottomPadding();
}
