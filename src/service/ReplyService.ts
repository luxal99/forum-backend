import {AbstractService} from "./AbstractService";
import {Replies} from "../entity/Replies";
import {getConnection} from "typeorm";

export class ReplyService extends AbstractService<Replies> {


    async save(entity: Replies): Promise<void> {
        await super.save(entity);
    }

    async getAll():Promise<Replies[]>{
        return  await this.manager.find(Replies,{relations:['idTopics','idUser']})
    }

    static async incrementLike(id) {
        await getConnection().createQueryBuilder().update(Replies).set({
            likes: ()=>"likes + 1"
        }).where("id=:id", {id: id}).execute()
    }
}
