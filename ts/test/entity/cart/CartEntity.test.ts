

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"short":"Cart ID","type":"`$INTEGER`","index$":0},{"active":true,"name":"items","req":false,"short":"Items in the cart","type":"`$ARRAY`","index$":1},{"active":true,"format":"float","name":"total","req":false,"short":"Total cart value","type":"`$NUMBER`","index$":2},{"active":true,"name":"userId","req":false,"short":"User ID who owns the cart","type":"`$INTEGER`","index$":3}],"id":{"field":"id","name":"id"},"name":"cart","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /carts","json":"{\"operationId\":\"getAllCarts\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"Shopping cart object\",\"properties\":{\"id\":{\"description\":\"Cart ID\",\"example\":1,\"type\":\"integer\"},\"items\":{\"description\":\"Items in the cart\",\"items\":{\"properties\":{\"productId\":{\"example\":10,\"type\":\"integer\"},\"quantity\":{\"example\":2,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"description\":\"Total cart value\",\"example\":59.98,\"format\":\"float\",\"type\":\"number\"},\"userId\":{\"description\":\"User ID who owns the cart\",\"example\":5,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of carts\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/carts","segments":[{"lit":"carts"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /carts/{id}","json":"{\"operationId\":\"getCartById\",\"parameters\":[{\"description\":\"Cart ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"maximum\":20,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Shopping cart object\",\"properties\":{\"id\":{\"description\":\"Cart ID\",\"example\":1,\"type\":\"integer\"},\"items\":{\"description\":\"Items in the cart\",\"items\":{\"properties\":{\"productId\":{\"example\":10,\"type\":\"integer\"},\"quantity\":{\"example\":2,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"description\":\"Total cart value\",\"example\":59.98,\"format\":\"float\",\"type\":\"number\"},\"userId\":{\"description\":\"User ID who owns the cart\",\"example\":5,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with cart details\"},\"404\":{\"description\":\"Cart not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/carts/{id}","segments":[{"lit":"carts"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"cart","name__orig":"cart","Name":"Cart","name_":"cart","name-":"cart","NAME":"CART","index$":0}, {"active":true,"entity":"cart","key$":"BasicCartFlow","kind":"basic","name":"BasicCartFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"cart_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"cart_ref01","srcdatavar":"cart_ref01_data","suffix":"_dt0"},"match":{"id":"cart01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-cart_ref01"}}],"index$":1}]}, 'Cart')
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
  
