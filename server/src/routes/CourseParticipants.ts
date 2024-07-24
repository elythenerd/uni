import { Router } from "express";
import { createCourseParticipant, createManyCourseParticipants, deleteCourseParticipant, getAllCourseParticipants, getAvgGrade, getAvgGrades, getCourseParticipants, getPieGrades } from "../services/CourseParticipants";
import { deleteCourse } from "../services/Courses";

const cousreParticipantRouter = Router()

cousreParticipantRouter.post('/create',createCourseParticipant)
cousreParticipantRouter.get('/get/:id',getCourseParticipants)
cousreParticipantRouter.get('/get',getAllCourseParticipants)
cousreParticipantRouter.post('/createMany',createManyCourseParticipants)
cousreParticipantRouter.get('/get/avgGrades',getAvgGrades)
cousreParticipantRouter.delete('/delete/:id/:courseId',deleteCourseParticipant)
cousreParticipantRouter.get('/get/pieGrades/:id',getPieGrades)
cousreParticipantRouter.get('/get/Grade/:id',getAvgGrade)



export default cousreParticipantRouter