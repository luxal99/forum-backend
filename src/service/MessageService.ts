import {AbstractService} from "./AbstractService";
import {Message} from "../entity/Message";
import {User} from "../entity/User";

const _ = require('lodash');
import {getConnection} from "typeorm";

export class MessageService extends AbstractService<Message> {


    async save(entity: Message): Promise<void> {
        await super.save(entity);
    }

    async getAll(senderId: User, receiverId: User) {
        const messages = await this.manager.find(Message, {relations: ['senderId', 'receiverId']});

        const chat = [];
        messages.forEach(mess => {

            if ((mess.receiverId.id === receiverId.id && mess.senderId.id === senderId.id) || (mess.senderId.id === receiverId.id && mess.receiverId.id === senderId.id))
                chat.push(mess);
        })
        return chat;
    }

    async groupMessageByUser(user: User) {

        let messages: Message[] = await this.manager.find(Message, {relations: ['senderId', 'receiverId']});
        const users:User[] = [];

        messages.forEach(mess => {
            if (mess.senderId.id === user.id) {
                if (users.findIndex(x => x.id === mess.receiverId.id))
                    users.push(mess.receiverId)
            }
        })

        return users;
    }

    async delete(entity: Message): Promise<void> {
        await super.delete(entity);
    }
}
