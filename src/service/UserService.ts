import {AbstractService} from "./AbstractService";
import {User} from "../entity/User";
import bcrypt = require("bcrypt");

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
            console.log(JSON.stringify(user.id))
            if (await bcrypt.compare(JSON.stringify(user.id), id)) {
               return user;
            }


        }

        return null;
    }


}
