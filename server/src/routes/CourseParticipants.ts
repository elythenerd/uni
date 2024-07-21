import { Router } from "express";
import { createCourseParticipant, createManyCourseParticipants, getAllCourseParticipants, getAvgGrades, getCourseParticipants } from "../services/CourseParticipants";

const cousreParticipantRouter = Router()

cousreParticipantRouter.post('/create',createCourseParticipant)
cousreParticipantRouter.get('/get/:id',getCourseParticipants)
cousreParticipantRouter.get('/get',getAllCourseParticipants)
cousreParticipantRouter.post('/createMany',createManyCourseParticipants)
cousreParticipantRouter.get('/get/avgGrades',getAvgGrades)



export default cousreParticipantRouter