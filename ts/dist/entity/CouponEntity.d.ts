import { MockaeEntityBase } from '../MockaeEntityBase';
import type { MockaeSDK } from '../MockaeSDK';
import type { Control } from '../types';
import type { Coupon, CouponLoadMatch, CouponListMatch } from '../MockaeTypes';
declare class CouponEntity extends MockaeEntityBase<Coupon> {
    constructor(client: MockaeSDK, entopts: any);
    make(this: CouponEntity): CouponEntity;
    load(this: any, reqmatch?: CouponLoadMatch, ctrl?: Control): Promise<CouponEntity>;
    list(this: any, reqmatch?: CouponListMatch, ctrl?: Control): Promise<CouponEntity[]>;
}
export { CouponEntity };
