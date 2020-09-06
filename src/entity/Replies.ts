import {BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Topics} from "./Topics";
import {User} from "./User";
import {Message} from "./Message";

@Entity()
export class Replies extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 10240})
    title: string;

    @Column()
    likes: number

    @Column()
    date: string
    @ManyToOne(type => Topics, id => id.listOfReplies)
    idTopics: Topics

    @ManyToOne(type => User, id => id.listOfReplies)
    idUser: User


    constructor(idTopic, idUser, title) {
        super();
        this.likes = 0;

        this.idTopics = idTopic;
        this.idUser = idUser;
        this.title = title;
        this.date = new Date().toUTCString();
    }
}
