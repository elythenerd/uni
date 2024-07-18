import { Router } from "express";
import { createCourseParticipant, getCourseParticipants } from "../services/CourseParticipants";

const cousreParticipantRouter = Router()

cousreParticipantRouter.post('/create',createCourseParticipant)
cousreParticipantRouter.get('/get',getCourseParticipants)


export default cousreParticipantRouter