import { helloController } from '../hello.controller'
import { describe, it, expect } from '@jest/globals'

describe('helloController', () => {
  it('should return a greeting message', () => {
    expect(helloController({ input: { name: 'world' } })).toBe('Hello, world!')
  })
})
