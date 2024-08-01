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
exports.deleteCourse = deleteCourse;
exports.getCourseNames = getCourseNames;
exports.getCourseNamesByteacherId = getCourseNamesByteacherId;
const Courses_1 = __importDefault(require("../../models/Courses"));
const __1 = require("..");
const Subjects_1 = __importDefault(require("../../models/Subjects"));
const Users_1 = __importDefault(require("../../models/Users"));
function createCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(Courses_1.default);
            const courses = req.body;
            const course = yield Courses_1.default.create(courses);
            const subjectName = yield Subjects_1.default.get({ Id: courses.SubjectId });
            const teacherName = yield Users_1.default.get({ Id: courses.TeacherId });
            console.log(subjectName);
            res.json().status(200);
            __1.io.addCourse(Object.assign(Object.assign({}, courses), { SubjectName: subjectName[0].Name, TeacherName: teacherName[0].Name }));
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
function deleteCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(Courses_1.default);
            const courseId = req.params.id;
            const course = yield Courses_1.default.delete(courseId);
            __1.io.removeCourse(course);
            res.send(courseId).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getCourseNames(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(Courses_1.default);
            // const teacherId = req.params.id
            const courses = yield Courses_1.default.aggregate([
                {
                    '$lookup': {
                        'from': 'subjects',
                        'localField': 'SubjectId',
                        'foreignField': 'Id',
                        'as': 'result'
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'TeacherId',
                        'foreignField': 'Id',
                        'as': 'result2'
                    }
                }, {
                    '$project': {
                        'Id': 1,
                        'Name': 1,
                        'Status': 1,
                        'TeacherId': 1,
                        'SubjectId': 1,
                        'enrollementYear': 1,
                        'SubjectName': {
                            '$arrayElemAt': [
                                '$result.Name', 0
                            ]
                        },
                        'TeacherName': {
                            '$arrayElemAt': [
                                '$result2.Name', 0
                            ]
                        }
                    }
                }
            ]);
            res.send(courses).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getCourseNamesByteacherId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(Courses_1.default);
            const teacherId = req.params.id;
            const courses = yield Courses_1.default.aggregate([
                {
                    '$lookup': {
                        'from': 'subjects',
                        'localField': 'SubjectId',
                        'foreignField': 'Id',
                        'as': 'result'
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'TeacherId',
                        'foreignField': 'Id',
                        'as': 'result2'
                    }
                }, {
                    '$project': {
                        'Id': 1,
                        'Name': 1,
                        'Status': 1,
                        'TeacherId': 1,
                        'SubjectId': 1,
                        'SubjectName': {
                            '$arrayElemAt': [
                                '$result.Name', 0
                            ]
                        },
                        'TeacherName': {
                            '$arrayElemAt': [
                                '$result2.Name', 0
                            ]
                        }
                    }
                },
                {
                    '$match': {
                        'TeacherId': teacherId
                    }
                }
            ]);
            res.send(courses).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
