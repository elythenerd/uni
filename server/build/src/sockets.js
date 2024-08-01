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
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class sockets {
    constructor(server) {
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: ['http://localhost:5173']
            }
        });
        this.io.on('connection', (socket) => {
            console.log('user connected', socket.id);
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('addUser', { user });
        });
    }
    deleteUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('deleteUser', { user });
        });
    }
    addGrade(grade) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('addGrade', { grade });
        });
    }
    addTeacherSubject(teacherSubject) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('addTeacherSubject', { teacherSubject });
        });
    }
    removeTeacherSubject(teacherSubject) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('removeTeacherSubject', { teacherSubject });
        });
    }
    addStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('addStudent', { student });
        });
    }
    removeStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('removeStudent', { student });
        });
    }
    addCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('addCourse', { course });
        });
    }
    removeCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('removeCourse', { course });
        });
    }
    addSubject(subject) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('addSubject', { subject });
        });
    }
    removeSubject(subject) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('removeSubject', { subject });
        });
    }
    addCp(cp) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('addCp', { cp });
        });
    }
    removeCp(cp) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('removeCp', { cp });
        });
    }
    removeStudentOption(student) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('removeStudentOption', { student });
        });
    }
    addStudentOption(student) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('addStudentOption', { student });
        });
    }
    pieGrades(pieGrades) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('pieGrades', { pieGrades });
        });
    }
}
exports.default = sockets;
