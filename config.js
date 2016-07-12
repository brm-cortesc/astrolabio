var config = {};

config.proxy = 'http://172.16.224.4:8080';
config.port = 5000;
config.env = 'dev';
config.base = require('fs').readFileSync('./data.json').toString();

//datos de shutter//
config.clientId = '750f60456a214f7f5bcb';
config.clientSecret = 'c335a827e42905324a9b6507e8e1dd71ba8dc9d3';
config.userSt = 'brmteam';
config.userStPass = 'brmdesc4rg4s';

module.exports = config;
