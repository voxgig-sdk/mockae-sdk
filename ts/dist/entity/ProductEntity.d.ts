import { MockaeEntityBase } from '../MockaeEntityBase';
import type { MockaeSDK } from '../MockaeSDK';
import type { Control } from '../types';
import type { Product, ProductLoadMatch, ProductListMatch } from '../MockaeTypes';
declare class ProductEntity extends MockaeEntityBase<Product> {
    constructor(client: MockaeSDK, entopts: any);
    make(this: ProductEntity): ProductEntity;
    load(this: any, reqmatch?: ProductLoadMatch, ctrl?: Control): Promise<ProductEntity>;
    list(this: any, reqmatch?: ProductListMatch, ctrl?: Control): Promise<ProductEntity[]>;
}
export { ProductEntity };
