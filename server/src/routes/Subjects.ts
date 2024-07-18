import { Router } from "express";
import { createSubject, deleteSubject, getSubjectOptions, getSubjects } from "../services/Subjects";

const subjectRouter = Router()

subjectRouter.post('/create',createSubject)
subjectRouter.get('/get',getSubjects)
subjectRouter.patch('/delete/:id',deleteSubject)
subjectRouter.get('/options/:id',getSubjectOptions)




export default subjectRouter