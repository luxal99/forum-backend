import {AbstractService} from "./AbstractService";
import {Topics} from "../entity/Topics";

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

    async groupByCategory(categoryId:Number): Promise<Topics[]> {
        let topicArr = await this.getAll();

        let sorted: Topics[];
        sorted = topicArr.filter(topic => topic.idTopicsCategory.id === categoryId);
        return sorted;
    }
}
