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
exports.deleteCourseParticipant = deleteCourseParticipant;
exports.getCourseParticipants = getCourseParticipants;
exports.getAllCourseParticipants = getAllCourseParticipants;
exports.createManyCourseParticipants = createManyCourseParticipants;
exports.getAvgGrades = getAvgGrades;
exports.getPieGrades = getPieGrades;
exports.getAvgGrade = getAvgGrade;
const CourseParticipants_1 = __importDefault(require("../../models/CourseParticipants"));
const __1 = require("..");
const Students_1 = __importDefault(require("../../models/Students"));
function createCourseParticipant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(CourseParticipants)
            const coursePrticipant = req.body;
            const cp = yield CourseParticipants_1.default.create(coursePrticipant);
            const student = yield Students_1.default.aggregate([
                {
                    '$match': {
                        'Id': cp.StudentId
                    }
                }
            ]);
            res.json().status(200);
            // console.log(student)
            __1.io.addCp(student[0]);
            __1.io.removeStudentOption(student[0]);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function deleteCourseParticipant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(CourseParticipants_1.default);
            const id = req.params.id;
            const courseId = req.params.courseId;
            // const courseParticipants  = await CourseParticipants.get()
            const cp = yield Students_1.default.aggregate([
                {
                    '$match': {
                        'Id': id
                    }
                }
            ]);
            yield CourseParticipants_1.default.delete({ StudentId: id, CourseId: courseId });
            console.log(cp);
            res.json().status(200);
            __1.io.removeCp(cp[0]);
            __1.io.addStudentOption(cp[0]);
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
            const coursePrticipantsId = req.params.id;
            const coursePrticipants = yield CourseParticipants_1.default.get({ CourseId: coursePrticipantsId });
            res.send(coursePrticipants).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getAllCourseParticipants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(CourseParticipants_1.default);
            const coursePrticipants = yield CourseParticipants_1.default.get();
            res.send(coursePrticipants).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
        // export async function getAllCourseParticipants(req: Request, res: Response) {
        //     try {
        //         console.log(CourseParticipants)
        //         const coursePrticipants:cpInterface[] = await CourseParticipants.get()  
        //         res.send(coursePrticipants).status(200)
        //     }catch (e){
        //         res.send(e).status(400)
        //     }
    });
}
function createManyCourseParticipants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const coursePrticipants = req.body;
            const cp = yield CourseParticipants_1.default.createMany(coursePrticipants);
            const courseId = cp[0].CourseId;
            const studentIds = cp.map((cp) => { return cp.StudentId; });
            const pieGrades = yield CourseParticipants_1.default.aggregate([{
                    '$addFields': {
                        'gradeInt': {
                            '$toInt': '$Grade'
                        }
                    }
                }, {
                    '$group': {
                        '_id': {
                            'StudentId': '$StudentId',
                            'CourseId': '$CourseId'
                        },
                        'avgGrade': {
                            '$avg': '$gradeInt'
                        }
                    }
                }, {
                    '$project': {
                        'StudentId': '$_id.StudentId',
                        'CourseId': '$_id.CourseId',
                        'avgGrade': 1,
                        '_id': 0
                    }
                },
                {
                    '$match': {
                        'CourseId': courseId
                    }
                }, {
                    '$group': {
                        '_id': {
                            '$switch': {
                                'branches': [
                                    {
                                        'case': {
                                            '$eq': [
                                                '$avgGrade', null
                                            ]
                                        },
                                        'then': 'null'
                                    }, {
                                        'case': {
                                            '$lte': [
                                                '$avgGrade', 55
                                            ]
                                        },
                                        'then': '<55'
                                    }, {
                                        'case': {
                                            '$lte': [
                                                '$avgGrade', 70
                                            ]
                                        },
                                        'then': '55-70'
                                    }, {
                                        'case': {
                                            '$lte': [
                                                '$avgGrade', 84
                                            ]
                                        },
                                        'then': '70-84'
                                    }, {
                                        'case': {
                                            '$lte': [
                                                '$avgGrade', 100
                                            ]
                                        },
                                        'then': '85-100'
                                    }
                                ],
                                'default': 'other'
                            }
                        },
                        'count': {
                            '$sum': 1
                        }
                    }
                }, {
                    '$addFields': {
                        'color': {
                            '$switch': {
                                'branches': [
                                    {
                                        'case': {
                                            '$eq': [
                                                '$_id', '<55'
                                            ]
                                        },
                                        'then': 'red'
                                    }, {
                                        'case': {
                                            '$eq': [
                                                '$_id', '55-70'
                                            ]
                                        },
                                        'then': 'yellow'
                                    }, {
                                        'case': {
                                            '$eq': [
                                                '$_id', '70-84'
                                            ]
                                        },
                                        'then': 'orange'
                                    }, {
                                        'case': {
                                            '$eq': [
                                                '$_id', '85-100'
                                            ]
                                        },
                                        'then': 'green'
                                    }
                                ],
                                'default': 'other'
                            }
                        }
                    }
                }
            ]);
            const students = yield Students_1.default.aggregate([
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
                        'CourseId': courseId
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
                }, {
                    '$match': {
                        'Id': {
                            '$in': studentIds
                        }
                    }
                }
            ]);
            res.json().status(200);
            console.log(students, studentIds);
            __1.io.addGrade(students);
            __1.io.pieGrades(pieGrades);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getAvgGrades(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(Students)
            // const CourseId = req.params.id
            const avgGrades = (yield CourseParticipants_1.default.aggregate([
                {
                    '$lookup': {
                        'from': 'avgGradeView',
                        'localField': 'Id',
                        'foreignField': '_id',
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
                        'Grade': '$result.avgGrade'
                    }
                }
            ]));
            res.send(avgGrades).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getPieGrades(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(Students)
            const CourseId = req.params.id;
            const pieGrades = yield CourseParticipants_1.default.aggregate([{
                    '$addFields': {
                        'gradeInt': {
                            '$toInt': '$Grade'
                        }
                    }
                }, {
                    '$group': {
                        '_id': {
                            'StudentId': '$StudentId',
                            'CourseId': '$CourseId'
                        },
                        'avgGrade': {
                            '$avg': '$gradeInt'
                        }
                    }
                }, {
                    '$project': {
                        'StudentId': '$_id.StudentId',
                        'CourseId': '$_id.CourseId',
                        'avgGrade': 1,
                        '_id': 0
                    }
                },
                {
                    '$match': {
                        'CourseId': CourseId
                    }
                }, {
                    '$group': {
                        '_id': {
                            '$switch': {
                                'branches': [
                                    {
                                        'case': {
                                            '$eq': [
                                                '$avgGrade', null
                                            ]
                                        },
                                        'then': 'null'
                                    }, {
                                        'case': {
                                            '$lte': [
                                                '$avgGrade', 55
                                            ]
                                        },
                                        'then': '<55'
                                    }, {
                                        'case': {
                                            '$lte': [
                                                '$avgGrade', 70
                                            ]
                                        },
                                        'then': '55-70'
                                    }, {
                                        'case': {
                                            '$lte': [
                                                '$avgGrade', 84
                                            ]
                                        },
                                        'then': '70-84'
                                    }, {
                                        'case': {
                                            '$lte': [
                                                '$avgGrade', 100
                                            ]
                                        },
                                        'then': '85-100'
                                    }
                                ],
                                'default': 'other'
                            }
                        },
                        'count': {
                            '$sum': 1
                        }
                    }
                }, {
                    '$addFields': {
                        'color': {
                            '$switch': {
                                'branches': [
                                    {
                                        'case': {
                                            '$eq': [
                                                '$_id', '<55'
                                            ]
                                        },
                                        'then': 'red'
                                    }, {
                                        'case': {
                                            '$eq': [
                                                '$_id', '55-70'
                                            ]
                                        },
                                        'then': 'yellow'
                                    }, {
                                        'case': {
                                            '$eq': [
                                                '$_id', '70-84'
                                            ]
                                        },
                                        'then': 'orange'
                                    }, {
                                        'case': {
                                            '$eq': [
                                                '$_id', '85-100'
                                            ]
                                        },
                                        'then': 'green'
                                    }
                                ],
                                'default': 'other'
                            }
                        }
                    }
                }
            ]);
            res.send(pieGrades).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getAvgGrade(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(Students)
            const CourseId = req.params.id;
            const avgGrades = (yield CourseParticipants_1.default.aggregate([
                {
                    '$addFields': {
                        'gradeInt': {
                            '$toInt': '$Grade'
                        }
                    }
                }, {
                    '$group': {
                        '_id': {
                            'CourseId': '$CourseId'
                        },
                        'avgGrade': {
                            '$avg': '$gradeInt'
                        }
                    }
                }, {
                    '$project': {
                        '_id': '$_id.CourseId',
                        'avgGrade': 1
                    }
                }, {
                    '$match': {
                        '_id': CourseId
                    }
                }
            ]));
            res.send(avgGrades).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
