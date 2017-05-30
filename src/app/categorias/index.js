const page = require('page');
const yo = require('yo-yo');
const header = require('../header');
const search = require('../search');
const template = require('./template');

page('/categorias', header, search, (ctx, next) =>{

	let titulo = '<h1> categorías </h1>';

	const ele = document.getElementById('container');


	ele.innerHTML = '';
	ele.appendChild(template('categoria', titulo));

	console.log('managin template with var');

});