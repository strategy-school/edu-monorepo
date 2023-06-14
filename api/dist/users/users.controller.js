"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../schemas/user.schema");
const mongoose_2 = require("mongoose");
const platform_express_1 = require("@nestjs/platform-express");
const create_users_dto_1 = require("./create-users.dto");
const passport_1 = require("@nestjs/passport");
let UsersController = class UsersController {
    constructor(userModel) {
        this.userModel = userModel;
    }
    registerUser(file, userDto) {
        const user = new this.userModel({
            email: userDto.email,
            password: userDto.password,
            firstName: userDto.firstName,
            lastName: userDto.lastName,
            phoneNumber: userDto.phoneNumber,
            courses: [],
            avatar: file ? '/uploads/avatars/' + file.filename : null,
        });
        user.generateToken();
        return user.save();
    }
    login(req) {
        const user = req.user;
        return { message: 'Login successfully', user };
    }
    async logout(req) {
        const token = req.get('Authorization');
        const success = { message: 'OK' };
        if (!token) {
            return success;
        }
        const user = await this.userModel.findOne({ token });
        if (!user) {
            return success;
        }
        user.generateToken();
        await user.save();
        return { message: 'Logged out successfully' };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', { dest: './public/uploads/avatars' })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_users_dto_1.CreateUsersDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "registerUser", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('sessions'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Delete)('sessions'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map