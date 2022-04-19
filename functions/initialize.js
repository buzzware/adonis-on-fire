var firebaseSdk = require('firebase');
var fs = require('fs');
var path = require('path');
const argv = require('yargs').argv;

// Required for side-effects
require("firebase/firestore");
var adminSdk = require('firebase-admin');
const functions = require('firebase-functions');

var FirebaseExtraAdmin = require("firebase-extra/dist/cjs/FirebaseExtraAdmin");

function loadJson(path) {
	var s = fs.readFileSync(path);
	return JSON.parse(s);
}
const _ = require('lodash');
// const feathers_errors = require("@feathersjs/errors");
// const logger = require('./logger');
//const GoogleErrorReporting = require('./utilities/GoogleErrorReporting');
const {ErrorControl,HttpErrors} = require('error-control');

const {Storage} = require('@google-cloud/storage');

const {Settings} = require('luxon');
Settings.defaultZoneName = 'UTC';

// const Client_BigQuery = require('@lchemy/knex-bigquery-client');
// const Knex = require('knex');

// const HueyDataCommon = require('./utilities/HueyDataCommon');
//
// const DestinationDatabase = require('./utilities/DestinationDatabase');
//
// const UserMessaging = require('./services/UserMessaging');
// const AssetPermissions = require('./services/AssetPermissions');

function underTest() {
	let argParts = process.argv[1] && process.argv[1].split('/');
	let runner = argParts[argParts.length-1];
	if ((runner==='mocha') || (runner==='_mocha'))
		return true;
	return false;
}

const functions_path = path.normalize(__dirname);

let functionsTest;
let server_config;
let functions_config;
let config;
let environment = 'default';
if (underTest()) {
	environment = 'test';
	server_config = {
		environment: 'test',
		path: 'src/environments/test'
	};
	console.log('loading config '+server_config.path);
	config = loadJson(path.resolve(functions_path, server_config.path, 'project.json'));
	functionsTest = require('firebase-functions-test')(config, config.private.serviceCredentialsFile);
	functions_config = { server_config };
	functionsTest.mockConfig(functions_config);
} else {
	let specified_environment = null;
	try {
		if (argv.environment)
			specified_environment = argv.environment;
	} catch(e) {
		console.log("Smothering "+e.message);
	}

	if (!specified_environment || (specified_environment === 'default')) {
		functions_config = functions.config();
		if (functions_config && functions_config.server_config && functions_config.server_config.environment) {
			server_config = functions_config.server_config;
			environment = server_config.environment;
		} else {
			environment = 'development';
			server_config = {
				environment,
				path: `src/environments/${environment}`
			};
		}
	} else {
		environment = specified_environment;
		server_config = {
			environment,
			path: `src/environments/${environment}`
		};
	}

	if (!functions_config)
		functions_config = { server_config };
	if (!functions_config.server_config)
		functions_config.server_config = server_config;
	console.log(JSON.stringify(functions_config));
	console.log('loading config '+server_config.path);
	config = loadJson(path.resolve(functions_path, server_config.path, 'project.json'));
}

config.environment = environment;
// if (functions_config.__project_config_mods)
// 	Object.assign(config,functions_config.__project_config_mods);
let serviceCredentialsFile = _.get(config,'private.serviceCredentialsFile');
const serviceCredentials = (serviceCredentialsFile && loadJson(path.resolve(functions_path, serviceCredentialsFile))) || null;

// const serviceCredentials = FileUtils.loadJson(path.resolve(functions_path, config.private.serviceCredentialsFile));
// let bigQueryClient = new BigQueryClient({dataset: config.bigquery_dataset, credentials: serviceCredentials});



// let adapter = _.get(config,'private.destinationKnexAdapter');
// let database = _.get(config,'private.destinationDatabase');
// let dbConfig = {
// 	debug: true,
// 	useNullAsDefault: true,
// 	migrations: {
// 		directory: path.join(__dirname, "migrations")
// 	},
// 	// seeds: {
// 	// 	directory: path.join(__dirname, "seeds")
// 	// }
// };
// let knex;
// switch (adapter) {
// 	case 'sqlite3':
// 		Object.assign(dbConfig,{
// 			client: "sqlite3",
// 			connection: database,
// 		});
// 		knex = Knex(dbConfig);
// 		break;
// 	case 'knex-bigquery-client':
// 		Object.assign(dbConfig,{
// 			client: Client_BigQuery,
// 			connection: {
// 				credentials: serviceCredentials,
// 				projectId: config.private.bigQueryProjectId || serviceCredentials.project_id // config.private.bigQueryProjectId		// bigQueryCredentials.projectId
// 			}
// 		});
// 		knex = Knex(dbConfig);
// 		break;
// 	default:
// 		throw new Error('unknown adapter '+adapter);
// }
//
// let destination = new DestinationDatabase(config,knex);

let storage = new Storage({credentials: serviceCredentials});

let firebase = new FirebaseExtraAdmin(config,firebaseSdk,adminSdk,serviceCredentials);

// let userMessaging = new UserMessaging(firebase);
//
// let channelPermissions = new AssetPermissions(firebase,'Channel');
// let sensorPermissions = new AssetPermissions(firebase,'Sensor');
// let sitePermissions = new AssetPermissions(firebase,'Site');
//
// HueyDataCommon.reset(
// 	config,
// 	// destination,
// 	userMessaging,
// 	channelPermissions,
// 	sensorPermissions,
// 	sitePermissions
// );

// class FeathersErrorFilter {
// 	filter(aError) {
// 		let isProduction = process.env.NODE_ENV === "production";
// 		let error;
// 		let code = aError.code || aError.statusCode || 500;
//
// 		let data;
// 		if (aError.type === 'FeathersError') {
// 			error = aError;
// 			if (error.message=='Error')
// 				error.message = HttpErrors.STATUS_CODES[code][1] || _.startCase(error.name);
// 		} else {
// 			let feathersHttpErrorClass = feathers_errors[code] || feathers_errors.GeneralError;
// 			data = {};
// 			if (aError.errors)
// 				data.errors = aError.errors;
// 			error = new feathersHttpErrorClass(aError.message, data);
// 			error.inner = aError;
// 			error.stack = aError.stack;
// 		}
// 		//let isSurprise = code != 404 && code != 422 && code != 401 && code != 403;
// 		if (isProduction)
// 			error.stack = null;
// 		return error;
// 	}
// }
// ErrorControl.default.prependFilter(new FeathersErrorFilter());

class ConsoleErrorReporter {
	report(aError,aUser=null) {
		console.error(aError);
	}
}
ErrorControl.default.appendReporter(new ConsoleErrorReporter());
//ErrorControl.default.appendReporter(new GoogleErrorReporting({projectId: config.projectId, credentials: serviceCredentials, ignoreEnvironmentCheck: true}));

module.exports = {
  firebase,
  config,
  serviceCredentials,
	functionsTest,
	storage,
	// destination,
	// HueyDataCommon,
	// knex
};
