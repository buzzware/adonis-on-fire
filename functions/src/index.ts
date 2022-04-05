import 'reflect-metadata'
import {Ignitor} from '@adonisjs/core/build/standalone'

import * as functions from "firebase-functions";

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

  return serverCore.handle.bind(serverCore)
}

export const adonis = functions.https.onRequest(async (req, res) => {
  if (!index) {
    index = await bootstrapServer()
  }
  return index(req, res);
})
