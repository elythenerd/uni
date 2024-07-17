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
exports.createStudents = createStudents;
exports.getStudents = getStudents;
const Students_1 = __importDefault(require("../../models/Students"));
function createStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(Students_1.default);
            const students = req.body;
            yield Students_1.default.create(students);
            res.json().status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(Students_1.default);
            const students = yield Students_1.default.get();
            res.send(students).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
