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
exports.deleteTeachersSubject = deleteTeachersSubject;
exports.getTeachersSubjectOptions = getTeachersSubjectOptions;
const TeachersSubjects_1 = __importDefault(require("../../models/TeachersSubjects"));
const index_1 = require("../index");
function createTeachersSubject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teachersSubjects = req.body;
            // console.log(Object.keys().)
            // await TeachersSubjects.create(teachersSubjects)
            yield TeachersSubjects_1.default.update({
                TeacherId: teachersSubjects.TeacherId,
                SubjectId: teachersSubjects.SubjectId
            }, { $set: teachersSubjects }, { new: true, upsert: true });
            console.log('this is');
            res.json().status(200);
            index_1.io.addTeacherSubject(teachersSubjects);
        }
        catch (e) {
            console.log(e);
            res.send(e).status(400);
        }
    });
}
function getTeachersSubject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(TeachersSubjects)
            const teachersSubjects = yield TeachersSubjects_1.default.get();
            res.send(teachersSubjects).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function deleteTeachersSubject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(Subjects)
            const teacherSubjectId = req.params.id;
            const teacherSubject = yield TeachersSubjects_1.default.update({ Id: teacherSubjectId }, { Active: false }, { new: true });
            res.send(teacherSubjectId).status(200);
            // const teacherSubjects = TeachersSubjects.get()
            // teacherSubject
            index_1.io.removeTeacherSubject(teacherSubject);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getTeachersSubjectOptions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(Subjects)
            const year = req.params.year;
            const teacherId = req.params.id;
            const teacherSubjects = yield TeachersSubjects_1.default.aggregation([
                {
                    '$lookup': {
                        'from': 'subjects',
                        'localField': 'SubjectId',
                        'foreignField': 'Id',
                        'as': 'result'
                    }
                },
                {
                    '$unwind': {
                        'path': '$result',
                        'preserveNullAndEmptyArrays': true
                    }
                },
                {
                    '$match': {
                        'TeacherId': teacherId
                    }
                },
                {
                    '$project': {
                        '_id': 1,
                        'Id': '$SubjectId',
                        'TeacherId': 1,
                        'Name': '$result.Name',
                        'enrollementYear': '$result.enrollementYear'
                    }
                },
                {
                    '$lookup': {
                        'from': 'courses',
                        'localField': 'Name',
                        'foreignField': 'Name',
                        'as': 'result'
                    }
                },
                {
                    '$match': {
                        'result.enrollementYear': { '$ne': year } // Replace with the year to match
                    }
                }
            ]);
            res.send(teacherSubjects).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
