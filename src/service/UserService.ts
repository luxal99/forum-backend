import {AbstractService} from "./AbstractService";
import {User} from "../entity/User";
import bcrypt = require("bcrypt");
import {getConnection} from "typeorm";

export class UserService extends AbstractService<User> {


    async save(entity: User): Promise<void> {
        await super.save(entity);
    }

    async findByName(name: string): Promise<User> {
        return await this.manager.findOne(User, {username: name});
    }

    async findByHashId(id: string): Promise<User> {
        const users = await User.find();

        for (const user of users) {
            if (await bcrypt.compare(JSON.stringify(user.id), id)) {
                return user;
            }
        }

        return null;
    }


    async uploadProfilePhoto(url: string, token: string) {

        const user = await this.findByHashId(token);
        await getConnection().createQueryBuilder().update(User).set({
            profilePicture: url
        }).where("id=:id", {id: user.id}).execute();
    }


}
