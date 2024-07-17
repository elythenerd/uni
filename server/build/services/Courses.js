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
exports.createCourse = createCourse;
exports.getCourses = getCourses;
const Courses_1 = __importDefault(require("../models/Courses"));
function createCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(Courses_1.default);
            const courses = req.body;
            yield Courses_1.default.create(courses);
            res.json().status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getCourses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(Courses_1.default);
            const courses = yield Courses_1.default.get();
            res.send(courses).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
