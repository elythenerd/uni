import { Router } from "express";
import { createStudents, getCourseStudents, getStudents } from "../services/Students";

const studentsRouter = Router()

studentsRouter.post('/create',createStudents)
studentsRouter.get('/get',getStudents)
studentsRouter.get('/get/course/:id',getCourseStudents)



export default studentsRouter