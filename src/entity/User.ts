import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity, Index, OneToMany} from "typeorm";
import {UserInfo} from "./UserInfo";
import {Topics} from "./Topics";
import {Replies} from "./Replies";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index({unique: true})
    username: string;

    @Column()
    password: string;

    @OneToOne(type => UserInfo)
    @JoinColumn()
    idUserInfo: UserInfo;

    @OneToMany(type => Topics, listOfTopics => listOfTopics.idUser)
    listOfTopics: Topics[];

    @OneToMany(type => Replies, listOfReplies => listOfReplies.idUser)
    listOfReplies: Topics[];




    constructor(username?: string, password?: string, idUserInfo?: UserInfo) {
        super();
        this.username = username;
        this.password = password;
        this.idUserInfo = idUserInfo;
    }
}
