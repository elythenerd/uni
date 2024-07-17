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
exports.createTeachersSubject = createTeachersSubject;
exports.getTeachersSubject = getTeachersSubject;
const TeachersSubjects_1 = __importDefault(require("../../models/TeachersSubjects"));
function createTeachersSubject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teachersSubjects = req.body;
            // console.log(Object.keys().)
            yield TeachersSubjects_1.default.create(teachersSubjects);
            res.json().status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getTeachersSubject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(TeachersSubjects_1.default);
            const teachersSubjects = yield TeachersSubjects_1.default.get();
            res.send(teachersSubjects).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
