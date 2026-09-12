import { MockaeEntityBase } from '../MockaeEntityBase';
import type { MockaeSDK } from '../MockaeSDK';
import type { Control } from '../types';
import type { User, UserLoadMatch, UserListMatch } from '../MockaeTypes';
declare class UserEntity extends MockaeEntityBase<User> {
    constructor(client: MockaeSDK, entopts: any);
    make(this: UserEntity): UserEntity;
    load(this: any, reqmatch?: UserLoadMatch, ctrl?: Control): Promise<UserEntity>;
    list(this: any, reqmatch?: UserListMatch, ctrl?: Control): Promise<UserEntity[]>;
}
export { UserEntity };
