

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MockaeSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('CartEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MOCKAE_TEST_LIVE=TRUE.
  afterEach(liveDelay('MOCKAE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MockaeSDK.test()
    const ent = testsdk.Cart()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MOCKAE_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'cart.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Cart ID","t":"`$INTEGER`","key$":"id","index$":0},"items":{"a":true,"h":"Items","n":"items","r":false,"sh":"Items in the cart","t":"`$ARRAY`","key$":"items","index$":1},"total":{"a":true,"fo":"float","h":"Total","n":"total","r":false,"sh":"Total cart value","t":"`$NUMBER`","key$":"total","index$":2},"userId":{"a":true,"h":"User Id","n":"userId","r":false,"sh":"User ID who owns the cart","t":"`$INTEGER`","key$":"userId","index$":3}},"id":{"field":"id","name":"id"},"name":"cart","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /carts","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/carts","q":{},"r":{},"s":[{"lit":"carts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /carts/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/carts/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"carts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"cart","name__orig":"cart","Name":"Cart","name_":"cart","name-":"cart","NAME":"CART","index$":0}, {"active":true,"entity":"cart","key$":"BasicCartFlow","kind":"basic","name":"BasicCartFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"cart_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"cart_ref01","srcdatavar":"cart_ref01_data","suffix":"_dt0"},"m":{"id":"cart01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-cart_ref01"}}],"index$":1}]}, 'Cart', {"GET /carts":{"protocol":"http","operationId":"getAllCarts","responses":{"200":{"description":"Successful response with list of carts","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","description":"Shopping cart object","properties":{"id":{"type":"integer","description":"Cart ID","example":1,"key$":"id"},"userId":{"type":"integer","description":"User ID who owns the cart","example":5,"key$":"userId"},"items":{"type":"array","description":"Items in the cart","items":{"type":"object","properties":{"productId":{"type":"integer","example":10},"quantity":{"type":"integer","example":2}}},"key$":"items"},"total":{"type":"number","format":"float","description":"Total cart value","example":59.98,"key$":"total"}},"x-ref":"#/components/schemas/Cart","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /carts/{id}":{"protocol":"http","operationId":"getCartById","responses":{"200":{"description":"Successful response with cart details","content":{"application/json":{"schema":{"type":"object","description":"Shopping cart object","properties":{"id":{"type":"integer","description":"Cart ID","example":1,"key$":"id"},"userId":{"type":"integer","description":"User ID who owns the cart","example":5,"key$":"userId"},"items":{"type":"array","description":"Items in the cart","items":{"type":"object","properties":{"productId":{"type":"integer","example":10},"quantity":{"type":"integer","example":2}}},"key$":"items"},"total":{"type":"number","format":"float","description":"Total cart value","example":59.98,"key$":"total"}},"x-ref":"#/components/schemas/Cart","index$":0}}}},"404":{"description":"Cart not found"}},"parameters":[{"name":"id","in":"path","required":true,"description":"Cart ID","schema":{"type":"integer","minimum":1,"maximum":20},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let cart_ref01_data = Object.values(setup.data.existing.cart)[0] as any

    // LIST
    const cart_ref01_ent = client.Cart()
    const cart_ref01_match: any = {}

    const cart_ref01_list = (await cart_ref01_ent.list(cart_ref01_match)).map((e: any) => e.data())


    // LOAD
    const cart_ref01_match_dt0: any = {}
    cart_ref01_match_dt0.id = cart_ref01_data.id
    const cart_ref01_data_dt0 = (await cart_ref01_ent.load(cart_ref01_match_dt0)).data()
    assert(cart_ref01_data_dt0.id === cart_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/cart/CartTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MockaeSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['cart01','cart02','cart03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MOCKAE_TEST_CART_ENTID': idmap,
    'MOCKAE_TEST_LIVE': 'FALSE',
    'MOCKAE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MOCKAE_TEST_CART_ENTID']

  const live = 'TRUE' === env.MOCKAE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MOCKAE_TEST_CART_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MockaeSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.MOCKAE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
