"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var UserInfo_1 = require("./UserInfo");
var Topics_1 = require("./Topics");
var Replies_1 = require("./Replies");
var Message_1 = require("./Message");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(username, password, idUserInfo) {
        var _this = _super.call(this) || this;
        _this.username = username;
        _this.password = password;
        _this.idUserInfo = idUserInfo;
        _this.profilePicture = 'https://firebasestorage.googleapis.com/v0/b/soy-smile-249718.appspot.com/o/defult_image.png?alt=media&token=5a50dd1b-7f31-4bdd-909e-5eb1aa1262cb';
        return _this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Index({ unique: true })
    ], User.prototype, "username");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "profilePicture");
    __decorate([
        typeorm_1.OneToOne(function (type) { return UserInfo_1.UserInfo; }),
        typeorm_1.JoinColumn()
    ], User.prototype, "idUserInfo");
    __decorate([
        typeorm_1.OneToMany(function (type) { return Topics_1.Topics; }, function (listOfTopics) { return listOfTopics.idUser; })
    ], User.prototype, "listOfTopics");
    __decorate([
        typeorm_1.OneToMany(function (type) { return Replies_1.Replies; }, function (listOfReplies) { return listOfReplies.idUser; })
    ], User.prototype, "listOfReplies");
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Topics_1.Topics; }, function (topic) { return topic.listOfUsersWhichPinnedTopic; })
    ], User.prototype, "listOfPinnedTopics");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Message_1.Message; }, function (message) { return message.senderId; })
    ], User.prototype, "listOfSentMessages");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Message_1.Message; }, function (message) { return message.receiverId; })
    ], User.prototype, "listOfReceivedMessages");
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}(typeorm_1.BaseEntity));
exports.User = User;
