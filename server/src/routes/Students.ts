import { Router } from "express";
import { createStudents, getStudents } from "../services/Students";

const studentsRouter = Router()

studentsRouter.post('/api/students/create',createStudents)
studentsRouter.get('/api/students/get',getStudents)


export default studentsRouter