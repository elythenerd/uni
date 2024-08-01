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
exports.deleteStudents = deleteStudents;
exports.getCourseStudents = getCourseStudents;
exports.getAvgGrades = getAvgGrades;
exports.getAddStudentCourseOptions = getAddStudentCourseOptions;
const Students_1 = __importDefault(require("../../models/Students"));
const __1 = require("..");
function createStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Students');
            const students = req.body;
            const student = yield Students_1.default.update({ Id: students.Id }, {
                $set: { Status: true, Name: students.Name, BirthYear: students.BirthYear },
                $setOnInsert: Object.assign(Object.assign({}, students), { Status: undefined, Name: undefined, BirthYear: undefined })
            }, { new: true, upsert: true });
            res.status(200).json(students);
            // if (students.Id!== student?.Id){
            __1.io.addStudent(student);
            // }
        }
        catch (e) {
            res.status(400).send(e);
        }
    });
}
function getStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(Students)
            const students = yield Students_1.default.get();
            res.send(students).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function deleteStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(Subjects)
            const studentId = req.params.id;
            const student = yield Students_1.default.update({ Id: studentId }, { Status: false }, { new: true });
            res.send(studentId).status(200);
            __1.io.removeStudent(student);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getCourseStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(Students_1.default);
            const CourseId = req.params.id;
            const students = yield Students_1.default.aggregate([
                {
                    '$lookup': {
                        'from': 'courseparticipants',
                        'localField': 'Id',
                        'foreignField': 'StudentId',
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
                        'BirthYear': 1,
                        '__v': 1,
                        'CourseId': '$result.CourseId'
                    }
                }, {
                    '$match': {
                        'CourseId': CourseId
                    }
                }
            ]);
            res.send(students).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getAvgGrades(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            // console.log(Students)
            // const CourseId = req.params.id
            const avgGrades = yield Students_1.default.aggregate([
                {
                    '$lookup': {
                        'from': 'AvgGradeView',
                        'localField': 'Id',
                        'foreignField': 'StudentId',
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
                        'BirthYear': 1,
                        'Status': 1,
                        'Grade': '$result.avgGrade',
                        'CourseId': '$result.CourseId'
                    }
                }, {
                    '$match': {
                        'CourseId': id
                    }
                },
                {
                    '$project': {
                        'Id': 1,
                        'Name': 1,
                        'BirthYear': 1,
                        'Status': 1,
                        'Grade': 1
                    }
                }
            ]);
            res.send(avgGrades).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getAddStudentCourseOptions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const id = req.params.id
        try {
            // console.log(Students)
            const CourseId = req.params.id;
            const year = req.params.year;
            const avgGrades = yield Students_1.default.aggregate([
                {
                    '$lookup': {
                        'from': 'courseparticipants',
                        'localField': 'Id',
                        'foreignField': 'StudentId',
                        'as': 'result'
                    }
                }, {
                    '$match': {
                        'result.CourseId': {
                            '$ne': CourseId
                        }
                    }
                }, {
                    '$project': {
                        '_id': 1,
                        'Id': 1,
                        'Name': 1,
                        'BirthYear': 1,
                        'Status': 1
                    }
                }, {
                    '$match': {
                        'BirthYear': year
                    }
                }
            ]);
            res.send(avgGrades).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
