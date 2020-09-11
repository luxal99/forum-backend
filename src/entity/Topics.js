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
var User_1 = require("./User");
var TopicsCategory_1 = require("./TopicsCategory");
var Replies_1 = require("./Replies");
var Topics = /** @class */ (function (_super) {
    __extends(Topics, _super);
    function Topics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Topics.prototype, "id");
    __decorate([
        typeorm_1.Column({ length: 10240 })
    ], Topics.prototype, "title");
    __decorate([
        typeorm_1.Column({ length: 10240 })
    ], Topics.prototype, "question");
    __decorate([
        typeorm_1.Column()
    ], Topics.prototype, "date");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (id) { return id.listOfTopics; })
    ], Topics.prototype, "idUser");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return TopicsCategory_1.TopicsCategory; }, function (id) { return id.listOfTopics; })
    ], Topics.prototype, "idTopicsCategory");
    __decorate([
        typeorm_1.OneToMany(function (type) { return Replies_1.Replies; }, function (listOfReplies) { return listOfReplies.idTopics; })
    ], Topics.prototype, "listOfReplies");
    __decorate([
        typeorm_1.ManyToMany(function (type) { return User_1.User; }, function (user) { return user.listOfPinnedTopics; }),
        typeorm_1.JoinTable()
    ], Topics.prototype, "listOfUsersWhichPinnedTopic");
    Topics = __decorate([
        typeorm_1.Entity()
    ], Topics);
    return Topics;
}(typeorm_1.BaseEntity));
exports.Topics = Topics;
