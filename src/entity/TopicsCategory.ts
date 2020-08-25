import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Topics} from "./Topics";


@Entity()
export class TopicsCategory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    color: string

    @OneToMany(type => Topics, listOfTopics => listOfTopics.idTopicsCategory)
    listOfTopics: Topics[];
}
