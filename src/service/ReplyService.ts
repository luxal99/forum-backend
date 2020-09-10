import {AbstractService} from "./AbstractService";
import {Replies} from "../entity/Replies";
import {getConnection} from "typeorm";
import {UserService} from "./UserService";

export class ReplyService extends AbstractService<Replies> {


    async save(entity: Replies): Promise<void> {
        await super.save(entity);
    }

    async getAll():Promise<Replies[]>{
        return  await this.manager.find(Replies,{relations:['idTopics','idUser','idTopics.idTopicsCategory']})
    }

    static async incrementLike(id) {
        await getConnection().createQueryBuilder().update(Replies).set({
            likes: ()=>"likes + 1"
        }).where("id=:id", {id: id}).execute()
    }

    async findAnswers(token) {
        let repl: Replies[] = [];
        let replies = await this.getAll();
        let user = await new UserService().findByHashId(token);

        replies.forEach(reply => {
            if (reply.idUser.id === user.id)
                repl.push(reply)
        })

        return repl;
    }
}
