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
var Topics_1 = require("./Topics");
var User_1 = require("./User");
var Replies = /** @class */ (function (_super) {
    __extends(Replies, _super);
    function Replies(idTopic, idUser, title) {
        var _this = _super.call(this) || this;
        _this.likes = 0;
        _this.idTopics = idTopic;
        _this.idUser = idUser;
        _this.title = title;
        _this.date = new Date().toUTCString();
        return _this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Replies.prototype, "id");
    __decorate([
        typeorm_1.Column({ length: 10240 })
    ], Replies.prototype, "title");
    __decorate([
        typeorm_1.Column()
    ], Replies.prototype, "likes");
    __decorate([
        typeorm_1.Column()
    ], Replies.prototype, "date");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Topics_1.Topics; }, function (id) { return id.listOfReplies; })
    ], Replies.prototype, "idTopics");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (id) { return id.listOfReplies; })
    ], Replies.prototype, "idUser");
    Replies = __decorate([
        typeorm_1.Entity()
    ], Replies);
    return Replies;
}(typeorm_1.BaseEntity));
exports.Replies = Replies;
