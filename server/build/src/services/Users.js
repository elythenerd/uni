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
exports.createUsers = createUsers;
exports.getUsers = getUsers;
const Users_1 = __importDefault(require("../../models/Users"));
function createUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            // console.log(Object.keys().)
            yield Users_1.default.create(user);
            res.json().status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(Users_1.default);
            const users = yield Users_1.default.get();
            res.send(users).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
