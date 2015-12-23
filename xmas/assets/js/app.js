$(function() {
	// force redirect to #/
	if (window.location.href.indexOf('#') == -1) {
		window.location.href = _.trim(window.location.href, '/') + '/#/';
	}
});
