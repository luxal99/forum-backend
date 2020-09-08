import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    BaseEntity,
    Index,
    OneToMany,
    ManyToMany, ManyToOne
} from "typeorm";
import {UserInfo} from "./UserInfo";
import {Topics} from "./Topics";
import {Replies} from "./Replies";
import {type} from "os";
import {Message} from "./Message";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    profilePicture: string;

    @OneToOne(type => UserInfo)
    @JoinColumn()
    idUserInfo: UserInfo;

    @OneToMany(type => Topics, listOfTopics => listOfTopics.idUser)
    listOfTopics: Topics[];

    @OneToMany(type => Replies, listOfReplies => listOfReplies.idUser)
    listOfReplies: Topics[];

    @ManyToMany(type=>Topics,topic=>topic.listOfUsersWhichPinnedTopic)
    listOfPinnedTopics:Topics[];


    @ManyToOne(type => Message,message =>message.senderId)
    listOfSentMessages:Message[];

    @ManyToOne(type => Message,message =>message.receiverId)
    listOfReceivedMessages:Message[];




    constructor(username?: string, password?: string, idUserInfo?: UserInfo) {
        super();
        this.username = username;
        this.password = password;
        this.idUserInfo = idUserInfo;

        this.profilePicture = '';
    }
}
