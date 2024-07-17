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
const UsersSchema = new mongoose_1.Schema({
    Id: { type: String, require: true, unique: true },
    Name: { type: String, require: true },
    Password: { type: String, require: true },
    Gender: { type: String, require: true },
    BirthDate: { type: String, require: true },
    Job: { type: String, require: true },
    Active: { type: Boolean, require: true }
});
// const users = 
class Users {
    constructor() {
        this.users = mongoose_2.default.model('Users', UsersSchema);
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.create(body);
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find();
        });
    }
}
exports.default = new Users();
