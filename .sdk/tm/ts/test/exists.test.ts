
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MockaeSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MockaeSDK.test()
    equal(testsdk instanceof MockaeSDK, true,
      'MockaeSDK.test() must return a client synchronously')
  })

})
