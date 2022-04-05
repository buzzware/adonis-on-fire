import 'reflect-metadata'
//import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/standalone'

//const functions = require('@google-cloud/functions-framework');
// // import 'reflect-metadata'
// const {Ignitor} = require('@adonisjs/core/build/standalone');
// import Serverlessize from '@satheler/s12r'

let index;

async function bootstrapServer() {
  const ignitor = new Ignitor(__dirname)
  const httpServer = ignitor.httpServer()

  await httpServer.application.setup()
  await httpServer.application.registerProviders()
  await httpServer.application.bootProviders()
  await httpServer.application.requirePreloads()

  const serverCore = httpServer.application.container.use('Adonis/Core/Server')
  serverCore.errorHandler('App/Exceptions/Handler')
  serverCore.optimize()

  const server = serverCore.handle.bind(serverCore)
  return server
}


exports.helloWorld = async (req, res) => {
  // res.send('Hello, World');

  // new Ignitor(__dirname)
  //   .httpServer()
  //   .createServer(function(req,res){
  //
  //   })

  if (!index) {
    index = await bootstrapServer()
  }

  // const { request, response } = Serverlessize(args)
  return index(req, res);
};



// /*
// |--------------------------------------------------------------------------
// | AdonisJs Server
// |--------------------------------------------------------------------------
// |
// | The contents in this file is meant to bootstrap the AdonisJs application
// | and start the HTTP server to accept incoming connections. You must avoid
// | making this file dirty and instead make use of `lifecycle hooks` provided
// | by AdonisJs service providers for custom code.
// |
// */
//
// import 'reflect-metadata'
// import sourceMapSupport from 'source-map-support'
// import { Ignitor } from '@adonisjs/core/build/standalone'
//
// sourceMapSupport.install({ handleUncaughtExceptions: false })
//
// new Ignitor(__dirname).httpServer().start()
