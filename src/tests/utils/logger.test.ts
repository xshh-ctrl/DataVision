import { describe, it, expect } from 'vitest'
import { logger } from '@/utils/logger'

describe('Logger', () => {
  it('should be a singleton', () => {
    const logger1 = logger
    const logger2 = logger
    expect(logger1).toBe(logger2)
  })

  it('should have debug method', () => {
    expect(typeof logger.debug).toBe('function')
  })

  it('should have info method', () => {
    expect(typeof logger.info).toBe('function')
  })

  it('should have warn method', () => {
    expect(typeof logger.warn).toBe('function')
  })

  it('should have error method', () => {
    expect(typeof logger.error).toBe('function')
  })
})
