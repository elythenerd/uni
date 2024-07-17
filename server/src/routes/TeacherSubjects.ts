import { Router } from "express";
import { createTeachersSubject, getTeachersSubject } from "../services/TeachersSubjects";

const teachersSubjectsRouter = Router()

teachersSubjectsRouter.post('/api/ts/create',createTeachersSubject)
teachersSubjectsRouter.get('/api/ts/get',getTeachersSubject)


export default teachersSubjectsRouter