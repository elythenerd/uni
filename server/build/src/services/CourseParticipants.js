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
exports.createCourseParticipant = createCourseParticipant;
exports.getCourseParticipants = getCourseParticipants;
const CourseParticipants_1 = __importDefault(require("../../models/CourseParticipants"));
function createCourseParticipant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(CourseParticipants_1.default);
            const coursePrticipant = req.body;
            yield CourseParticipants_1.default.create(coursePrticipant);
            res.json().status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getCourseParticipants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(CourseParticipants_1.default);
            const coursePrticipant = yield CourseParticipants_1.default.get();
            res.send(coursePrticipant).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
