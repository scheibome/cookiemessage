Element.prototype.cookiemessage = function(settings) {
	var settings = settings || '';
	var cookiemessagebar = this;
	var cookieName = window.location.hostname;
	var cookieMessageSwitchClassname = 'cookiemessage--loaded';
	var bodyCookieMessageSwitchClassname = 'cookiemessageloaded';
	var cookieLifetime = settings.lifetime || 365; // in days
	var button = settings.button || document.getElementById('cookiemessagebutton');
	var position = settings.position || 'bottom-right';
	var palette = settings.palette || '';

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

	var setPositionClasses = function(element, position) {
		switch (position) {
			case 'bottom': {
				element.classList.add('cookiemessage--bar');
				element.classList.add('cookiemessage--b');
				break;
			}
			case 'bottom-left': {
				element.classList.add('cookiemessage--window');
				element.classList.add('cookiemessage--bl');
				break;
			}
			default: {
				element.classList.add('cookiemessage--window');
				element.classList.add('cookiemessage--br');
			}
		}
	};

	var setPaletteColors = function(element, button, palette) {
		if ('undefined' !== typeof palette.message) {
			if ('undefined' !== typeof palette.message.background) {
				element.style.backgroundColor = palette.message.background;
			}

			if ('undefined' !== typeof palette.message.text) {
				element.style.color = palette.message.text;
			}
		}

		if ('undefined' !== typeof palette.button) {
			if ('undefined' !== typeof palette.button.background) {
				button.style.backgroundColor = palette.button.background;
			}

			if ('undefined' !== typeof palette.button.text) {
				button.style.color = palette.button.text;
			}
		}
	};

	var errorCheck = function(button) {
		if ('undefined' === typeof button || null === button) {
			alert('The cookiebar button is not define! Please check your markup or your javascript settings');
		}
	};

	if (!checkCookie(cookieName)) {
		errorCheck(button);
		if ('' !== palette) {
			setPaletteColors(cookiemessagebar, button, palette);
		}
		setPositionClasses(cookiemessagebar, position);
		cookiemessagebar.classList.add(cookieMessageSwitchClassname);
		button.classList.add('cookiemessage__btn');
		button.addEventListener('click', function() {
			setCookie(cookieName, 'hide', cookieLifetime);
			cookiemessagebar.classList.remove(cookieMessageSwitchClassname);
		});
		setBodyBottomPadding();
	}
};
