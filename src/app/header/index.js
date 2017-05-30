const Header = document.getElementsByClassName('container-header')[0];


module.exports = function header (ctx, next) {

	Header.classList.remove('hidden');

	next();
  
};