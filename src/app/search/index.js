const shutterstock = require('shutterstock');

const Api = shutterstock.v2({
	clientId: '750f60456a214f7f5bcb',
	clientSecret: 'c335a827e42905324a9b6507e8e1dd71ba8dc9d3',

});



module.exports = {
	api: Api
}