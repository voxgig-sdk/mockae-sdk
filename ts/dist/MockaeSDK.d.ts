import { CartEntity } from './entity/CartEntity';
import { CouponEntity } from './entity/CouponEntity';
import { ProductEntity } from './entity/ProductEntity';
import { StatusEntity } from './entity/StatusEntity';
import { UserEntity } from './entity/UserEntity';
export type * from './MockaeTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { MockaeEntityBase } from './MockaeEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class MockaeSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Cart(entopts?: Record<string, any>): CartEntity;
    Coupon(entopts?: Record<string, any>): CouponEntity;
    Product(entopts?: Record<string, any>): ProductEntity;
    Status(entopts?: Record<string, any>): StatusEntity;
    User(entopts?: Record<string, any>): UserEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): MockaeSDK;
    tester(testopts?: any, sdkopts?: any): MockaeSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof MockaeSDK;
export { stdutil, config, BaseFeature, MockaeEntityBase, MockaeSDK, SDK, };
