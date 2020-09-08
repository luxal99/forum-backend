import {BaseEntity, EntityManager, getManager} from "typeorm";
import {Message} from "../entity/Message";

export class AbstractService<T extends BaseEntity> {


    protected manager: EntityManager;


    constructor() {
        this.manager = getManager();
    }

    async save(entity: T) {
        await this.manager.save(entity);
    }

    async delete(entity: T) {
        await this.manager.remove(entity);
    }


}
