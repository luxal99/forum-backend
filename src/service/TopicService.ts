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
        let topics = await Topics.find({relations: ['listOfReplies', 'idUser', 'idUser.idUserInfo', 'idTopicsCategory', 'listOfReplies.idUser']});

        topics.sort();
        return topics.reverse()
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

    async pinTopic(topics: Topics, user: User) {

        await getConnection().createQueryBuilder().update(Topics).set({
            listOfUsersWhichPinnedTopic: topics.listOfUsersWhichPinnedTopic,
        }).where("id=:id", {id: topics.id}).execute();
    }

    async findTopicsByUser(token) {
        const user = await new UserService().findByHashId(token);
        const topics = await this.getAll();
        let topicsByUser: Topics[] = []

        topics.forEach(topic => {
            if (topic.idUser.id === user.id)
                topicsByUser.push(topic)
        })


        return topicsByUser;
    }


}
