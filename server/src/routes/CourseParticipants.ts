import { Router } from "express";
import { createCourseParticipant, getCourseParticipants } from "../services/CourseParticipants";

const cousreParticipantRouter = Router()

cousreParticipantRouter.post('/api/cp/create',createCourseParticipant)
cousreParticipantRouter.get('/api/cp/get',getCourseParticipants)


export default cousreParticipantRouter