import { Router } from "express";
import { createTeachersSubject, deleteTeachersSubject, getTeachersSubject, getTeachersSubjectOptions } from "../services/TeachersSubjects";

const teachersSubjectsRouter = Router()

teachersSubjectsRouter.post('/create',createTeachersSubject)
teachersSubjectsRouter.get('/get',getTeachersSubject)
teachersSubjectsRouter.patch('/delete/:id',deleteTeachersSubject)
teachersSubjectsRouter.get('/options/:id/:year',getTeachersSubjectOptions)




export default teachersSubjectsRouter