import {AbstractService} from "./AbstractService";
import {UserInfo} from "../entity/UserInfo";

export class UserInfoService extends AbstractService<UserInfo> {


    async save(entity: UserInfo): Promise<void> {
        await super.save(entity);
    }
}
