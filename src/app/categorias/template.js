const yo = require('yo-yo');
const layout = require('../layout');

module.exports = function (seccion, text) {
	
	let el = yo`${text}`;

	return layout(seccion, el);
};