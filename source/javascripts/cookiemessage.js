Element.prototype.cookiemessage = function(settings) {
	var settings = settings || '';
	var cookiemessagebar = this;
	var cookieName = window.location.hostname;
	var cookieMessageSwitchClassname = 'cookiemessage--loaded';
	var bodyCookieMessageSwitchClassname = 'cookiemessageloaded';
	var cookieLifetime = settings.lifetime || 365; // in days
	var button = settings.button || document.getElementById('cookiemessagebutton');

	var setBodyBottomPadding = function() {
		document.body.classList.add(bodyCookieMessageSwitchClassname);
		document.body.setAttribute('style', 'padding-bottom: ' + cookiemessagebar.offsetHeight + 'px;');
	};

	var removeBodyBottomPadding = function() {
		document.body.removeAttribute('style');
	};

	var checkCookie = function(name) {
		var value = '; ' + document.cookie;
		var parts = value.split('; ' + name + '=');
		if (2 === parts.length) {
			return parts.pop().split(';').shift();
		}
		return false;
	};

	var setCookie = function(name, value, days) {
		var d = new Date();
		d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
		document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString();
		removeBodyBottomPadding();
	};

	if (!checkCookie(cookieName)) {
		cookiemessagebar.classList.add(cookieMessageSwitchClassname);
		button.addEventListener('click', function() {
			setCookie(cookieName, 'hide', cookieLifetime);
			cookiemessagebar.classList.remove(cookieMessageSwitchClassname);
		});
		setBodyBottomPadding();
	}
};
