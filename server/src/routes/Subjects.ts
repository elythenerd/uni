import { Router } from "express";
import { createSubject, getSubjects } from "../services/Subjects";

const subjectRouter = Router()

subjectRouter.post('/api/subjects/create',createSubject)
subjectRouter.get('/api/subjects/get',getSubjects)


export default subjectRouter