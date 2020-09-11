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
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message(senderId, receivedId, message) {
        var _this = _super.call(this) || this;
        _this.isRead = false;
        _this.dateAndTime = new Date().toUTCString();
        _this.message = message;
        _this.senderId = senderId;
        _this.receiverId = receivedId;
        return _this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Message.prototype, "id");
    __decorate([
        typeorm_1.Column({ length: 10240 })
    ], Message.prototype, "message");
    __decorate([
        typeorm_1.Column()
    ], Message.prototype, "dateAndTime");
    __decorate([
        typeorm_1.Column()
    ], Message.prototype, "isRead");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (message) { return message.listOfSentMessages; })
    ], Message.prototype, "senderId");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (message) { return message.listOfReceivedMessages; })
    ], Message.prototype, "receiverId");
    Message = __decorate([
        typeorm_1.Entity()
    ], Message);
    return Message;
}(typeorm_1.BaseEntity));
exports.Message = Message;
