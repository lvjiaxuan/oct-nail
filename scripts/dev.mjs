import { exec } from 'node:child_process'

let isTSCReady = false
let isTscAliasReady = false
let isFastifyStart = false

const w = exec('nr watch:ts')

w.stdout
  .on('data', msg => {

    if (isFastifyStart) {
      return
    }

    msg = msg.toLowerCase()

    if (!isTSCReady && msg.includes('tsc') && msg.includes('watching')) {
      isTSCReady = true
    }

    if (!isTscAliasReady && msg.includes('tsc-alias') && msg.includes('watching')) {
      isTscAliasReady = true
    }

    if (!isFastifyStart && isTSCReady && isTscAliasReady) {
      isFastifyStart = true
      const f = exec('nr dev:start')
      f.stdout.on('data', _msg => console.log(_msg))
      f.stderr.on('data', _msg => console.error(_msg))
    }
  })

w.stderr.on('data', _msg => console.error(_msg))
