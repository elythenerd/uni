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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const cpSchema = new mongoose_1.Schema({
    CourseId: { type: String, require: true },
    StudentId: { type: String, require: true },
    Grade: { type: String, require: true }
    //    Active:{type: Boolean,required:true}
});
class CourseParticipants {
    constructor() {
        this.courseParticipants = mongoose_2.default.model('courseParticipants', cpSchema);
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courseParticipants.create(body);
        });
    }
    get() {
        return __awaiter(this, arguments, void 0, function* (body = {}) {
            return this.courseParticipants.find(body);
        });
    }
    createMany(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courseParticipants.insertMany(body);
        });
    }
    updateMany() {
        return __awaiter(this, arguments, void 0, function* (filter = {}, update = {}, how = {}) {
            return this.courseParticipants.findOneAndUpdate(filter, update, how);
        });
    }
    aggregate(pipeline) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courseParticipants.aggregate(pipeline);
        });
    }
    delete() {
        return __awaiter(this, arguments, void 0, function* (find = {}) {
            return this.courseParticipants.deleteMany(find);
        });
    }
}
exports.default = new CourseParticipants();
