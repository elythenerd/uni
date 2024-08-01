import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { io, Socket } from 'socket.io-client';
import { User } from "./types/User";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./store/Users";
import { TeachersSubjects } from "./types/TeachersSubjects";
import { addTeachersSubjects, removeTeachersSubjects } from "./store/TeachersSubjects";
import { StudentsInterface } from "./types/Students";
import { addStudent, deleteStudent } from "./store/students";
import { CourseInterface } from "./types/Course";
import { addCourse, removeCourse } from "./store/courses";
import { Subject } from "./types/Subject";
import { addSubject, removeSubject } from "./store/Subject";
import { avgGradesInterface, cpInterface, PieGradesInterface } from "./types/CourseParticicpants";
import { addCp, removeCp,setCp } from "./store/CourseParticipants";
import { addGrade } from "./store/AddGrade";
import { addStudentOption, deleteStudentOption } from "./store/CourseParticipantOptions";
import { setPieGrades } from "./store/pieGrades";
import { setCourseAvgGrade } from "./store/courseAvgGrade";
const Sockets = () => {
    const dispatch = useDispatch()
    let socket: Socket
    useEffect(() => {
        if(!socket) {
            socket = io('http://localhost:8000', {})
            socket.on('addUser', (data: { user: User }) => {
                dispatch(addUser(data.user))
            })
            socket.on('deleteUser', (data: { user: User }) => {
                dispatch(removeUser(data.user.Id))
            })
            socket.on('addGrade', (data: { grade: StudentsInterface[] }) => {
                // console.log(data.grade,'data')
                dispatch(setCp(data.grade))
            })
            socket.on('addTeacherSubject', (data: { teacherSubject: TeachersSubjects }) => {
                dispatch(addTeachersSubjects(data.teacherSubject))
            })
            socket.on('removeTeacherSubject', (data: { teacherSubject: TeachersSubjects }) => {
                dispatch(removeTeachersSubjects(data.teacherSubject))
            })
            socket.on('addStudent', (data: { student: StudentsInterface }) => {
                console.log(data)
                dispatch(addStudent(data.student))
            })
            socket.on('removeStudent', (data: { student: StudentsInterface }) => {
                dispatch(deleteStudent(data.student.Id))
            })
            socket.on('addCourse', (data: { course: CourseInterface }) => {
                dispatch(addCourse(data.course))
            })
            socket.on('removeCourse', (data: { course: CourseInterface }) => {
                dispatch(removeCourse(data.course.Id))
            })
            socket.on('addSubject', (data: { subject: Subject }) => {
                dispatch(addSubject(data.subject))
            })
            socket.on('removeSubject', (data: { subject: Subject }) => {
                dispatch(removeSubject(data.subject.Id))
            })
            socket.on('addCp', (data: { cp: StudentsInterface }) => {
                dispatch(addCp(data.cp))
            })
            socket.on('removeCp', (data: { cp: StudentsInterface }) => {
                // console.log(data.cp.Id)
                dispatch(removeCp(data.cp.Id))
            })
            socket.on('removeStudentOption', (data: { student: StudentsInterface }) => {
                // console.log(data)
                dispatch(deleteStudentOption(data.student.Id))
            })
            socket.on('addStudentOption', (data: { student: StudentsInterface }) => {
                // console.log(data)
                dispatch(addStudentOption(data.student))
            })
            socket.on('pieGrades', (data: { pieGrades: PieGradesInterface[] }) => {
                console.log(data,1111111)
                dispatch(setPieGrades(data.pieGrades))
            })
            socket.on('courseAvgGrade', (data: { avgGrade: avgGradesInterface[] }) => {
                console.log(data,1111111)
                dispatch(setCourseAvgGrade(data.avgGrade))
            })
        
        
        
        
           
        }
    }, [])
    return (
        <Box id='sockets'></Box>
    )
}
export default Sockets