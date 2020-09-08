import {BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";


@Entity()
export class Message extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 10240})
    message: string

    @Column()
    dateAndTime: string

    @Column()
    isRead: boolean;

    @ManyToOne(type => User, message => message.listOfSentMessages)
    senderId: User;

    @ManyToOne(type => User, message => message.listOfReceivedMessages)
    receiverId: User;


    constructor(senderId?: User, receivedId?: User, message?: string) {
        super();
        this.isRead = false;
        this.dateAndTime = new Date().toUTCString();
        this.message = message;

        this.senderId = senderId;
        this.receiverId = receivedId;

    }
}
