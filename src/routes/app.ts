import express = require("express");
import {Application, Request, Response} from "express";
import bodyParser = require("body-parser");
import bcrypt = require("bcrypt");
import {UserInfo} from "../entity/UserInfo";
import {UserService} from "../service/UserService";
import {UserInfoService} from "../service/UserInfoService";
import {User} from "../entity/User";
import {TopicsCategory} from "../entity/TopicsCategory";
import {Topics} from "../entity/Topics";
import {TopicService} from "../service/TopicService";

export class App {

    public app: Application;

    private userRouteName: string;
    private categoryRouteName: string;
    private topicRouteName: string;


    constructor(userRouteName: string, categoryRouteName: string, topicsCategoryName: string) {
        this.userRouteName = userRouteName;
        this.categoryRouteName = categoryRouteName;
        this.topicRouteName = topicsCategoryName;

        this.app = express();


        this.plugins();
        this.userRoute();
        this.categoryRoute();
        this.topicRoute();
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
                    ? res.send({
                        username: user.username,
                        id: await bcrypt.hash(JSON.stringify(user.id), 10)
                    }) : res.sendStatus(403))

            } catch {
                res.sendStatus(500);
            }
        })
    }

    protected categoryRoute() {
        this.app.get(`/${this.categoryRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await TopicsCategory.find());
            } catch {
                res.sendStatus(500);
            }
        })
    }

    protected topicRoute() {
        this.app.post(`/${this.topicRouteName}`, async (req: Request, res: Response) => {

            const userService = new UserService();
            const topic = new Topics();
            topic.idUser = await userService.findByHashId(req.body.id_user.id);
            topic.title = req.body.question;
            topic.idTopicsCategory = req.body.id_category;
            topic.question = req.body.question;
            topic.date = new Date().toUTCString();


            const topicService = new TopicService();
            await topicService.save(topic);

            res.sendStatus(200);

        })
        this.app.get(`/${this.topicRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new TopicService().getAll())
            } catch {
                res.sendStatus(500)
            }
        })
    }


}
