import { MockaeEntityBase } from '../MockaeEntityBase';
import type { MockaeSDK } from '../MockaeSDK';
import type { Control } from '../types';
import type { Cart, CartLoadMatch, CartListMatch } from '../MockaeTypes';
declare class CartEntity extends MockaeEntityBase<Cart> {
    constructor(client: MockaeSDK, entopts: any);
    make(this: CartEntity): CartEntity;
    load(this: any, reqmatch?: CartLoadMatch, ctrl?: Control): Promise<CartEntity>;
    list(this: any, reqmatch?: CartListMatch, ctrl?: Control): Promise<CartEntity[]>;
}
export { CartEntity };
