import { Router } from "express";
import { createStudents, getStudents } from "../services/Students";

const studentsRouter = Router()

studentsRouter.post('/create',createStudents)
studentsRouter.get('/get',getStudents)


export default studentsRouter