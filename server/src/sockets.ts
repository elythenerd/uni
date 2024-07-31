import { Server } from 'socket.io'
import http from 'http'
import { userInterface } from '../types/users'
import { cpInterface, PieGradesInterface } from '../types/courseParticipants'
import { TsInterface } from '../types/teachersSubjects'
import { studentInterface } from '../types/student'
import { cousresInterface } from '../types/courses'
import { subjectInterface } from '../types/subject'
class sockets {
    private io: Server
    constructor(server: http.Server) {
        this.io = new Server(server, {
            cors: {
                origin: ['http://localhost:5173']
            }
        })
        this.io.on('connection', (socket) => {
            console.log('user connected', socket.id)
            socket.on('disconnect', () => {
                console.log('user disconnected')
            })
        })
    }
    async addUser(user: userInterface) {
        this.io.emit('addUser', { user })
    }
    async deleteUser(user: userInterface) {
        this.io.emit('deleteUser', { user })
    }
    async addGrade(grade: studentInterface[]) {
        this.io.emit('addGrade', { grade })
    }
    async addTeacherSubject(teacherSubject: TsInterface) {
        this.io.emit('addTeacherSubject', { teacherSubject })
    }
    async removeTeacherSubject(teacherSubject: TsInterface) {
        this.io.emit('removeTeacherSubject', { teacherSubject })
    }
    async addStudent(student: studentInterface) {
        this.io.emit('addStudent', { student })
    }
    async removeStudent(student: studentInterface|null) {
        this.io.emit('removeStudent', { student })
    }
    async addCourse(course: cousresInterface) {
        this.io.emit('addCourse', { course })
    }
    async removeCourse(course: cousresInterface) {
        this.io.emit('removeCourse', { course })
    }
    async addSubject(subject: subjectInterface) {
        this.io.emit('addSubject', { subject })
    }
    async removeSubject(subject: subjectInterface) {
        this.io.emit('removeSubject', { subject })
    }
    async addCp(cp: studentInterface) {
        this.io.emit('addCp', { cp })
    }
    async removeCp(cp: studentInterface) {
        this.io.emit('removeCp', { cp })
    }
    async removeStudentOption(student: studentInterface) {
        this.io.emit('removeStudentOption', { student })
    }
    async addStudentOption(student: studentInterface) {
        this.io.emit('addStudentOption', { student })
    }
    async pieGrades(pieGrades: PieGradesInterface[]) {
        this.io.emit('pieGrades', { pieGrades })
    }



}

export default sockets