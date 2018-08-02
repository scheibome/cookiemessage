function resetCookie() {
	setBodyBottomPadding();
	var d = new Date();
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
	document.cookie = cookieName + '=' + '' + ';path=/;expires=' + d.toGMTString();
	$cookieMessagebar.classList.add(cookieMessageSwitchClassname);
}

document.getElementById('cookiemessage').cookiemessage({
	lifetime: 1
});
