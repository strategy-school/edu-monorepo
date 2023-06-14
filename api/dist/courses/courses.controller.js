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
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const course_schema_1 = require("../schemas/course.schema");
const mongoose_2 = require("mongoose");
const create_course_dto_1 = require("./create-course.dto");
const token_auth_guard_1 = require("../auth/token-auth.guard");
const permit_guard_1 = require("../auth/permit.guard");
let CoursesController = class CoursesController {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    getAll() {
        return this.courseModel.find({}, 'title duration');
    }
    async getOneCourse(id) {
        const course = await this.courseModel.findById(id);
        if (!course) {
            throw new common_1.NotFoundException();
        }
        return course;
    }
    async createCourse(courseData) {
        const course = new this.courseModel({
            title: courseData.title,
            description: courseData.description,
            price: parseFloat(courseData.price),
            type: courseData.type,
            duration: courseData.duration,
        });
        return course.save();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getOneCourse", null);
__decorate([
    (0, common_1.UseGuards)(token_auth_guard_1.TokenAuthGuard, permit_guard_1.PermitGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "createCourse", null);
CoursesController = __decorate([
    (0, common_1.Controller)('courses'),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CoursesController);
exports.CoursesController = CoursesController;
//# sourceMappingURL=courses.controller.js.map