
var environments = {};

environments.staging = {
	'port' : 3000,
	'envName': 'staging'
};

environments.production = {
	'port' : 4000,
	'envName' : 'production'
};

var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : '';

var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;