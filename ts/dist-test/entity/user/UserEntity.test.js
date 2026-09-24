"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('UserEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MOCKAE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MOCKAE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MockaeSDK.test();
        const ent = testsdk.User();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MOCKAE_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'user.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "email": { "a": true, "fo": "email", "h": "Email", "n": "email", "r": false, "sh": "User email address", "t": "`$STRING`", "key$": "email", "index$": 0 }, "firstName": { "a": true, "h": "First Name", "n": "firstName", "r": false, "sh": "User's first name", "t": "`$STRING`", "key$": "firstName", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "User ID", "t": "`$INTEGER`", "key$": "id", "index$": 2 }, "lastName": { "a": true, "h": "Last Name", "n": "lastName", "r": false, "sh": "User's last name", "t": "`$STRING`", "key$": "lastName", "index$": 3 }, "username": { "a": true, "h": "Username", "n": "username", "r": false, "sh": "Username", "t": "`$STRING`", "key$": "username", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "user", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /users", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/users", "q": {}, "r": {}, "s": [{ "lit": "users" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /users/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/users/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "users" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "user", "name__orig": "user", "Name": "User", "name_": "user", "name-": "user", "NAME": "USER", "index$": 4 }, { "active": true, "entity": "user", "key$": "BasicUserFlow", "kind": "basic", "name": "BasicUserFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "user_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "user_ref01", "srcdatavar": "user_ref01_data", "suffix": "_dt0" }, "m": { "id": "user01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-user_ref01" } }], "index$": 1 }] }, 'User', { "GET /users": { "protocol": "http", "operationId": "getAllUsers", "responses": { "200": { "description": "Successful response with list of users", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "description": "User object with profile information", "properties": { "id": { "type": "integer", "description": "User ID", "example": 1, "key$": "id" }, "username": { "type": "string", "description": "Username", "example": "john_doe", "key$": "username" }, "email": { "type": "string", "format": "email", "description": "User email address", "example": "john.doe@example.com", "key$": "email" }, "firstName": { "type": "string", "description": "User's first name", "example": "John", "key$": "firstName" }, "lastName": { "type": "string", "description": "User's last name", "example": "Doe", "key$": "lastName" } }, "x-ref": "#/components/schemas/User", "index$": 0 } } } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /users/{id}": { "protocol": "http", "operationId": "getUserById", "responses": { "200": { "description": "Successful response with user details", "content": { "application/json": { "schema": { "type": "object", "description": "User object with profile information", "properties": { "id": { "type": "integer", "description": "User ID", "example": 1, "key$": "id" }, "username": { "type": "string", "description": "Username", "example": "john_doe", "key$": "username" }, "email": { "type": "string", "format": "email", "description": "User email address", "example": "john.doe@example.com", "key$": "email" }, "firstName": { "type": "string", "description": "User's first name", "example": "John", "key$": "firstName" }, "lastName": { "type": "string", "description": "User's last name", "example": "Doe", "key$": "lastName" } }, "x-ref": "#/components/schemas/User", "index$": 0 } } } }, "404": { "description": "User not found" } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "User ID", "schema": { "type": "integer", "minimum": 1, "maximum": 20 }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let user_ref01_data = Object.values(setup.data.existing.user)[0];
        // LIST
        const user_ref01_ent = client.User();
        const user_ref01_match = {};
        const user_ref01_list = (await user_ref01_ent.list(user_ref01_match)).map((e) => e.data());
        // LOAD
        const user_ref01_match_dt0 = {};
        user_ref01_match_dt0.id = user_ref01_data.id;
        const user_ref01_data_dt0 = (await user_ref01_ent.load(user_ref01_match_dt0)).data();
        (0, node_assert_1.default)(user_ref01_data_dt0.id === user_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/user/UserTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MockaeSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['user01', 'user02', 'user03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MOCKAE_TEST_USER_ENTID': idmap,
        'MOCKAE_TEST_LIVE': 'FALSE',
        'MOCKAE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MOCKAE_TEST_USER_ENTID'];
    const live = 'TRUE' === env.MOCKAE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MOCKAE_TEST_USER_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MockaeSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=UserEntity.test.js.map