import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity, Index} from "typeorm";
import {UserInfo} from "./UserInfo";

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


    constructor(username?: string, password?: string, idUserInfo?: UserInfo) {
        super();
        this.username = username;
        this.password = password;
        this.idUserInfo = idUserInfo;
    }
}
