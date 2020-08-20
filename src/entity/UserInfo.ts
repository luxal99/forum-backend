import {BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, Unique} from "typeorm";


@Entity()
export class UserInfo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    @Index({unique: true})
    email: string


    constructor(fullName?: string, email?: string) {
        super();
        this.fullName = fullName;
        this.email = email;
    }
}
