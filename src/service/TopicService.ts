import {AbstractService} from "./AbstractService";
import {Topics} from "../entity/Topics";
import {getConnection} from "typeorm";
import {User} from "../entity/User";
import {UserService} from "./UserService";
import {Replies} from "../entity/Replies";
import {ReplyService} from "./ReplyService";

const _ = require('lodash')

export class TopicService extends AbstractService<Topics> {


    async save(entity: Topics): Promise<void> {
        await super.save(entity);
    }

    async getAll(): Promise<Topics[]> {
        return await Topics.find({relations: ['listOfReplies', 'idUser', 'idUser.idUserInfo', 'idTopicsCategory', 'listOfReplies.idUser']})
    }

    async findById(id): Promise<Topics> {
        const topicById = await Topics.findOne({
            relations: ['listOfReplies', 'idUser', 'idUser.idUserInfo', 'idTopicsCategory', 'listOfReplies.idUser', 'listOfReplies.idUser.idUserInfo'],
            where: {id: id}
        })

        topicById.listOfReplies = _.orderBy(topicById.listOfReplies, reply => reply.date, 'desc');
        return topicById;
    }

    async groupByCategory(categoryId: Number): Promise<Topics[]> {
        let topicArr = await this.getAll();

        let sorted: Topics[];
        sorted = topicArr.filter(topic => topic.idTopicsCategory.id === categoryId);
        return sorted;
    }

    async pinTopic(id: number, user: User[]) {
        await getConnection().createQueryBuilder().update(Topics).set({
            listOfUsersWhichPinnedTopic: user
        }).where("id=:id", {id: 15}).execute();
    }

    async findTopicByUser(token) {
        let topics: Topics[] = [];
        let replies = await new ReplyService().getAll();
        let user = await new UserService().findByHashId(token);

        replies.forEach(reply =>{
            if (reply.idUser.id === user.id && topics.findIndex(x => x.id === reply.idTopics.id ))
                topics.push(reply.idTopics)
        })

        return topics;
    }
}
