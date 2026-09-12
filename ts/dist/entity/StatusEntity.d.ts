import { MockaeEntityBase } from '../MockaeEntityBase';
import type { MockaeSDK } from '../MockaeSDK';
import type { Control } from '../types';
import type { Status, StatusLoadMatch } from '../MockaeTypes';
declare class StatusEntity extends MockaeEntityBase<Status> {
    constructor(client: MockaeSDK, entopts: any);
    make(this: StatusEntity): StatusEntity;
    load(this: any, reqmatch?: StatusLoadMatch, ctrl?: Control): Promise<StatusEntity>;
}
export { StatusEntity };
