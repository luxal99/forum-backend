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
var TopicsCategory = /** @class */ (function (_super) {
    __extends(TopicsCategory, _super);
    function TopicsCategory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], TopicsCategory.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], TopicsCategory.prototype, "title");
    __decorate([
        typeorm_1.Column()
    ], TopicsCategory.prototype, "color");
    __decorate([
        typeorm_1.OneToMany(function (type) { return Topics_1.Topics; }, function (listOfTopics) { return listOfTopics.idTopicsCategory; })
    ], TopicsCategory.prototype, "listOfTopics");
    TopicsCategory = __decorate([
        typeorm_1.Entity()
    ], TopicsCategory);
    return TopicsCategory;
}(typeorm_1.BaseEntity));
exports.TopicsCategory = TopicsCategory;
