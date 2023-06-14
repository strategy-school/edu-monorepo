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
exports.RegistrationGuard = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../schemas/user.schema");
const mongoose_2 = require("mongoose");
let RegistrationGuard = class RegistrationGuard {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const isUserRegisteredByEmail = await this.userModel.findOne({
            email: user.email,
        });
        if (isUserRegisteredByEmail) {
            throw new common_1.InternalServerErrorException({
                message: 'User with this email has already registered!',
            });
        }
        const isUserRegisteredByPhone = await this.userModel.findOne({
            phoneNumber: user.phoneNumber,
        });
        if (isUserRegisteredByPhone) {
            throw new common_1.InternalServerErrorException({
                message: 'User with this phone-number has already registered!',
            });
        }
        return true;
    }
};
RegistrationGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RegistrationGuard);
exports.RegistrationGuard = RegistrationGuard;
//# sourceMappingURL=registration.guard.js.map