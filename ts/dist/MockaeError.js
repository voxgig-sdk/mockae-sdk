"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockaeError = void 0;
class MockaeError extends Error {
    isMockaeError = true;
    sdk = 'Mockae';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.MockaeError = MockaeError;
//# sourceMappingURL=MockaeError.js.map