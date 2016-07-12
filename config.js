var config = {};

config.port = 5000;
config.env = 'dev';
config.base = require('fs').readFileSync('./data.json').toString();

module.exports = config;
