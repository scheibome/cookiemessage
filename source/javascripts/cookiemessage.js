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
	var pushBodyIsSet = ('undefined' === typeof settings.pushbody) ? false : settings.pushbody;

	/**
	 * Adds the push class to body, adds height from the element as inline style
	 * and save the original padding as data attribute
	 *
	 * @param {String} position
	 */
	var pushBody = function(position) {
		document.body.classList.add(bodyCookieMessageSwitchClassname);
		var pushDirection;

		if ('top' === position || 'top-left' === position || 'top-right' === position) {
			pushDirection = 'padding-top';
		} else {
			pushDirection = 'padding-bottom';
		}

		var originalPadding = window.getComputedStyle(document.body, null).getPropertyValue(pushDirection);
		originalPadding = parseInt(originalPadding.split('px')[0]);
		document.body.setAttribute('data-cookiemessagepadding', originalPadding);

		setTimeout(function() {
			document.body.setAttribute('style', pushDirection + ': ' + (originalPadding + cookiemessagebar.offsetHeight) + 'px;');
		}, 500);
	};

	/**
	 * Remove the padding from the pushed option
	 */
	var removeBodyPadding = function() {
		document.body.removeAttribute('style');
	};

	/**
	 * Checks if the cookie isset
	 *
	 * @param {String} name
	 * @returns {*}
	 */
	var checkCookie = function(name) {
		var value = '; ' + document.cookie;
		var parts = value.split('; ' + name + '=');
		if (2 === parts.length) {
			return parts.pop().split(';').shift();
		}
		return false;
	};

	/**
	 * Set the cookie and remove the padding from the body
	 *
	 * @param {String} name
	 * @param {String} value
	 * @param {Number} days
	 */
	var setCookie = function(name, value, days, position) {
		console.log(position);
		// element.style.width = null;
		var d = new Date();
		d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
		document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString();
		removeBodyPadding();
	};

	/**
	 * Set the classes for the positioning
	 *
	 * @param {Object} element
	 * @param {String} position
	 */
	var setPositionClasses = function(element, position) {
		switch (position) {
			case 'bottom': {
				element.classList.add('cookiemessage--bar');
				element.classList.add('cookiemessage--b');
				element.classList.add('cookiemessage--pb');
				break;
			}
			case 'bottom-left': {
				element.classList.add('cookiemessage--window');
				element.classList.add('cookiemessage--bl');
				element.classList.add('cookiemessage--pb');
				break;
			}
			case 'top': {
				element.classList.add('cookiemessage--bar');
				element.classList.add('cookiemessage--t');
				element.classList.add('cookiemessage--pt');
				break;
			}
			case 'top-left': {
				element.classList.add('cookiemessage--window');
				element.classList.add('cookiemessage--tl');
				element.classList.add('cookiemessage--pt');
				break;
			}
			case 'top-right': {
				element.classList.add('cookiemessage--window');
				element.classList.add('cookiemessage--tr');
				element.classList.add('cookiemessage--pt');
				break;
			}
			default: {
				element.classList.add('cookiemessage--window');
				element.classList.add('cookiemessage--br');
				element.classList.add('cookiemessage--pb');
			}
		}
	};

	/**
	 * Sets the passed styles for the elements as inlinestyles
	 *
	 * @param {Object} element
	 * @param {Object} button
	 * @param {Object} palette
	 */
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

	/**
	 * checks if the button element is set, otherwise an error message is displayed
	 *
	 * @param {Object} button
	 */
	var errorCheck = function(button) {
		if ('undefined' === typeof button || null === button) {
			var message = 'The cookiebar button is not defined! Please check your markup or your javascript settings';
			console.error(message);
			alert(message);
		}
	};

	if (!checkCookie(cookieName)) {
		errorCheck(button);
		if ('' !== palette) {
			setPaletteColors(cookiemessagebar, button, palette);
		}
		setPositionClasses(cookiemessagebar, position);
		setTimeout(function() {
			cookiemessagebar.classList.add(cookieMessageSwitchClassname);
		}, 500);
		button.classList.add('cookiemessage__btn');
		button.addEventListener('click', function() {
			setCookie(cookieName, 'hide', cookieLifetime, position);
			cookiemessagebar.classList.remove(cookieMessageSwitchClassname);
		});
		if (true === pushBodyIsSet) {
			pushBody(position);
		}
	}
};
