"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");
var UserInfo_1 = require("../entity/UserInfo");
var UserService_1 = require("../service/UserService");
var UserInfoService_1 = require("../service/UserInfoService");
var User_1 = require("../entity/User");
var TopicsCategory_1 = require("../entity/TopicsCategory");
var Topics_1 = require("../entity/Topics");
var TopicService_1 = require("../service/TopicService");
var ReplyService_1 = require("../service/ReplyService");
var Replies_1 = require("../entity/Replies");
var Message_1 = require("../entity/Message");
var MessageService_1 = require("../service/MessageService");
var path = require("path");
var cors = require('cors');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var App = /** @class */ (function () {
    function App(userRouteName, categoryRouteName, topicsCategoryName, replyRouteName, messageRouteName) {
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
        this.messageRoute();
    }
    App.prototype.plugins = function () {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(cors());
        this.app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
    };
    App.prototype.userRoute = function () {
        var _this = this;
        this.app.post("/" + this.userRouteName, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userInfo_1, userInfoService, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userInfo_1 = new UserInfo_1.UserInfo(req.body.userInfo.full_name, req.body.userInfo.email);
                        userInfoService = new UserInfoService_1.UserInfoService();
                        return [4 /*yield*/, userInfoService.save(userInfo_1).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                var user, _a, _b, userService;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _a = User_1.User.bind;
                                            _b = [void 0, req.body.user.username];
                                            return [4 /*yield*/, bcrypt.hash(req.body.user.password, 10)];
                                        case 1:
                                            user = new (_a.apply(User_1.User, _b.concat([_c.sent(), userInfo_1])))();
                                            userService = new UserService_1.UserService();
                                            return [4 /*yield*/, userService.save(user)];
                                        case 2:
                                            _c.sent();
                                            res.sendStatus(200);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        res.send(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.app.post("/" + this.userRouteName + "/auth", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user, auth, _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, new UserService_1.UserService().findByName(req.body.username)];
                    case 1:
                        user = _g.sent();
                        _b = user != null;
                        if (!_b) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt.compare(req.body.password, user.password)];
                    case 2:
                        _b = (_g.sent());
                        _g.label = 3;
                    case 3:
                        if (!(_b)) return [3 /*break*/, 5];
                        _d = (_c = res).send;
                        _e = {
                            username: user.username,
                            pinnedTopics: user.listOfPinnedTopics
                        };
                        return [4 /*yield*/, bcrypt.hash(JSON.stringify(user.id), 10)];
                    case 4:
                        _a = _d.apply(_c, [(_e.id = _g.sent(),
                                _e)]);
                        return [3 /*break*/, 6];
                    case 5:
                        _a = res.sendStatus(403);
                        _g.label = 6;
                    case 6:
                        auth = (_a);
                        return [3 /*break*/, 8];
                    case 7:
                        _f = _g.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); });
        this.app.post("/" + this.userRouteName + "/findUserByHash", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).send;
                        return [4 /*yield*/, new UserService_1.UserService().findByHashId(req.body.token)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _c.sent();
                        res.send(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.app.post("/" + this.userRouteName + "/uploadPhoto", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.body);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, new UserService_1.UserService().uploadProfilePhoto(req.body.image, req.body.token)];
                    case 2:
                        _a.sent();
                        res.sendStatus(200);
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        res.sendStatus(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    App.prototype.categoryRoute = function () {
        var _this = this;
        this.app.get("/" + this.categoryRouteName, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        _b = (_a = res).send;
                        return [4 /*yield*/, TopicsCategory_1.TopicsCategory.find()];
                    case 1:
                        _b.apply(_a, [_d.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        _c = _d.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    App.prototype.topicRoute = function () {
        var _this = this;
        this.app.post("/" + this.topicRouteName, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userService, topic, _a, topicService;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userService = new UserService_1.UserService();
                        topic = new Topics_1.Topics();
                        _a = topic;
                        return [4 /*yield*/, userService.findByHashId(req.body.id_user.id)];
                    case 1:
                        _a.idUser = _b.sent();
                        topic.title = req.body.title;
                        topic.idTopicsCategory = req.body.id_category;
                        topic.question = req.body.question;
                        topic.date = new Date().toUTCString();
                        topicService = new TopicService_1.TopicService();
                        return [4 /*yield*/, topicService.save(topic)];
                    case 2:
                        _b.sent();
                        res.sendStatus(200);
                        return [2 /*return*/];
                }
            });
        }); });
        this.app.get("/" + this.topicRouteName, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        _b = (_a = res).send;
                        return [4 /*yield*/, new TopicService_1.TopicService().getAll()];
                    case 1:
                        _b.apply(_a, [_d.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        _c = _d.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.app.get("/" + this.topicRouteName + "/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var topicService, topic;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        topicService = new TopicService_1.TopicService();
                        return [4 /*yield*/, topicService.findById(req.params.id)];
                    case 1:
                        topic = _a.sent();
                        res.send(topic);
                        return [2 /*return*/];
                }
            });
        }); });
        this.app.get("/" + this.topicRouteName + "/sortByCategory/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = res).send;
                        return [4 /*yield*/, new TopicService_1.TopicService().groupByCategory(Number.parseInt(req.params.id))];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/];
                }
            });
        }); });
        this.app.put("/" + this.topicRouteName + "/pin", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new User_1.User();
                        user = req.body.user;
                        return [4 /*yield*/, new TopicService_1.TopicService().pinTopic(req.body.topicsId, user)];
                    case 1:
                        _a.sent();
                        res.sendStatus(200);
                        return [2 /*return*/];
                }
            });
        }); });
        this.app.post("/" + this.topicRouteName + "/findTopicByUser", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, e_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).send;
                        return [4 /*yield*/, new TopicService_1.TopicService().findTopicsByUser(req.body.token)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _c.sent();
                        res.send(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    App.prototype.replyRoute = function () {
        var _this = this;
        this.app.post("/" + this.replyRouteName, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var replyService, user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        replyService = new ReplyService_1.ReplyService();
                        return [4 /*yield*/, new UserService_1.UserService().findByHashId(req.body.idUser)];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, replyService.save(new Replies_1.Replies(req.body.idTopic, user, req.body.title))];
                    case 2:
                        _b.sent();
                        res.sendStatus(200);
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        this.app.put("/" + this.replyRouteName + "/like/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ReplyService_1.ReplyService.incrementLike(req.params.id)];
                    case 1:
                        _b.sent();
                        res.sendStatus(200);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.app.post("/" + this.replyRouteName + "/findRepliesByUser", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, e_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).send;
                        return [4 /*yield*/, new ReplyService_1.ReplyService().findAnswers(req.body.token)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _c.sent();
                        res.send(e_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    App.prototype.messageRoute = function () {
        var _this = this;
        this.app.post("/" + this.messageRouteName, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, e_6;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).send;
                        return [4 /*yield*/, new MessageService_1.MessageService().save(new Message_1.Message(req.body.senderId, req.body.receiverId, req.body.message))];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _c.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.app.post("/" + this.messageRouteName + "/getChats", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user, _a, _b, e_7;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, new UserService_1.UserService().findByHashId(req.body.id)];
                    case 1:
                        user = _c.sent();
                        _b = (_a = res).send;
                        return [4 /*yield*/, new MessageService_1.MessageService().groupMessageByUser(user)];
                    case 2:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 4];
                    case 3:
                        e_7 = _c.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        this.app.post("/" + this.messageRouteName + "/get", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, e_8;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).send;
                        return [4 /*yield*/, new MessageService_1.MessageService().getAll(req.body.senderId, req.body.receiverId)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_8 = _c.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.app.get("/" + this.messageRouteName + "/unread/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c, _d, e_9;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 3, , 4]);
                        _b = (_a = res).send;
                        _d = (_c = new MessageService_1.MessageService()).findUnreadMessages;
                        return [4 /*yield*/, new UserService_1.UserService().findByHashId(req.params.id)];
                    case 1: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
                    case 2:
                        _b.apply(_a, [_e.sent()]);
                        return [3 /*break*/, 4];
                    case 3:
                        e_9 = _e.sent();
                        res.send(e_9);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    return App;
}());
exports.App = App;
