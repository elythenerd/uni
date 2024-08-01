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
const SubjectsSchema = new mongoose_1.Schema({
    Id: { type: String, require: true, unique: true },
    Name: { type: String, require: true },
    Active: { type: Boolean, require: true }
});
class Subjects {
    constructor() {
        this.subjects = mongoose_2.default.model('Subjects', SubjectsSchema);
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subjects.create(body);
        });
    }
    get() {
        return __awaiter(this, arguments, void 0, function* (body = {}) {
            return this.subjects.find(body);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subjects.findOneAndUpdate({ Id: id }, { Active: false }, { new: true });
        });
    }
    update() {
        return __awaiter(this, arguments, void 0, function* (expression = {}, apply = {}, how = {}) {
            return this.subjects.findOneAndUpdate(expression, apply, how);
        });
    }
    aggregate(pipeline) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subjects.aggregate(pipeline);
        });
    }
}
exports.default = new Subjects();
