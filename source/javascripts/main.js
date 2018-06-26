/**
 * Initialize modules & plugins - Read http://requirejs.org/
 */
(function(requirejs) {
	'use strict';

	// require configuration
	requirejs.config({
		urlArgs: '1522318445244',
		baseUrl: 'javascripts'
	});

	var $cookiemessagebar = document.getElementById('cookiemessage');
	if ($cookiemessagebar) {
		requirejs(['cookiemessage']);
	}
})(requirejs);
