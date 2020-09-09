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
        for (const mess of messages) {

            if ((mess.receiverId.id === receiverId.id && mess.senderId.id === senderId.id) || (mess.senderId.id === receiverId.id && mess.receiverId.id === senderId.id)) {
                chat.push(mess);
                if (mess.receiverId.id === senderId.id) {
                    await getConnection().createQueryBuilder().update(Message).set({
                        isRead: true
                    }).where("id = :id", {id: mess.id}).execute()
                }
            }


        }
        return chat;
    }

    async findUnreadMessages(user: User) {
        let messages: Message[] = await this.manager.find(Message, {relations: ['senderId', 'receiverId']});
        const unreadMessages: Message[] = []

        messages.forEach(mess =>{
            if (mess.receiverId.id === user.id && !mess.isRead)
                unreadMessages.push(mess)
        })

        return unreadMessages
    }

    async groupMessageByUser(user: User) {

        let messages: Message[] = await this.manager.find(Message, {relations: ['senderId', 'receiverId']});
        const users: User[] = [];

        messages.forEach(mess => {
            if (mess.senderId.id === user.id && users.findIndex(x => x.id === mess.receiverId.id))
                users.push(mess.receiverId)
        })
        return users;
    }

    async delete(entity: Message): Promise<void> {
        await super.delete(entity);
    }
}
