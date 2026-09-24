

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


describe('CouponEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MOCKAE_TEST_LIVE=TRUE.
  afterEach(liveDelay('MOCKAE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MockaeSDK.test()
    const ent = testsdk.Coupon()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MOCKAE_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'coupon.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"code":{"a":true,"h":"Code","n":"code","r":false,"sh":"Coupon code","t":"`$STRING`","key$":"code","index$":0},"discount":{"a":true,"fo":"float","h":"Discount","n":"discount","r":false,"sh":"Discount percentage or amount","t":"`$NUMBER`","key$":"discount","index$":1},"expiryDate":{"a":true,"fo":"date","h":"Expiry Date","n":"expiryDate","r":false,"sh":"Coupon expiry date","t":"`$STRING`","key$":"expiryDate","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Coupon ID","t":"`$INTEGER`","key$":"id","index$":3},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Type of discount (percentage or fixed)","t":"`$STRING`","key$":"type","index$":4}},"id":{"field":"id","name":"id"},"name":"coupon","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /coupons","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/coupons","q":{},"r":{},"s":[{"lit":"coupons"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /coupons/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/coupons/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"coupons"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"coupon","name__orig":"coupon","Name":"Coupon","name_":"coupon","name-":"coupon","NAME":"COUPON","index$":1}, {"active":true,"entity":"coupon","key$":"BasicCouponFlow","kind":"basic","name":"BasicCouponFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"coupon_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"coupon_ref01","srcdatavar":"coupon_ref01_data","suffix":"_dt0"},"m":{"id":"coupon01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-coupon_ref01"}}],"index$":1}]}, 'Coupon', {"GET /coupons":{"protocol":"http","operationId":"getAllCoupons","responses":{"200":{"description":"Successful response with list of coupons","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","description":"Coupon object with discount information","properties":{"id":{"type":"integer","description":"Coupon ID","example":1,"key$":"id"},"code":{"type":"string","description":"Coupon code","example":"SAVE20","key$":"code"},"discount":{"type":"number","format":"float","description":"Discount percentage or amount","example":20,"key$":"discount"},"type":{"type":"string","description":"Type of discount (percentage or fixed)","enum":["percentage","fixed"],"example":"percentage","key$":"type"},"expiryDate":{"type":"string","format":"date","description":"Coupon expiry date","example":"2024-12-31","key$":"expiryDate"}},"x-ref":"#/components/schemas/Coupon","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /coupons/{id}":{"protocol":"http","operationId":"getCouponById","responses":{"200":{"description":"Successful response with coupon details","content":{"application/json":{"schema":{"type":"object","description":"Coupon object with discount information","properties":{"id":{"type":"integer","description":"Coupon ID","example":1,"key$":"id"},"code":{"type":"string","description":"Coupon code","example":"SAVE20","key$":"code"},"discount":{"type":"number","format":"float","description":"Discount percentage or amount","example":20,"key$":"discount"},"type":{"type":"string","description":"Type of discount (percentage or fixed)","enum":["percentage","fixed"],"example":"percentage","key$":"type"},"expiryDate":{"type":"string","format":"date","description":"Coupon expiry date","example":"2024-12-31","key$":"expiryDate"}},"x-ref":"#/components/schemas/Coupon","index$":0}}}},"404":{"description":"Coupon not found"}},"parameters":[{"name":"id","in":"path","required":true,"description":"Coupon ID","schema":{"type":"integer","minimum":1,"maximum":20},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let coupon_ref01_data = Object.values(setup.data.existing.coupon)[0] as any

    // LIST
    const coupon_ref01_ent = client.Coupon()
    const coupon_ref01_match: any = {}

    const coupon_ref01_list = (await coupon_ref01_ent.list(coupon_ref01_match)).map((e: any) => e.data())


    // LOAD
    const coupon_ref01_match_dt0: any = {}
    coupon_ref01_match_dt0.id = coupon_ref01_data.id
    const coupon_ref01_data_dt0 = (await coupon_ref01_ent.load(coupon_ref01_match_dt0)).data()
    assert(coupon_ref01_data_dt0.id === coupon_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/coupon/CouponTestData.json')

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
    ['coupon01','coupon02','coupon03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MOCKAE_TEST_COUPON_ENTID': idmap,
    'MOCKAE_TEST_LIVE': 'FALSE',
    'MOCKAE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MOCKAE_TEST_COUPON_ENTID']

  const live = 'TRUE' === env.MOCKAE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MOCKAE_TEST_COUPON_ENTID']
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
  
