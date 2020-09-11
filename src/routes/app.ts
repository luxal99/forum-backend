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
import {ReplyService} from "../service/ReplyService";
import {Replies} from "../entity/Replies";
import {Message} from "../entity/Message";
import {MessageService} from "../service/MessageService";
import path = require('path');

const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs');

export class App {

    public app: Application;

    private userRouteName: string;
    private categoryRouteName: string;
    private topicRouteName: string;
    private replyRouteName: string
    private messageRouteName: string;


    constructor(userRouteName: string, categoryRouteName: string, topicsCategoryName: string, replyRouteName: string, messageRouteName: string) {

        this.userRouteName = userRouteName;
        this.categoryRouteName = categoryRouteName;
        this.topicRouteName = topicsCategoryName;
        this.replyRouteName = replyRouteName;
        this.messageRouteName = messageRouteName;

        this.app = express();


        this.plugins();
        this.userRoute();
        this.categoryRoute();
        this.topicRoute();
        this.replyRoute();
        this.messageRoute()
    }

    protected plugins() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(cors());
        this.app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));

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

            } catch (e) {
                res.send(e);
            }
        })

        this.app.post(`/${this.userRouteName}/auth`, async (req: Request, res: Response) => {
            try {

                const user = await new UserService().findByName(req.body.username);
                const auth = ((user != null && await bcrypt.compare(req.body.password, user.password))
                    ? res.send({
                        username: user.username,
                        pinnedTopics: user.listOfPinnedTopics,
                        id: await bcrypt.hash(JSON.stringify(user.id), 10)
                    }) : res.sendStatus(403))

            } catch {
                res.sendStatus(500);
            }
        })

        this.app.post(`/${this.userRouteName}/findUserByHash`, async (req: Request, res: Response) => {
            try {
                res.send(await new UserService().findByHashId(req.body.token));
            } catch (e) {
                res.send(e)
            }
        })

        this.app.post(`/${this.userRouteName}/uploadPhoto`, async (req: Request, res: Response) => {

            console.log(req.body)
            try {
                await new UserService().uploadProfilePhoto(req.body.image, req.body.token)
                res.sendStatus(200);
            } catch (e) {
                res.sendStatus(e);
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
            topic.title = req.body.title;
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

        this.app.get(`/${this.topicRouteName}/:id`, async (req: Request, res: Response) => {

            const topicService = new TopicService();
            const topic = await topicService.findById(req.params.id);

            res.send(topic);
        })

        this.app.get(`/${this.topicRouteName}/sortByCategory/:id`, async (req: Request, res: Response) => {

            res.send(await new TopicService().groupByCategory(Number.parseInt(req.params.id)))

        })

        this.app.put(`/${this.topicRouteName}/pin`, async (req: Request, res: Response) => {

            let user = new User();
            user = req.body.user;

            await new TopicService().pinTopic(req.body.topicsId, user);
            res.sendStatus(200);

        })

        this.app.post(`/${this.topicRouteName}/findTopicByUser`, async (req: Request, res: Response) => {
            try {
                res.send(await new TopicService().findTopicsByUser(req.body.token))
            } catch (e) {
                res.send(e);
            }
        })

    }

    protected replyRoute() {
        this.app.post(`/${this.replyRouteName}`, async (req: Request, res: Response) => {
            try {
                const replyService = new ReplyService();
                const user = await new UserService().findByHashId(req.body.idUser);
                await replyService.save(new Replies(req.body.idTopic, user, req.body.title));

                res.sendStatus(200);
            } catch {
                res.sendStatus(500);
            }

        })

        this.app.put(`/${this.replyRouteName}/like/:id`, async (req: Request, res: Response) => {
            try {
                await ReplyService.incrementLike(req.params.id)
                res.sendStatus(200);
            } catch {
                res.sendStatus(500);
            }
        })


        this.app.post(`/${this.replyRouteName}/findRepliesByUser`, async (req: Request, res: Response) => {
            try {
                res.send(await new ReplyService().findAnswers(req.body.token))
            } catch (e) {
                res.send(e)
            }
        })
    }

    protected messageRoute() {
        this.app.post(`/${this.messageRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new MessageService().save(new Message(req.body.senderId, req.body.receiverId, req.body.message)))
            } catch (e) {
                res.sendStatus(500);
            }
        })

        this.app.post(`/${this.messageRouteName}/getChats`, async (req: Request, res: Response) => {
            try {
                const user = await new UserService().findByHashId(req.body.id);
                res.send(await new MessageService().groupMessageByUser(user))
            } catch (e) {
                res.sendStatus(500);
            }
        })

        this.app.post(`/${this.messageRouteName}/get`, async (req: Request, res: Response) => {
            try {

                res.send(await new MessageService().getAll(req.body.senderId, req.body.receiverId));
            } catch (e) {
                res.sendStatus(500);
            }
        })

        this.app.post(`/${this.messageRouteName}/unread`, async (req: Request, res: Response) => {
            try {
                res.send(await new MessageService().findUnreadMessages(await new UserService().findByHashId(req.body.id)));
            } catch (e) {
                res.send(e);
            }
        })
    }

}
