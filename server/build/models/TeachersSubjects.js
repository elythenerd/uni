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
const TeachersSubjectsSchema = new mongoose_1.Schema({
    Id: { type: String, require: true, unique: true },
    TeacherId: { type: String, require: true },
    SubjectId: { type: String, require: true },
    Active: { type: Boolean, required: true }
});
class TeachersSubjects {
    constructor() {
        this.teachersSubjects = mongoose_2.default.model('TeachersSubjects', TeachersSubjectsSchema);
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const TeacherId = body.TeacherId;
            const subjectId = body.SubjectId;
            // console.log(body,'1234567890')
            return this.teachersSubjects.findOneAndUpdate({ TeacherId: TeacherId, SubjectId: subjectId }, { $set: body }, { new: true, upsert: true });
            // return this.teachersSubjects.create(body)
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.teachersSubjects.find();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.teachersSubjects.findOneAndUpdate({ Id: id }, { Active: false }, { new: true });
        });
    }
    update() {
        return __awaiter(this, arguments, void 0, function* (expression = {}, apply = {}, how = {}) {
            return this.teachersSubjects.findOneAndUpdate(expression, apply, how);
        });
    }
    aggregation(pipeline) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.teachersSubjects.aggregate(pipeline);
        });
    }
}
exports.default = new TeachersSubjects();
