import { exec } from 'node:child_process'

let isTSCReady = false
let isTscAliasReady = false
let isFastifyStart = false

exec('nr watch:ts').stdout
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
      exec('nr dev:start').stdout
        .on('data', _msg => console.log(_msg))
        .on('error', _err => console.error(_err))
    }
  }).on('error', err => console.error(err))
