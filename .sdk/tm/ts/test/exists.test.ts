
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MockaeSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MockaeSDK.test()
    equal(null !== testsdk, true)
  })

})
