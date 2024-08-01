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
const CoursesSchema = new mongoose_1.Schema({
    Id: { type: String, require: true, unique: true },
    Name: { type: String, require: true },
    TeacherId: { type: String, require: true },
    SubjectId: { type: String, require: true },
    enrollementYear: { type: String },
    Status: { type: Boolean, require: true }
});
class Courses {
    constructor() {
        this.courses = mongoose_2.default.model('Courses', CoursesSchema);
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courses.create(body);
        });
    }
    get() {
        return __awaiter(this, arguments, void 0, function* (object = {}) {
            return this.courses.find(object);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courses.findOneAndUpdate({ Id: id }, { Status: false }, { new: true });
        });
    }
    aggregate(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courses.aggregate(body);
        });
    }
}
exports.default = new Courses();
