// import fs from "fs";
// import path from "path";
// import _ from 'lodash';
//
// function loadJson(path) {
//   const s = fs.readFileSync(path);
//   return JSON.parse(s.toString());
// }
//
// function underTest() {
//   const argParts = process.argv[1] && process.argv[1].split('/');
//   const runner = argParts[argParts.length-1];
//   if ((runner==='mocha') || (runner==='_mocha'))
//     return true;
//   return false;
// }
//
// const functions_path = path.normalize(__dirname+'/..');
//
// let functionsTest;
// let server_config;
// let functions_config;
// let config;
// let environment = 'default';
// if (underTest()) {
//   environment = 'test';
//   server_config = {
//     environment: 'test',
//     path: 'environments/test'
//   };
//   console.log('loading config '+server_config.path);
//   config = loadJson(path.resolve(functions_path, server_config.path, 'project.json'));
//
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   functionsTest = require('firebase-functions-test')(config, config.private.serviceCredentialsFile);
//   functions_config = { server_config };
//   functionsTest.mockConfig(functions_config);
// } else {
//   const specified_environment = null;
//   // try {
//   //   if (argv.environment)
//   //     specified_environment = argv.environment;
//   // } catch(e) {
//   //   console.log("Smothering "+e.message);
//   // }
//
//   if (!specified_environment || (specified_environment === 'default')) {
//     // eslint-disable-next-line @typescript-eslint/no-var-requires
//     const functions = require('firebase-functions');
//     functions_config = functions.config();
//     if (functions_config && functions_config.server_config && functions_config.server_config.environment) {
//       server_config = functions_config.server_config;
//       environment = server_config.environment;
//     } else {
//       environment = 'development';
//       server_config = {
//         environment,
//         path: `environments/${environment}`
//       };
//     }
//   } else {
//     environment = specified_environment;
//     server_config = {
//       environment,
//       path: `environments/${environment}`
//     };
//   }
//
//   if (!functions_config)
//     functions_config = { server_config };
//   if (!functions_config.server_config)
//     functions_config.server_config = server_config;
//   console.log(JSON.stringify(functions_config));
//   console.log('loading config '+server_config.path);
//   console.log(functions_path);
//   console.log(server_config.path);
//   config = loadJson(path.resolve(functions_path, server_config.path, 'project.json'));
// }
//
// config.environment = environment;
// // if (functions_config.__project_config_mods)
// // 	Object.assign(config,functions_config.__project_config_mods);
// const serviceCredentialsFile = _.get(config,'private.serviceCredentialsFile');
// const serviceCredentials = (serviceCredentialsFile && loadJson(path.resolve(functions_path, serviceCredentialsFile))) || null;
//
// // const serviceCredentials = FileUtils.loadJson(path.resolve(functions_path, config.private.serviceCredentialsFile));
// // let bigQueryClient = new BigQueryClient({dataset: config.bigquery_dataset, credentials: serviceCredentials});
//
//
//
// // let adapter = _.get(config,'private.destinationKnexAdapter');
// // let database = _.get(config,'private.destinationDatabase');
// // let dbConfig = {
// //   debug: true,
// //   useNullAsDefault: true,
// //   migrations: {
// //     directory: path.join(__dirname, "migrations")
// //   },
// //   // seeds: {
// //   // 	directory: path.join(__dirname, "seeds")
// //   // }
// // };
// // let knex;
// // switch (adapter) {
// //   case 'sqlite3':
// //     Object.assign(dbConfig,{
// //       client: "sqlite3",
// //       connection: database,
// //     });
// //     knex = Knex(dbConfig);
// //     break;
// //   case 'knex-bigquery-client':
// //     Object.assign(dbConfig,{
// //       client: Client_BigQuery,
// //       connection: {
// //         credentials: serviceCredentials,
// //         projectId: config.private.bigQueryProjectId || serviceCredentials.project_id // config.private.bigQueryProjectId		// bigQueryCredentials.projectId
// //       }
// //     });
// //     knex = Knex(dbConfig);
// //     break;
// //   default:
// //     throw new Error('unknown adapter '+adapter);
// // }
// //
// // let destination = new DestinationDatabase(config,knex);
// //
// // let storage = new Storage({credentials: serviceCredentials});
//
//
// // let userMessaging = new UserMessaging(firebase);
// //
// // let channelPermissions = new AssetPermissions(firebase,'Channel');
// // let sensorPermissions = new AssetPermissions(firebase,'Sensor');
// //
//
// import FirebaseExtraAdmin from "firebase-extra/dist/cjs/FirebaseExtraAdmin";
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const firebaseSdk = require('firebase');
// // Required for side-effects
// import "firebase/firestore";
// import adminSdk from 'firebase-admin';
//
// const firebase = new FirebaseExtraAdmin(config,firebaseSdk,adminSdk,serviceCredentials);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const initialize = require('../../initialize');

export default initialize;


// export {
//   firebase,
//   config,
//   serviceCredentials,
//   functionsTest,
// };
