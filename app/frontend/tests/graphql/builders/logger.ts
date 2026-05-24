// Copyright (C) 2024-2026 Dejoiy

import { onTestFailed } from 'vitest'

const logs: unknown[][] = []

afterEach(() => {
  logs.length = 0
})

const logger = {
  log(...messages: unknown[]) {
    if (process.env.VITEST_LOG_GQL_FACTORY) {
      console.log(...messages)
    } else {
      logs.push(messages)
    }
  },
  printMockerLog() {
    logs.forEach((log) => {
      console.log(...log)
    })
  },
}

beforeEach(() => {
  onTestFailed(() => {
    logger.printMockerLog()
  })
})

export default logger
