import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {TopicsCategory} from "./TopicsCategory";
import {Replies} from "./Replies";

@Entity()
export class Topics extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 10240})
    title: string;

    @Column({length: 10240})
    question: string

    @Column()
    date:string;

    @ManyToOne(type => User, id => id.listOfTopics)
    idUser: User

    @ManyToOne(type => TopicsCategory, id => id.listOfTopics)
    idTopicsCategory: TopicsCategory;

    @OneToMany(type => Replies, listOfReplies => listOfReplies.idTopics)
    listOfReplies: Replies[];

}
