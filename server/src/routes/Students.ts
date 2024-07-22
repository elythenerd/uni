import { Router } from "express";
import { createStudents, deleteStudents, getAddStudentCourseOptions, getAvgGrades, getCourseStudents, getStudents } from "../services/Students";

const studentsRouter = Router()

studentsRouter.post('/create',createStudents)
studentsRouter.get('/get',getStudents)
studentsRouter.get('/get/course/:id',getCourseStudents)
studentsRouter.get('/get/course/:id/grades/avg',getAvgGrades)
studentsRouter.patch('/delete/:id',deleteStudents)
studentsRouter.get('/get/course/options/:id',getAddStudentCourseOptions)



export default studentsRouter