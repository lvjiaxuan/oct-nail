// This file contains code that we reuse between our tests.
import helper from 'fastify-cli/helper.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const AppPath = path.join(__dirname, '..', 'dist', 'app.js')

// Fill in this config with all the configurations
// needed for testing the application
async function config () {
  return {
    // lang: 'ts'
  }
}

// Automatically build and tear down our instance
async function build () {
  // you can set all the options supported by the fastify CLI command
  const argv = [ AppPath ]

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  const app = await helper.build(argv, await config())

  return app
}

export {
  config,
  build,
}
