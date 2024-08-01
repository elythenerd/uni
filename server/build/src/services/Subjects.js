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
exports.createSubject = createSubject;
exports.getSubjects = getSubjects;
exports.deleteSubject = deleteSubject;
exports.getSubjectOptions = getSubjectOptions;
const Subjects_1 = __importDefault(require("../../models/Subjects"));
const __1 = require("..");
function createSubject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(Subjects)
            const subject = req.body;
            const Subject = yield Subjects_1.default.update({
                Name: subject.Name
            }, {
                $set: { Active: true },
                $setOnInsert: Object.assign(Object.assign({}, subject), { Active: undefined })
            }, { new: true, upsert: true });
            res.json().status(200);
            if (subject.Id === (Subject === null || Subject === void 0 ? void 0 : Subject.Id)) {
                __1.io.addSubject(Subject);
            }
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getSubjects(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(Subjects)
            const subjects = yield Subjects_1.default.get();
            res.send(subjects).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function deleteSubject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(Subjects)
            const subjectsId = req.params.id;
            const subject = yield Subjects_1.default.update({ Id: subjectsId }, { Active: false }, { new: true });
            res.send(subjectsId).status(200);
            __1.io.removeSubject(subject);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getSubjectOptions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(Subjects)
            const teacherId = req.params.id;
            const subjects = yield Subjects_1.default.aggregate([
                {
                    '$lookup': {
                        'from': 'teacherssubjects',
                        'localField': 'Id',
                        'foreignField': 'SubjectId',
                        'as': 'result'
                    }
                }, {
                    '$unwind': {
                        'path': '$result',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$project': {
                        '_id': 1,
                        'Id': 1,
                        'Name': 1,
                        'teacherId': '$result.TeacherId',
                        'Active': 1
                    }
                }, {
                    '$match': {
                        'teacherId': {
                            '$ne': teacherId
                        }
                    }
                }, {
                    '$project': {
                        '_id': 1,
                        'Id': 1,
                        'Name': 1,
                        'Active': 1
                    }
                }
            ]);
            console.log(subjects, 1);
            res.send(subjects).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
