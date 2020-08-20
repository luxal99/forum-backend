import express = require("express");
import {Application, Request, Response} from "express";
import bodyParser = require("body-parser");
import bcrypt = require("bcrypt");
import {UserInfo} from "../entity/UserInfo";
import {UserService} from "../service/UserService";
import {UserInfoService} from "../service/UserInfoService";
import {User} from "../entity/User";

export class App {

    public app: Application;

    private userRouteName: string;

    protected userInfoService: UserInfoService;

    constructor(userRouteName: string) {
        this.userRouteName = userRouteName;
        this.app = express();
        this.plugins();
        this.userRoute();
    }

    protected plugins() {
        this.app.use(bodyParser.json());
    }

    protected userRoute() {


        this.app.post(`/${this.userRouteName}`, async (req: Request, res: Response) => {

            try {
                const userInfo = new UserInfo(req.body.userInfo.full_name, req.body.userInfo.email);
                const userInfoService = new UserInfoService();

                await userInfoService.save(userInfo).then(async () => {
                    const user = new User(req.body.user.username, await bcrypt.hash(req.body.user.password, 10), userInfo);
                    const userService = new UserService();

                    await userService.save(user);

                    res.sendStatus(200);
                });

            } catch {
                res.sendStatus(500);
            }
        })

        this.app.post(`/${this.userRouteName}/auth`, async (req: Request, res: Response) => {
            try {

                const user = await new UserService().findByName(req.body.username);
                const auth = ((user != null && await bcrypt.compare(req.body.password, user.password))
                    ? res.send({username:user.username,id:await bcrypt.hash(JSON.stringify(user.id),10)}) : res.sendStatus(403))

            } catch {
                res.sendStatus(500);
            }
        })
    }


}
