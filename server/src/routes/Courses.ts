import { Router } from "express";
import { createCourse, getCourses } from "../services/Courses";

const cousreRouter = Router()

cousreRouter.post('/api/courses/create',createCourse)
cousreRouter.get('/api/courses/get',getCourses)


export default cousreRouter