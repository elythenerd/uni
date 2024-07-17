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
const studentsSchema = new mongoose_1.Schema({
    Id: { type: String, require: true, unique: true },
    Name: { type: String, require: true },
    BirthYear: { type: String, require: true },
    Status: { type: Boolean, require: true }
});
// const users = 
class Students {
    constructor() {
        this.students = mongoose_2.default.model('Students', studentsSchema);
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.students.create(body);
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.students.find();
        });
    }
}
exports.default = new Students();